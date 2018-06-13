angular.module('Document').config([
  '$routeProvider',
  $routeProvider => {
    $routeProvider.when('/endorsements/create/:agreementId', {
      templateUrl: '/views/document/endorsementCreate'
    });
  }
]);
