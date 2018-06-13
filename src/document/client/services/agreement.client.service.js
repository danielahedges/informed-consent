angular.module('Document').factory('AgreementService', [
  '$http',
  $http => {
    function list() {
      return $http.get('/api/agreements').then(response => response.data);
    }
    function create(agreement) {
      return $http
        .post('/api/agreements', agreement)
        .then(response => response.data);
    }
    function save(agreement) {
      return $http
        .put('/api/agreements/' + agreement._id, agreement)
        .then(response => response.data);
    }
    function read(agreementId) {
      return $http
        .get('/api/agreements/' + agreementId)
        .then(response => response.data);
    }

    return {
      list,
      create,
      save,
      read
    };
  }
]);
