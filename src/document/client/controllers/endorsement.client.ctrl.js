class EndorsementController {
  constructor(deps) {
    this.deps = deps;
  }
  initCreate() {
    const agreementId = this.deps.$routeParams.agreementId;
    if (!agreementId) {
      throw new Error('missing route parameter');
    }
    this.deps.AgreementService.read(agreementId).then(agreement => {
      this.agreement = agreement;
      this.setDocIndex(0);
    });
  }
  setDocIndex(index) {
    this.docIndex = index;
    this.agreementText = this.deps.DocumentService.getTextAsHtml(
      this.agreement.documents[this.docIndex]
    );
  }
  refreshSignature() {
    this.deps.$scope.$$postDigest(() => {
      M.updateTextFields();
      M.textareaAutoResize($('.materialize-textarea'));
    });
  }
  getSignature(payloadObj, privateKeyString) {
    var oHeader = {
      alg: 'RS256'
    };
    var sHeader = JSON.stringify(oHeader);
    var payload = JSON.stringify(payloadObj);
    // eslint-disable-next-line no-undef
    var privateKey = KEYUTIL.getKey(privateKeyString);
    // eslint-disable-next-line no-undef
    return KJUR.jws.JWS.sign('RS256', sHeader, payload, privateKey);
  }
  sign() {
    this.signature = {
      date: '06-Apr-1974',
      agreementText: this.agreementText,
      bytesText: '...'
    };
    this.deps.KeypairService.getPrivateKey().then(key => {
      this.signature.bytesText = key.private;
      this.signature.bytesText = this.getSignature(
        {
          text: this.signature.agreementText,
          date: this.signature.date
        },
        key.private
      );
      this.refreshSignature();
    });
  }
  submit() {
    // eslint-disable-next-line no-console
    console.log('submitting!');
  }
}

angular.module('Document').controller('EndorsementController', [
  '$scope',
  '$location',
  '$routeParams',
  'AgreementService',
  'DocumentService',
  'KeypairService',
  function(
    $scope,
    $location,
    $routeParams,
    AgreementService,
    DocumentService,
    KeypairService
  ) {
    return new EndorsementController({
      $scope,
      $location,
      $routeParams,
      AgreementService,
      DocumentService,
      KeypairService
    });
  }
]);
