app.factory('authService', function ($http) {
  var service = {};

  /**
   * Returns promise for async CSRF token request.
   * @return {[type]} [description]
   */
  service.getCsrfToken = function () {
    // send csrf request & return promise
    return $http.get(api.url('csrf-token'), { }).then(function (response) {
      return response.data;
    });
  };

  /**
   * Returns promise for async registration request.
   * @param  {[type]} form_data [description]
   * @return {[type]}           [description]
   */
  service.register = function (form_data) {
    // get CSRF token, send register request, return promise
    return service.getCsrfToken().then(function (csrf_request_data) {
      form_data._token = csrf_request_data.csrf_token;

      // send register request
      return $http({method: 'POST', url: api.url('auth/register'),
        data: $.param(form_data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        return response.data;
      });
    });
  };

  /**
   * Returns promise for async authentication request.
   * @param  {[type]} form_data [description]
   * @return {[type]}           [description]
   */
  service.checkAuth = function (form_data) {
    // get CSRF token, send auth request, return promise
    return service.getCsrfToken().then(function (csrf_request_data) {
      form_data._token = csrf_request_data.csrf_token;

      // TODO: make sure user isn't logged in

      // send authentication request
      return $http({method: 'POST', url: api.url('auth'),
        data: $.param(form_data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        return response.data;
      });
    });
  };

  /**
   * Returns promise for async logout request.
   * @return {[type]} [description]
   */
  service.logout = function () {
    // send logout request
    return $http.get(api.url('auth/logout'), { }).then(function (response) {
      return response.data;
    });
  };

  return service;
});

