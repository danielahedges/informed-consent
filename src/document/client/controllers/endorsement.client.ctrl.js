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
}

angular.module('Document').controller('EndorsementController', [
  '$scope',
  '$location',
  '$routeParams',
  'AgreementService',
  'DocumentService',
  function($scope, $location, $routeParams, AgreementService, DocumentService) {
    return new EndorsementController({
      $scope,
      $location,
      $routeParams,
      AgreementService,
      DocumentService
    });
  }
]);
