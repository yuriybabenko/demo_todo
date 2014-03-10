app.controller('UserController', function ($scope, $rootScope, $location, authService, itemService) {
  // prep data
  $scope.items = [];

  $scope.new_item = {};

  // refreshItems action
  $scope.refreshItems = function () {
    itemService.get().then(function (request_data) {
      $scope.messages = request_data.messages;

      $scope.items = request_data.items;

      $('input[type=checkbox]').button();

      // enable nice widgets
      $('input[name=date').datepicker();
      $('select').chosen({
        allow_single_deselect: true
      });
    });
  };

  // pull in existing items
  $scope.refreshItems();

  // logout action
  $rootScope.logout = function () {
    authService.logout().then(function (request_data) {
      $rootScope.user_email = null;
      $location.path('/');
    });
  };

  // addItem action
  $scope.addItem = function () {
    // ensure title has a value
    if (typeof $scope.new_item.title == 'undefined' || $scope.new_item.title == '') {
      $scope.new_item.error_title = true;
      return;
    }

    // clear possible error highlight on the title field
    $scope.new_item.error_title = false;

    // send request
    itemService.add($scope.new_item).then(function (request_data) {
      $scope.messages = request_data.messages;

      // clear fields
      if (request_data.status == 'ok') {
        $scope.new_item.title = '';
        $scope.new_item.date = '';
        $scope.new_item.priority = '';

        // trigger the Chosen event after a small timeout so the view has time to pick
        // up on the binding change
        setTimeout(function () {
          $('select').trigger('chosen:updated');
        }, 100);

        $scope.refreshItems();
      }
    });
  };
});
