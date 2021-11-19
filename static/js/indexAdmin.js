import _ from 'lodash';
import angular from 'angular';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import toastr from "toastr";

var app = angular.module('adminApp', []);
app

    .directive('repeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    })

    .controller('adminController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

        $scope.confirmedTime = "";
        $scope.rejectReason = "";
        $scope.newDateTime = {
            newDate: "",
            newStartTime: "",
            newEndTime: ""
        };

        $scope.createDataTable = function () {
            $(document).ready(function () {
                // $.noConflict()
                window.$('#adminRequestsTable').DataTable({
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

        //------------------------------Add interview request-----------------------------------------
        $scope.interviewRequest = {
            name: "",
            url: "",
            department: "",
            status: 0,
            isAccepted: false
        };


        //------------------------------Pending Interview Confirmations---------------------------------
        $scope.loadPendingRequests = function () {
            $http.get('/arrangeTime/admin/readLeaderSetTime?adminResponseStatus=0', {})
                .then(function (response) {
                    console.log('jfdikfjdkfhjdkfj');
                    console.log(response);
                    $scope.interviewees = response.data;
                }, function (response) {
                });
        }

        //--------------------------------------Confirm Interview----------------------------------------------
        $scope.confirmInterview = function (data) {
            $scope.intervieweeName = data.cvID.name;
            $scope.intervieweeDetails = {
                arrangeID: data._id,
                availableTime: data.availableTime
            };
        }

        $scope.formatDateTime = function (date, startTime, endTime) {
            let formattedStartTime = moment(startTime, "HH:mm").format("HH:mm:ss")
            let formattedEndTime = moment(endTime, "HH:mm").format("HH:mm:ss")
            let formattedDate = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD")
            return {
                dateTime: `${formattedDate}T${formattedStartTime}Z`,
                endDateTime: `${formattedDate}T${formattedEndTime}Z`,
            }
        }

        $scope.submitConfirm = function () {
            if ($scope.confirmedTime == 'otherTime') {
                $scope.intervieweeDetails.availableTime = $scope.formatDateTime($scope.newDateTime.newDate, $scope.newDateTime.newStartTime, $scope.newDateTime.newEndTime)
            } else {
                let temp = $scope.confirmedTime.split("|");
                let tempTime = temp[1].split("-");
                $scope.intervieweeDetails.availableTime = $scope.formatDateTime(temp[0], tempTime[0], tempTime[1])
            }
            if (($scope.formattedDate != "Invalid date") || ($scope.formattedStartTime != "Invalid date") || ($scope.formattedEndTime != "Invalid date")) {
                $scope.invalidNewDateTime = false;
                $http.post('/confirmedTime/admin/adminConfirmTime', $scope.intervieweeDetails).then(
                    function (response) {
                        toastr.success("Interview has been confirmed for " + $scope.intervieweeName, "SUCCESS");
                        $('#confirmInterview').modal("hide");
                        window.$('#adminRequestsTable').DataTable().destroy();
                        $scope.loadPendingRequests();
                    }, function (response) {
                    });
            } else {
                $scope.invalidNewDateTime = true;
            }

        }

        //--------------------------------------Reject Interview----------------------------------------------
        $scope.rejectInterview = function (data) {
            console.log(data);
            $scope.rejectReason = "";
            $scope.rejectedName = data.cvID.name;
            $scope.rejectedDetails = {
                cvID: data._id,
                adminRejectReasons: ""
            };
        }

        $scope.submitReject = function () {
            $scope.rejectedDetails.reasons = $scope.rejectReason;
            $http.post('/arrangeTime/adminReject', $scope.rejectedDetails).then(
                function (response) {
                    toastr.error($scope.rejectedName + "'s interview session has been rejected and removed", "REJECTED")
                    $('#confirmBox').modal('hide');
                    window.$('#adminRequestsTable').DataTable().destroy();
                    $scope.loadPendingRequests();
                }, function (response) {
                });
        }

        $scope.loadPendingRequests();


    }]);
