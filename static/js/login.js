import _ from 'lodash';
import angular from 'angular';
import toastr from "toastr";

window.onload = function(){ document.getElementById("loading").style.display = "none" }

var app = angular.module('login', []);
app.controller('loginCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.user = {
        email: '',
        password: ''
    }
    $scope.emailError = false;
    $scope.passwordError = false;

    $scope.submitLogin = function () {
        console.log("Did you go through the submit login button");
        console.log($scope.user.email);
        if ($scope.user.email && $scope.user.password) {
            $scope.emailError = false;
            $scope.passwordError = false;
            $http.post('/api/users/login', $scope.user)
                .then(function (response) {
                    $scope.userData = response.data;
                    if($scope.userData === "invalid user"){
                        toastr.error("Incorrect email or password please try again.", "ERROR")
                        $scope.user.email = "";
                        $scope.user.password = "";
                    }
                    // 5 = It
                    // 6 = Finance
                    // 7 = Marketing
                    // 8 = Operation
                    // 9 = Mad
                    // 10 = Design
                    switch($scope.userData.user.department) {
                        case 5:
                            $window.location.href = '/leader/interviews/it';
                            break;
                        case 6:
                            $window.location.href = '/leader/interviews/finance';
                            break;
                        case 7:
                            $window.location.href = '/leader/interviews/marketing';
                            break;
                        case 8:
                            $window.location.href = '/leader/interviews/operation';
                            break;
                        case 9:
                            $window.location.href = '/leader/interviews/mad';
                            break;
                        case 10:
                            $window.location.href = '/leader/interviews/design';
                            break;
                        case "leader":
                            $window.location.href = '/leader';
                            break;
                        case 1:
                            $window.location.href = '/admin';
                            break;
                    }

                }, function (response) {
                    toastr.error("Login Failed", "ERROR")
                });
        } else if (!$scope.user.password && !$scope.user.email) {
            $scope.passwordError = true;
            $scope.emailError = true;
        } else if (!$scope.user.password) {
            $scope.passwordError = true;
        } else if (!$scope.user.email) {
            $scope.emailError = true;
        }


    }

}]);
