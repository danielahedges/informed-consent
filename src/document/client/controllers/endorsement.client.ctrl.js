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
  initList() {
    this.deps.EndorsementService.list().then(endorsements => {
      this.endorsements = endorsements;
    });
  }
  initView() {
    const endorsementId = this.deps.$routeParams.endorsementId;
    this.deps.EndorsementService.read(endorsementId).then(endorsement => {
      this.endorsement = endorsement;
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
      // M.textareaAutoResize($('.materialize-textarea'));
    });
  }
  getPayload() {
    return JSON.stringify({
      text: this.signature.agreementText,
      date: this.signature.date
    });
  }
  getSignature(payload, privateKeyString) {
    var oHeader = {
      alg: 'RS256'
    };
    var sHeader = JSON.stringify(oHeader);
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
      this.signature.payload = this.getPayload();
      this.signature.bytesText = this.getSignature(
        this.signature.payload,
        key.private
      );
      this.refreshSignature();
    });
  }
  submit() {
    this.deps.EndorsementService.create({
      agreement: this.deps.$routeParams.agreementId,
      version: this.agreement.documents[this.docIndex].version,
      language: this.agreement.documents[this.docIndex].language,
      payload: this.signature.payload,
      signature: this.signature.bytesText,
      date: this.signature.date
    }).then(() => {
      this.deps.$scope.$$postDigest(() => {
        this.deps.$location.path('/sigRequest/list');
        this.deps.$scope.$apply();
      });
    });
  }
}

angular.module('Document').controller('EndorsementController', [
  '$scope',
  '$location',
  '$routeParams',
  'AgreementService',
  'DocumentService',
  'KeypairService',
  'EndorsementService',
  function(
    $scope,
    $location,
    $routeParams,
    AgreementService,
    DocumentService,
    KeypairService,
    EndorsementService
  ) {
    return new EndorsementController({
      $scope,
      $location,
      $routeParams,
      AgreementService,
      DocumentService,
      KeypairService,
      EndorsementService
    });
  }
]);
