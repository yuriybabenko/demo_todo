app.factory('itemService', function ($http, authService) {
  var service = {};

  /**
   * Returns promise for async get items request.
   * @return {[type]} [description]
   */
  service.get = function () {
    // send request
    return $http({method: 'GET', url: api.url('item')}).then(function (response) {
      return response.data;
    });
  };

  /**
   * Returns promise for async add item request.
   * @param  {[type]} form_data [description]
   * @return {[type]}           [description]
   */
  service.add = function (form_data) {
    // get CSRF token, send add request, return promise
    return authService.getCsrfToken().then(function (csrf_request_data) {
      form_data._token = csrf_request_data.csrf_token;

      // send request
      return $http({method: 'POST', url: api.url('item/add'),
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
   * Returns promise for async remove item request.
   * @param  {[type]} item_id   [description]
   * @return {[type]}           [description]
   */
  service.remove = function (item_id) {
    // get CSRF token, send add request, return promise
    return authService.getCsrfToken().then(function (csrf_request_data) {
      var form_data = {
        id: item_id,
        _token: csrf_request_data.csrf_token
      };

      // send request
      return $http({method: 'POST', url: api.url('item/remove'),
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

