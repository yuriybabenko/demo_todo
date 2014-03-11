app.controller('UserController', function ($scope, $rootScope, $location, authService, itemService) {
  // prep data
  $rootScope.sorting = {
    date: true,
    priority: true,
  };
  $scope.items = [];
  $scope.new_item = {};

  // refresh items list action
  $rootScope.refreshItems = function () {
    // we need an object with int values instead of booleans, and we don't want
    // to modify the original sorting object
    var sorting = {
      date: $rootScope.sorting.date ? 1 : 0,
      priority: $rootScope.sorting.priority ? 1 : 0
    };

    itemService.fetch('item', sorting).then(function (request_data) {
      $scope.items = request_data.items;

      // convert priority values to strings, and completed flag to proper JS boolean
      var priority_map = ['low', 'normal', 'high'];
      for (var i = 0; i < $scope.items.length; i++) {
        $scope.items[i].updating = false;

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
      $('article .item-form input[name=date]').datepicker();
      $('article .item-form select').chosen({
        allow_single_deselect: true
      });
    });
  };

  // pull in existing items
  $rootScope.refreshItems();

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

  // logout action
  $rootScope.logout = function () {
    authService.logout().then(function (request_data) {
      $rootScope.user_email = null;
      $location.path('/');
    });
  };

  // toggle action
  $scope.toggleItem = function (id) {
    // send request
    itemService.fetch('item/toggle', { id: id }).then(function (request_data) {
      $scope.messages = request_data.messages;
    });
  };

  // edit action
  $scope.editItem = function (id) {
    var index = findIndex(id);
    if (index !== false) {
      $scope.items[index].updating = true;
    }
  };

  // remove action
  $scope.removeItem = function (id) {
    // send request
    itemService.fetch('item/remove', { id: id }).then(function (request_data) {
      $scope.messages = request_data.messages;

      // find & remove the item which was deleted
      if (request_data.status == 'ok') {
        var index = findIndex(id);
        if (index !== false) {
          $scope.items.splice(index, 1);
        }
      }
    });
  };
});
