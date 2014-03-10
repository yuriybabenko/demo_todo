app.controller('RegisterController', function ($scope, authService) {
  // prep data
  $scope.form_data = {};

  // get CSRF token
  authService.getCsrfToken().then(function (request_data) {
    $scope.process = function () {
      // TODO: make sure user isn't logged in
    };
  });
});