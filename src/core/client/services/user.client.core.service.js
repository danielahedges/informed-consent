angular.module('Core').factory('UserService', [
  '$http',
  $http => {
    function list(next) {
      $http
        .get('/api/users')
        .then(response => {
          next(response.data);
        })
        .catch(err => {
          next(null, err);
        });
    }

    return {
      list
    };
  }
]);
