angular.module('Document').config([
  '$routeProvider',
  $routeProvider => {
    $routeProvider
      .when('/sigRequest/list', {
        templateUrl: '/views/document/sigRequestList'
      })
      .when('/sigRequest/create', {
        templateUrl: '/views/document/sigRequestCreate'
      })
      .when('/sigRequest/edit/:sigRequestId', {
        templateUrl: '/views/document/sigRequestEdit'
      });
  }
]);

