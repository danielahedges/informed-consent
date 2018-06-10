angular.module('Document').config([
  '$routeProvider',
  $routeProvider => {
    $routeProvider
      .when('/agreements/list', {
        templateUrl: '/views/document/agreementList'
      })
      .when('/agreements/create', {
        templateUrl: '/views/document/agreementCreate'
      })
      .when('/agreements/edit/:agreementId', {
        templateUrl: '/views/document/agreementEdit'
      });
  }
]);
