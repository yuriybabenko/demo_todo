var app = angular.module('todo', [
  'ngRoute'
]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'LoginController',
      templateUrl: '/app/partials/login.html'
    })
    .when('/register', {
      controller: 'RegisterController',
      templateUrl: '/app/partials/register.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

/**
 * Web Service API data
 */
var api = {
  // API endpoint
  path : '/ws/api/v1',
  // returns API URL for given stub
  url: function (stub) {
    return this.path + '/' + stub;
  }
};

/**
 * Returns a form_data object (with the CSRF token) for use in $scope.
 * @param  {[type]} $http [description]
 * @return {[type]}       [description]
 */
app.init_form_data = function($http) {
  var form_data = {};

  $http({
    method: 'GET',
    url: api.url('csrf-token')
  })
  .success(function(data) {
    if (data.status == 'ok') {
      form_data._token = data.csrf_token;
    }
  });

  return form_data;
};



