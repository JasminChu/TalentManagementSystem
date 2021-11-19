import _ from 'lodash';
import angular from 'angular';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import toastr from "toastr";

window.toastr = toastr
var app = angular.module('leaderHistoryApp', []);
app
    .directive('repeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    })

    .controller('leaderHistoryController', ['$scope', '$http', function ($scope, $http) {
        $scope.department = department1;
        $scope.createDataTable = function () {
            $(document).ready(function () {
                // $.noConflict()
                window.$('#leaderHistoryTable').DataTable({
                    dom: 'Bfrtip',
                    "order": [],
                    buttons: [
                        {
                            extend: 'excel',
                            text: '<i class="fa fa-download"></i>',
                            className: 'btn btn-primary-outline',
                            titleAttr: 'Download as excel',
                            exportOptions: {
                                columns: ':not(.noExport)'
                            }
                        }]

                });

            });
        }

        $scope.load = function () {
            $http.get('/talentCv/readTalentCv?isDelete=false&status=2&status=1&department=' + $scope.department, {})
                .then(function (response) {
                    $scope.allRequests = response.data;
                }, function (response) {
                });
        }

        $scope.displayHistory = function (data) {
            window.$('#leaderHistoryTable').DataTable().destroy();
            if (data === "rejected") {
                $scope.activeState = data;
                $scope.showRejected = true;
                $http.get('/talentCv/readTalentCv?isDelete=false&status=2&department=' + $scope.department, {})
                    .then(function (response) {
                        $scope.allRequests = response.data;
                    }, function (response) {
                    });
            } else if (data == "accepted") {
                $scope.showRejected = false;
                $scope.activeState = data;
                $http.get('/talentCv/readTalentCv?isDelete=false&status=1&department=' + $scope.department, {})
                    .then(function (response) {
                        $scope.allRequests = response.data;
                    }, function (response) {
                    });
            } else {
                $scope.showRejected = false;
                $scope.activeState = data;
                $scope.load();
            }
        }

        $scope.load();


    }]);