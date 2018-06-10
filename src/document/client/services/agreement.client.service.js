angular.module('Document').factory('AgreementService', [
  '$http',
  $http => {
    function list(next) {
      $http
        .get('/api/agreements')
        .then(response => {
          next(response.data);
        })
        .catch(() => {
          next([]);
        });
    }
    function create(agreement, next) {
      $http
        .post('/api/agreements', agreement)
        .then(response => {
          next(response.data);
        })
        .catch(err => {
          next(null, err);
        });
    }
    function save(agreement, next) {
      $http
        .put('/api/agreements/' + agreement._id, agreement)
        .then(response => {
          next(response.data);
        })
        .catch(err => {
          next(null, err);
        });
    }
    function read(agreementId, next) {
      $http
        .get('/api/agreements/' + agreementId)
        .then(response => {
          next(response.data);
        })
        .catch(err => {
          next(null, err);
        });
    }

    return {
      list,
      create,
      save,
      read
    };
  }
]);
