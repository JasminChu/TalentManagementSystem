import _ from 'lodash';
import angular from 'angular';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import toastr from "toastr";
window.toastr = toastr

var app = angular.module('allRequestsAdminApp', []);
app
    .directive('repeatDone', function () {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    })

    .controller('allRequestsAdminController', ['$scope', '$http', function ($scope, $http) {
        $scope.createDataTable = function () {
            $(document).ready(function () {
                // $.noConflict()
                window.$('#allRequestsTable').DataTable({
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

        $scope.loadAll = function () {
            $http.get('/talentCv/readTalentCv?isDelete=false', {})
                .then(function (response) {
                    $scope.showEdit = true;
                    $scope.allRequests = response.data;
                }, function (response) {
                });
        }

        $scope.submitInterview = function () {
            if ($scope.interviewRequest.name && $scope.interviewRequest.url && $scope.interviewRequest.department) {
                $http.post('/talentCv/admin/uploadTalentCv', $scope.interviewRequest).then(
                    function (response) {
                        toastr.success("Interview request for " + $scope.interviewRequest.name + " has been successfully sent!", "SUCCESS")
                        $('#newInterview').modal('hide');
                        $scope.interviewRequest.name = "";
                        $scope.interviewRequest.url = "";
                        $scope.interviewRequest.department = "";
                        $scope.formError = false;
                        window.$('#allRequestsTable').DataTable().destroy();
                        $scope.loadAll();
                    }, function (response) {
                    });
            } else {
                $scope.formError = true;
            }

        };


        $scope.displayRequests = function (data) {
            window.$('#allRequestsTable').DataTable().destroy();
            if (data == "rejected") {
                $scope.activeState = data;
                $scope.showEdit = false;
                $scope.showRejected = true;
                $http.get('/talentCv/readTalentCv?isDelete=false&status=2', {})
                    .then(function (response) {
                        $scope.allRequests = response.data;
                    }, function (response) {
                    });
            } else if (data == "accepted") {
                $scope.showRejected = false;
                $scope.showEdit = false;
                $scope.activeState = data;
                $http.get('/talentCv/readTalentCv?isDelete=false&status=1', {})
                    .then(function (response) {
                        $scope.allRequests = response.data;
                    }, function (response) {
                    });
            }  else if (data == "pending") {
                $scope.showRejected = false;
                $scope.showEdit = true;
                $scope.activeState = data;
                $http.get('/talentCv/readTalentCv?isDelete=false&status=0', {})
                    .then(function (response) {
                        $scope.allRequests = response.data;
                    }, function (response) {
                    });
            }else if (data == undefined){
                $scope.showRejected = false;
                $scope.activeState = data;
                $scope.loadAll();
            }
        }

        $scope.editInterviewRequest = function(data){
            console.log(data);
            $scope.editDetails = data;
            $scope.newDetails = {
                name:"",
                department: "",
                url:"",
                cvID: data._id
            }
        }

        $scope.submitEdit = function(){

            if (!$scope.newDetails.name){
                $scope.newDetails.name = $scope.editDetails.name;
            }
            if (!$scope.newDetails.url){
                $scope.newDetails.url = $scope.editDetails.url;
            }
            if (!$scope.newDetails.department){
                $scope.newDetails.department = $scope.editDetails.department;
            }
            console.log($scope.newDetails);
            $http.post('/talentCv/admin/editTalentCv', $scope.newDetails)
                .then(function (response) {
                    toastr.success($scope.editDetails.name + "'s details has been edited", "SUCCESS");
                    $('#editInterviewRequest').modal('hide');
                    window.$('#allRequestsTable').DataTable().destroy();
                    if ($scope.activeState === 'pending'){
                        $scope.displayRequests('pending')
                    }else{
                        $scope.loadAll();
                    }
                }, function (response) {
                });

        }

        $scope.deleteRequest = function(){
            $http.post('/talentCv/admin/reallyDelete', $scope.editDetails)
                .then(function (response) {
                    toastr.error($scope.editDetails.name + "'s details has been deleted", "DELETED");
                    $('#confirmDelete').modal('hide');
                    window.$('#allRequestsTable').DataTable().destroy();
                    if ($scope.activeState === 'pending'){
                        $scope.displayRequests('pending')
                    }else{
                        $scope.loadAll();
                    }

                }, function (response) {
                });
        }


        $scope.loadAll();
    }]);
