class AgreementController {
  constructor(deps) {
    this.deps = deps;
  }
  initList() {
    this.deps.AgreementService.list(agreements => {
      this.agreements = agreements;
    });
  }
  initCreate() {
    this.agreement = {
      name: '',
      documents: []
    };
  }
  initEdit() {
    const agreementId = this.deps.$routeParams.agreementId;
    this.deps.AgreementService.read(agreementId, (agreement, err) => {
      if (err) {
        // console.log(err);
      } else if (!agreement) {
        // console.log('could not read agreement');
      } else {
        this.agreement = agreement;
      }
      this.deps.$scope.$$postDigest(() => {
        M.updateTextFields();
        M.textareaAutoResize($('.materialize-textarea'));
      });
    });
  }
  pushDocument() {
    this.agreement.documents = this.agreement.documents
      ? this.agreement.documents
      : [];
    this.agreement.documents.push({
      language: '',
      version: '',
      text: '',
      obsolete: false
    });
  }
  create() {
    this.deps.AgreementService.create(
      this.agreement,
      (savedAgreeement, err) => {
        if (err) {
          // console.log(err);
        } else {
          this.deps.$location.path('/agreements/list');
          this.deps.$scope.$apply();
        }
      }
    );
  }
  save() {
    this.deps.AgreementService.save(this.agreement, (savedAgreement, err) => {
      if (err) {
        // console.log(err);
      } else {
        this.deps.$location.path('/agreements/list');
        this.deps.$scope.$apply();
      }
    });
  }
}

angular.module('Document').controller('AgreementController', [
  '$scope',
  '$location',
  '$routeParams',
  'AgreementService',
  function($scope, $location, $routeParams, AgreementService) {
    return new AgreementController({
      $scope,
      $location,
      $routeParams,
      AgreementService
    });
  }
]);
