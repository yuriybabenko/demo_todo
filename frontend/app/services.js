app.factory('authService', function ($http) {
  var service = {};

  /**
   * Returns promise for async CSRF token request.
   * @return {[type]} [description]
   */
  service.getCsrfToken = function () {
    var promise = $http.get(api.url('csrf-token'), { }).then(function (response) {
      return response.data;
    });

    return promise;
  };

  /**
   * Returns promise for async authentication request.
   * @param  {[type]} form_data [description]
   * @return {[type]}           [description]
   */
  service.checkAuth = function (form_data) {
    // get CSRF token
    var promise = service.getCsrfToken().then(function (csrf_request_data) {
      form_data._token = csrf_request_data.csrf_token;

      // TODO: make sure user isn't logged in

      // send authentication request
      var promise = $http({method: 'POST', url: api.url('auth'),
        data: $.param(form_data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        return response.data;
      });

      return promise;
    });

    return promise;
  };

  return service;
});

