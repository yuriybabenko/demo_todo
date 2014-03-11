app.controller('RegisterController', function ($scope, authService) {
  // prep data
  $scope.form_data = {};

  // login form submit action
  $scope.process = function () {
    authService.register($scope.form_data).then(function (request_data) {
      $scope.messages = request_data.messages;
      
      // registration failed
      if (request_data.status != 'ok') {
        return;
      }

      // registration ok, so redirect to user page
      $location.path('/user');
    });
  };


});