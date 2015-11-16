angular.module('CustomerManagementApp', ['ngRoute', 'ngResource', 'ngStorage', 'ngMessages'])
.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/customers/:customerId', {
                controller: 'showCustomerController',
                templateUrl: 'views/showCustomer.html'
            })
            .when('/', {
                controller: 'ListCustomerController',
                templateUrl: 'views/listCustomers.html'
            })
            .when('/customers', {
                controller: 'CreateCustomerController',
                templateUrl: 'views/createCustomer.html'
            });

        $locationProvider.html5Mode(true);
    });