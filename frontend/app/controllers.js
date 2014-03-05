app.controller('LoginController', function ($scope, $http) {
  $scope.form_data = app.init_form_data($http);

  $scope.process = function () {
    $http({
      method: 'POST',
      url: api.url('auth'),
      data: $.param($scope.form_data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .success(function(data) {
      console.log(data);
      
      $scope.messages = data.messages;

/*
        if (!data.success) {
          // if not successful, bind errors to error variables
            $scope.errorName = data.errors.name;
            $scope.errorSuperhero = data.errors.superheroAlias;
        } else {
          // if successful, bind success message to message
            $scope.message = data.message;
        }
*/
    });
  };
});

app.controller('RegisterController', function ($scope) {
  // init();

  console.log('here');

  function init() {
    // todo
  }

  $scope.addUser = function() {
    // var
  };
});


