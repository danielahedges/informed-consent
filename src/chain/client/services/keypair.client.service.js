angular.module('Chain').factory('KeypairService', [
  '$http',
  $http => {
    function getPrivateKey() {
      return $http.get('/api/private-key').then(response => response.data);
    }

    return {
      getPrivateKey
    };
  }
]);
