import _ from 'lodash';
import angular from 'angular';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';

import toastr from 'toastr';

window.toastr = toastr


function capitalize(string) {
    let capitalizedString = "";
    if (string === "it" || string === "mad") {
        capitalizedString = string.toUpperCase();
    } else {
        capitalizedString = string.charAt(0).toUpperCase() + string.slice(1);
    }
    return capitalizedString;
}

var app = angular.module('leaderApp', []);
app
    .directive('repeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    })
    .controller('leaderController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
        $scope.department = department1;
        $scope.createDataTable = function () {
            $(document).ready(function () {
                window.$('#pendingRequestsTable').DataTable({
                    dom: 'Bfrtip',
                    order: [],
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

        console.log('did you go through leader controller');
        $scope.selectedDate = "";
        $scope.selectedTime = "";
        $scope.confirmed = "";
        $scope.acceptedInterview = {
            cvID: "",
            name: "",
            availableTime: []
        };
        $scope.selectedDateTime = {
            date: '',
            time: ''
        };
        $scope.rejectedDetails = {
            _id: "",
            name: "",
            department: "",
            url: "",
            reasons: "",
            isDelete: false
        }



        //--------------------------------------------------------PAGE INTERFACE-------------------------------------------------

        $scope.loadPendingRequests = function () {
            $http.get('/talentCv/readTalentCv?isDelete=false&status=0&department=' + $scope.department, {})
                .then(function (response) {
                    $scope.pendingRequests = response.data;
                    console.log($scope.pendingRequests);
                }, function (response) {
                });
        }
        $scope.loadPendingRequests();


        //--------------------------------------------------ACCEPT REQUEST------------------------------------------------------------


        $scope.formatDateTime = function (date, time) {

            let startTime = moment(time).format("HH:mm")
            let endTime = moment(time).add(2, 'hours').format("HH:mm")
            let formattedDate = moment(date).format("DD MMM YYYY")
            return {
                userInputDate: formattedDate,
                userInputTimeData: startTime + "-" + endTime
            }

        }
        //this is used to add the possible dates and times for the interview
        $scope.addDateTime = function () {
            if ($scope.selectedDate && $scope.selectedTime) {
                let results = $scope.formatDateTime($scope.selectedDate, $scope.selectedTime);
                $scope.acceptedInterview.availableTime.push(results);
                $scope.selectedDate = "";
                $scope.selectedTime = "";
            } else {
                $scope.invalidDate = true;
            }
            // if ($scope.selectedDate && $scope.selectedTime) {
            //     $scope.formatDate($scope.selectedDate);
            //     console.log("SE;ECTED Time:" + $scope.selectedTime);
            //     $scope.formatTime($scope.selectedTime);
            //     let endTime = moment($scope.formattedDateForCalculations + ' ' + $scope.formattedTimeForCalculations).add(2, 'hours').format("HH:mm");
            //     let woi = moment()
            //     console.log('Hellooooooooooooooo');
            //     console.log(endTime);
            //     $scope.timeDuration = $scope.formattedTime + "-" + endTime;
            //
            //     // -------------------------------- Time clash -----------------
            //     let startTimeRange = $scope.formattedDateForCalculations + " " + $scope.formattedTime;
            //     let endTimeRange = $scope.formattedDateForCalculations + " " + endTime;
            //     console.log("Start Time Range : " + startTimeRange);
            //     console.log("End Time Range : " + endTimeRange);
            //
            //     let userInputTimeRange = [moment(startTimeRange), moment(endTimeRange)];
            //
            //     console.log($scope.confirmed);
            //     if($scope.confirmed.length > 0){
            //         for (let i = 0; i < $scope.confirmed.length; i++) {
            //             console.log("TIMEEEEE : " + $scope.confirmed[i].availableTime.time);
            //             console.log("DATEEEEE : " + $scope.confirmed[i].availableTime.date);
            //             // let temp = $scope.confirmed[i].availableTime.time.split("-");
            //             // let dateArray = $scope.confirmed[i].availableTime.date.split('/');
            //             // let convertedDate = dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2];
            //             //
            //             // let unavailableStartTimeRange = moment(convertedDate).format("YYYY-MM-DD") + " " + temp[0];
            //             // let unavailableEndTimeRange = moment(convertedDate).format("YYYY-MM-DD") + " " + temp[1];
            //             // console.log("unavailableStartTimeRange :" + unavailableStartTimeRange);
            //             // console.log("unavailableEndTimeRange :" + unavailableEndTimeRange);
            //             // let unavailableTimeRange = [moment(unavailableStartTimeRange), moment(unavailableEndTimeRange)];
            //             //
            //             // let range = momentRange.range(userInputTimeRange);
            //             // let range2 = momentRange.range(unavailableTimeRange);
            //             //
            //             // if (range.overlaps(range2)) {
            //             //     toastr.error("Time clash with " + $scope.confirmed[i].arrangeID.cvID.name + "'s session on " + $scope.confirmed[i].availableTime.date + " at " + $scope.confirmed[i].availableTime.time, "TIME CLASH DETECTED!!!");
            //             //     console.log("time range 1 is partially conflict with time range 2 and vice versa");
            //             //     break;
            //             // } else {
            //             //     console.log($scope.formattedDate);
            //             //     console.log($scope.timeDuration);
            //             //     $scope.acceptedInterview.availableTime.push({
            //             //         date: $scope.formattedDate,
            //             //         time: $scope.timeDuration
            //             //     });
            //             //     $scope.selectedDate = "";
            //             //     $scope.selectedTime = "";
            //             //
            //             //     break;
            //             // }
            //         }
            //     }else{
            //         $scope.acceptedInterview.availableTime.push({
            //             date: $scope.formattedDate,
            //             time: $scope.timeDuration
            //         });
            //         $scope.selectedDate = "";
            //         $scope.selectedTime = "";
            //     }
            //
            //     $scope.invalidDate = false;
            //     console.log($scope.acceptedInterview.availableTime);
            // }

        }


        $scope.acceptRequest = function (data) {
            $scope.selectedDate = "";
            $scope.selectedTime = "";
            $scope.acceptedName = data.name;
            console.log(data);
            $scope.acceptedInterview = {
                cvID: data._id,
                availableTime: []
            };
        }

        $scope.submitAccept = function () {
            if ($scope.acceptedInterview.availableTime.length >= 1) {
                $http.post('/arrangeTime/leader/leaderSetTime', $scope.acceptedInterview).then(
                    function (response) {
                        console.log("Successfully");
                        console.log(response);
                        toastr.success("Interview request for " + $scope.acceptedName + " has been accepted! Awaiting confirmation from admin...", "SUCCESS");
                        $('#acceptRequest').modal('hide');
                        window.$('#pendingRequestsTable').DataTable().destroy();
                        $scope.loadPendingRequests();
                    }, function (response) {
                    });
            }

        }


        //--------------------------------------------------REJECT REQUEST-----------------------------------------
        $scope.rejectRequest = function (data) {
            $scope.rejectedName = data.name;
            $scope.rejectedDetails = {
                cvID: data._id,
                reasons: ""
            };
        }

        $scope.submitReject = function () {
            $scope.rejectedDetails.reasons = $scope.rejectReason;
            $http.post('/talentCv/leaderReject', $scope.rejectedDetails).then(
                function (response) {
                    toastr.error($scope.rejectedName + "'s interview session has been rejected and removed", "REJECTED");
                    $('#confirmBox').modal('hide');
                    window.$('#pendingRequestsTable').DataTable().destroy();
                    $scope.loadPendingRequests();
                    console.log(response);
                }, function (response) {
                });

        }


    }]);
