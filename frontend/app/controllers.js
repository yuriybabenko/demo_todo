app.controller('RegisterController', function ($scope, $http) {
  $scope.form_data = app.init_form_data($http);

  $scope.process = function () {
    // TODO: make sure user isn't logged in
  };
});

app.controller('LoginController', function ($scope, $rootScope, $http, $route, $location) {
  $http.get(api.url('auth'), { }).success(function (data) {
    if (data.status !== 'ok') {
      return;
    }

    // user is authenticated
    if (data.auth === 1) {
      console.log('controller check caught: ' + $location.path());
    }
  });

  $scope.form_data = app.init_form_data($http);

  $scope.process = function () {
    // TODO: make sure user isn't logged in
    
    // send authentication request
    $http({
      method: 'POST',
      url: api.url('auth'),
      data: $.param($scope.form_data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .success(function(data) {
      // auth ok, so redirect
      if (data.status == 'ok') {
        $location.path('/user');
      }
      // auth failed, display messages
      else {
        $scope.messages = data.messages;
      }
    });
  };
});

app.controller('UserController', function ($scope, $rootScope, $http, $location) {
  $scope.user_email = $rootScope.user_email;

  // logout action
  $rootScope.logout = function() {
    $http.get(api.url('auth/logout'), { }).success(function(data) {
      $rootScope.user_email = null;
      $location.path('/');
    });
  };
});



