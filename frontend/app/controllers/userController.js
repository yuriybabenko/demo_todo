app.controller('UserController', function ($scope, $rootScope, $location, authService, itemService) {
  // prep data
  $scope.items = [];

  $scope.new_item = {};

  // helper to pull in & refresh list of items
  var refreshItems = function () {
    itemService.get().then(function (request_data) {
      $scope.messages = request_data.messages;
      $scope.items = request_data.items;

      // convert priority values to strings, and completed flag to proper JS boolean
      var priority_map = ['low', 'normal', 'high'];
      for (var i = 0; i < $scope.items.length; i++) {
        if ($scope.items[i].priority !== false) {
          $scope.items[i].priority = priority_map[$scope.items[i].priority];
        }

        if ($scope.items[i].completed) {
          $scope.items[i].completed = true;
        }
        else {
          $scope.items[i].completed = false;
        }
      }

      // enable nice widgets
      $('input[name=date').datepicker();
      $('select').chosen({
        allow_single_deselect: true
      });
    });
  };

  // helper to find index of given item id within items array 
  var findIndex = function (id) {
    var found = false;

    for (var i = 0; i < $scope.items.length; i++) {
      if ($scope.items[i].id == id) {
        found = true;
        break;
      }
    }

    if (found) {
      return i;
    }

    return false;
  };

  // pull in existing items
  refreshItems();

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
    if (typeof $scope.new_item.title == 'undefined' || $scope.new_item.title === '') {
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

        refreshItems();
      }
    });
  };

  // edit action
  $scope.edit = function (id) {

  };

  // remove action
  $scope.remove = function (id) {
    // send request
    itemService.remove(id).then(function (request_data) {
      $scope.messages = request_data.messages;

      // find & remove the item which was deleted
      if (request_data.status == 'ok') {
        var index = findIndex(id);
        if (index) {
          $scope.items.splice(index, 1);
        }
      }
    });
  };
});
