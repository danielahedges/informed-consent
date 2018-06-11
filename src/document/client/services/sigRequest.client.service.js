angular.module('Document').factory('SigRequestService', [
  '$http',
  $http => {
    function list(next) {
      $http
        .get('/api/sigRequests')
        .then(response => {
          next(response.data);
        })
        .catch(() => {
          next([]);
        });
    }
    function create(sigRequest, next) {
      $http
        .post('/api/sigRequests', sigRequest)
        .then(response => {
          next(response.data);
        })
        .catch(err => {
          next(null, err);
        });
    }
    function save(sigRequest, next) {
      $http
        .put('/api/sigRequests/' + sigRequest._id, sigRequest)
        .then(response => {
          next(response.data);
        })
        .catch(err => {
          next(null, err);
        });
    }
    function read(sigRequestId, next) {
      $http
        .get('/api/sigRequests/' + sigRequestId)
        .then(response => {
          next(response.data);
        })
        .catch(err => {
          next(null, err);
        });
    }
    function del(sigRequestId, next) {
      $http
        .delete('/api/sigRequests/' + sigRequestId)
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
      read,
      del
    };
  }
]);
