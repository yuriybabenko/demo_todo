app.factory('itemService', function ($http, authService) {
  var service = {};

  /**
   * Executes async request and returns promise.
   * @param  {[type]} url       [description]
   * @param  {[type]} form_data [description]
   * @return {[type]}           [description]
   */
  service.fetch = function (url, form_data) {
    // get CSRF token, send request, return promise
    return authService.getCsrfToken().then(function (csrf_request_data) {
      form_data._token = csrf_request_data.csrf_token;

      // send request
      return $http({method: 'POST', url: api.url(url),
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
  
  return service;
});

