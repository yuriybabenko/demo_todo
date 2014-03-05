app.service('userService', function () {
  this.addUser = function (email, password) {
    customers.push({
      email: email
    });
  };
});