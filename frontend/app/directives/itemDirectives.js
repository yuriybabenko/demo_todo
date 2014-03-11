app.directive('itemForm', ['$compile', '$rootScope', 'itemService', function($compile, $rootScope, itemService) {
  return {
    restrict: 'AE',
    transclude: true,
    // scope: {},
    templateUrl: 'app/partials/widgets/item-form.html',
    link: function (scope, element, attributes) {
      // enable nice widgets
      $('article .item-form input.date').datepicker();
      $('article .item-form select').chosen({
        allow_single_deselect: true
      });

      scope.process = function () {
        // ensure title has a value
        if (typeof scope.item.title == 'undefined' || scope.item.title === '') {
          scope.error_title = true;
          return;
        }

        // clear possible error highlight on the title field
        scope.error_title = false;

        if (scope.item.id) {
          scope.update();
        }
        else {
          scope.add();
        }
      };

      // add action
      scope.add = function () {
        itemService.fetch('item/add', scope.item).then(function (request_data) {
          scope.messages = request_data.messages;

          // clear fields
          if (request_data.status == 'ok') {
            scope.item.title = '';
            scope.item.date = '';
            scope.item.priority = '';

            // trigger the Chosen event after a small timeout so the view has time to pick
            // up on the binding change
            setTimeout(function () {
              $('article.new select').trigger('chosen:updated');
            }, 100);

            $rootScope.refreshItems();
          }
        });
      };

      // update action
      scope.update = function () {
        itemService.fetch('item/update', scope.item).then(function (request_data) {
          scope.messages = request_data.messages;

          // clear fields
          if (request_data.status == 'ok') {
            $rootScope.refreshItems();

            scope.item.updating = false;
          }
        });
      };
    }
  };
}]);
