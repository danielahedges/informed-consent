class SigRequestController {
  constructor(deps) {
    this.deps = deps;
  }
  splitList(sigRequestList) {
    for (var i = 0; i < sigRequestList.length; ++i) {
      this.forMe = [];
      this.fromMe = [];
      if (
        sigRequestList[i].requestor === this.deps.AuthenticationService.user._id
      ) {
        this.fromMe.push(sigRequestList[i]);
      }
      if (
        sigRequestList[i].requestee === this.deps.AuthenticationService.user._id
      ) {
        this.forMe.push(sigRequestList[i]);
      }
    }
  }
  sortById(items, obj) {
    for (var i = 0; i < items.length; ++i) {
      let item = items[i];
      obj[item._id] = item;
    }
  }
  loadAllAgreements() {
    this.agreementsById = {};
    this.deps.AgreementService.list(agreements => {
      this.agreements = agreements;
      this.sortById(agreements, this.agreementsById);
      angular.element('#agreement-select').formSelect();
    });
  }
  loadAllUsers() {
    this.usersById = {};
    this.deps.UserService.list(users => {
      this.users = users;
      this.sortById(users, this.usersById);
      angular.element('#user-select').formSelect();
    });
  }
  initList() {
    this.deps.SigRequestService.list(sigRequests => {
      this.splitList(sigRequests);
    });
    this.loadAllAgreements();
    this.loadAllUsers();
  }
  initCreate() {
    this.sigRequest = {};
    this.loadAllAgreements();
    this.loadAllUsers();
  }
  initEdit() {
    this.deps.SigRequestService.read(
      this.deps.$routeParams.sigRequestId,
      (sigRequest, err) => {
        if (!err && sigRequest) {
          this.sigRequest = sigRequest;
        }
      }
    );
    this.loadAllAgreements();
    this.loadAllUsers();
  }
  isValid() {
    return this.sigRequest.requestee && this.sigRequest.agreement;
  }
  create() {
    if (!this.isValid()) {
      return;
    }
    this.deps.SigRequestService.create(
      this.sigRequest,
      (savedSigRequest, err) => {
        if (!err) {
          this.deps.$location.path('/sigRequests/list');
          this.deps.$scope.$apply();
        }
      }
    );
  }
  save() {
    if (!this.isValid()) {
      return;
    }
    this.deps.SigRequestService.save(
      this.sigRequest,
      (savedSigRequest, err) => {
        if (!err) {
          this.deps.$location.path('/sigRequest/list');
          this.deps.$scope.$apply();
        }
      }
    );
  }
  findUserWithUsername(username) {
    for (var i = 0; i < this.users.length; ++i) {
      if (this.users[i].username === username) {
        return this.users[i];
      }
    }
  }
  setAgreement(agreementId) {
    this.sigRequest = {
      // requestor: ,
      requestee: this.findUserWithUsername(this.sigRequest.username)._id,
      agreement: agreementId
    };
    this.create();
  }
  del(sigRequestId) {
    this.deps.SigRequestService.del(sigRequestId, (deletedSigRequest, err) => {
      if (!err) {
        this.deps.$location.path('/sigRequest/list');
        this.deps.$scope.$apply();
      }
    });
  }
}

angular.module('Document').controller('SigRequestController', [
  '$scope',
  '$location',
  '$routeParams',
  'SigRequestService',
  'AuthenticationService',
  'AgreementService',
  'UserService',
  function(
    $scope,
    $location,
    $routeParams,
    SigRequestService,
    AuthenticationService,
    AgreementService,
    UserService
  ) {
    return new SigRequestController({
      $scope,
      $location,
      $routeParams,
      SigRequestService,
      AuthenticationService,
      AgreementService,
      UserService
    });
  }
]);
