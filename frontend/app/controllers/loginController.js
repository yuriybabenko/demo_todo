app.controller('LoginController', function ($scope, $rootScope, $location, authService) {
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