angular.module('Document').config([
  '$routeProvider',
  $routeProvider => {
    $routeProvider
      .when('/endorsements/create/:agreementId', {
        templateUrl: '/views/document/endorsementCreate'
      })
      .when('/endorsements/list', {
        templateUrl: '/views/document/endorsementList'
      })
      .when('/endorsements/view/:endorsementId', {
        templateUrl: '/views/document/endorsementView'
      });
  }
]);
