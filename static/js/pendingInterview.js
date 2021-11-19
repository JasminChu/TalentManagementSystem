import angular from 'angular';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';

//When leader sees pending interview requests
var app = angular.module('interviewAdminApp', []);
app
    .directive('repeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    })
    .controller('interviewAdminController', ['$scope', '$http', function ($scope, $http) {
        $scope.department = department1;
        $scope.interviews = "";
        $scope.createDataTable = function () {
            $(document).ready(function () {
                // $.noConflict()
                window.$('#pendingInterviewsTable').DataTable({
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
        
        $scope.loadInterviews = function () {
            $http.get('/confirmedTime/leader/readAdminConfirmTime', {})
                .then(function (response) {
                    console.log(response);
                    $scope.interviews = response.data;
                    for (var i = 0; i < $scope.interviews.length; i++) {
                        $scope.interviews[i].timeDuration = moment($scope.interviews[i].availableTime.dateTime).format("HH:mm")+" - "+moment($scope.interviews[i].availableTime.endDateTime).format("HH:mm");
                        $scope.interviews[i].date = moment($scope.interviews[i].availableTime.dateTime).format("DD-MMM-YYYY");
                    }
                }, function (response) {
                });
        }

        $scope.loadInterviews();

    }]);
