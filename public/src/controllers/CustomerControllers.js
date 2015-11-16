angular.module('CustomerManagementApp').
    controller('ListCustomerController', ['$rootScope', '$routeParams', '$scope', '$location', '$localStorage', '$http', 'CustomerService',
        function($rootScope, $routeParams, $scope, $location, $localStorage, $http , CustomerService) {
        $scope.customers = [];
        console.log("Inside Customer Controller");
        CustomerService.list(function(res) {
            console.log(res);
            $scope.customers = res;
        },function(error) {
            console.log(error);
        });

        <!-- To show -->
        $scope.show = function(id) {
            $location.url('/customer/'+id);
        };

        $scope.fields = ['firstName', 'middleName', 'lastName', 'email', 'dateOfBirth', 'accountNo', 'role'];

        $scope.sort = function(field) {
            $scope.sort.field = field;
            $scope.sort.order = !$scope.sort.order;
        };

        $scope.sort.field = 'firstName';
        $scope.sort.order = false;
    }])
    .controller('showCustomerController', ['$scope', '$location', 'CustomerService', function($scope, $location, CustomerService) {

    }])
    .controller('CreateCustomerController', ['$scope', '$location', 'CustomerService', function($scope, $location, CustomerService) {
        $scope.customer = {
            firstName : ['', 'text'],
            middleName : ['', 'text'],
            lastName : ['', 'text'],
            email : ['', 'email'],
            contactNo : ['', 'tel'],
            dateOfBirth : ['', 'date'],
            accountNo : ['', 'text'],
            twitterProfile : ['', 'url'],
            role : ['', 'text'],
            country : ['', 'text'],
            address : ['', 'text']
        };

        $scope.save = function() {
            console.log("inside customer create service");
            if ($scope.newCustomer.$invalid) {
                $scope.$broadcast('record:invalid');
            } else {
                CustomerService.save($scope.customer, function(data) {
                    console.log(data);
                    $scope.customer = data;
                }, function(error){
                    //for error
                });
                $location.url('/customers');
            }
        };
        
        $scope.formUpdate = function() {
            CustomerService.update($scope.customer, function(data) {
                console.log(data);
                $scope.customer = data;
            }, function(){
                //for error
            });
        }
    }]);
