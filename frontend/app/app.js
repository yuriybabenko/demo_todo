var app = angular.module('todo', [
  'ngRoute'
]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'LoginController',
      templateUrl: '/app/partials/login.html',
      resolve: {
        factory: isAnon
      }
    })
    .when('/register', {
      controller: 'RegisterController',
      templateUrl: '/app/partials/register.html',
      resolve: {
        factory: isAnon
      }
    })
    .when('/user', {
      controller: 'UserController',
      templateUrl: '/app/partials/user.html',
      resolve: {
        factory: isAuth
      }
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
    // append random string to make sure the browser doesn't cache the call
    return this.path + '/' + stub + '?' + Math.random().toString(36).replace(/[^a-z0-9]+/g, '');
  }
};

/**
 * Returns a form_data object (with the CSRF token) for use in $scope.
 * @param  {[type]} $authService [description]
 * @return {[type]}       [description]
 */
app.init_form_data = function (authService) {
  return {};

  var form_data = {};

  var tokenPromise = authService.getCsrfToken();
  tokenPromise.then(function (data) {
    if (data.status == 'ok') {
      form_data._token = data.csrf_token;
    }
  });

  return form_data;
};



