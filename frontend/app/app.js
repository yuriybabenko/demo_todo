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
 * Ensures user is authenticated, otherwise redirects to /
 * @param  {[type]}  $q         [description]
 * @param  {[type]}  $http      [description]
 * @param  {[type]}  $rootScope [description]
 * @param  {[type]}  $location  [description]
 * @return {Boolean}            [description]
 */
var isAuth = function($q, $http, $rootScope, $location) {
  var defered = $q.defer();

  $http.get(api.url('auth'), { }).success(function (data) {
    if (data.status !== 'ok') {
      return;
    }

    // user is authenticated
    if (data.auth === 1) {
      $rootScope.user_email = data.user_email;
      defered.resolve(true);
    }
    // user is anonymous
    else {
      defered.reject();
      $location.path('/');
    }
  });

  return defered.promise;
};

/**
 * Ensures user is anonymous, otherwise redirects to /user
 * @param  {[type]}  $q         [description]
 * @param  {[type]}  $http      [description]
 * @param  {[type]}  $rootScope [description]
 * @param  {[type]}  $location  [description]
 * @return {Boolean}            [description]
 */
var isAnon = function($q, $http, $rootScope, $location) {
  var defered = $q.defer();

  $http.get(api.url('auth'), { }).success(function (data) {
    if (data.status !== 'ok') {
      return;
    }

    // user is anonymous
    if (data.auth === 0) {
      defered.resolve(true);
    }
    // user is authenticated
    else {
      defered.reject();
      $location.path('/user');
    }
  });

  return defered.promise;
};


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