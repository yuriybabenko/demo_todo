app.controller('RegisterController', function ($scope, $http, authService) {
  // prep data
  $scope.form_data = {};

  // get CSRF token
  authService.getCsrfToken().then(function (request_data) {
    $scope.process = function () {
      // TODO: make sure user isn't logged in
    };
  });
});

app.controller('LoginController', function ($scope, $http, $location, authService) {
  // prep data
  $scope.form_data = {};

  // login form submit action
  $scope.process = function () {
    authService.checkAuth($scope.form_data).then(function (request_data) {
      // auth failed, display messages
      if (request_data.status != 'ok') {
        $scope.messages = request_data.messages;
        return;
      }

      // auth ok, so redirect to user page
      $location.path('/user');
    });
  };
});

app.controller('UserController', function ($scope, $rootScope, $http, $location, authService) {
  // prep data
  $scope.form_data = {};
  $scope.new_item = {};

  // enable date picker widget and nice select drop down
  $('input[name=date').datepicker();
  $('select').chosen({});

  // logout action
  $rootScope.logout = function () {
    $http.get(api.url('auth/logout'), { }).success(function (data) {
      $rootScope.user_email = null;
      $location.path('/');
    });
  };

  // get CSRF token
  authService.getCsrfToken().then(function (request_data) {
    // addItem action
    $scope.addItem = function () {
      // ensure title has a value
      if (typeof $scope.new_item.title == 'undefined' || $scope.new_item.title == '') {
        $scope.new_item.error_title = true;
        return;
      }

      // clear possible error
      $scope.new_item.error_title = false;

      // get CSRF token
      $scope.form_data = app.init_form_data(authService);

      console.log($scope.form_data);
      jQuery.extend($scope.form_data, $scope.new_item);

      console.log($scope.form_data);
      return;

      // send authentication request
      $http({
        method: 'POST',
        url: api.url('auth'),
        data: $.param($scope.form_data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .success(function (data) {
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
});



