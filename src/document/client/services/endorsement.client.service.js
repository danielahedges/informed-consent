angular.module('Document').factory('EndorsementService', [
  '$http',
  $http => {
    function list() {
      return $http.get('/api/endorsements').then(response => response.data);
    }
    function create(endorsement) {
      return $http
        .post('/api/endorsements', endorsement)
        .then(response => response.data);
    }
    function read(endorsementId) {
      return $http
        .get('/api/endorsements/' + endorsementId)
        .then(response => response.data);
    }

    return {
      list,
      create,
      read
    };
  }
]);
