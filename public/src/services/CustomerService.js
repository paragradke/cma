/**
 * Created by parag on 08/01/15.
 */
angular.module('CustomerManagementApp')
.factory('CustomerService',  ['$http', function($http) {
        var baseUrl = "http://localhost:3000";
        return {
            list: function (success, error) {
                $http.get(baseUrl + '/api/customers')
                    .success(success)
                    .error(error);
            },
            save: function (customer, success, error) {
                console.log("Customer Service");
                $http.post(baseUrl + '/api/customers', customer)
                    .success(success)
                    .error(error);
            },
            delete: function (customer, success, error) {
                console.log("Customer Service");
                console.log(customer);
                $http.delete(baseUrl + '/api/customers/'+ customer.id)
                    .success(success)
                    .error(error);
            },
            update: function (customer, success, error) {
                console.log("Customer Service");
                console.log(customer);
                $http.put(baseUrl + '/api/customers/'+ customer.id, customer)
                    .success(success)
                    .error(error);
            },
            addProperty: function (customerId, newProperty, success, error) {
                console.log("Customer Service addProperty");
                $http.post(baseUrl + '/api/addproperty/customers/'+ customerId, newProperty)
                    .success(success)
                    .error(error);
            },
            removeProperty: function (customerId, propertyToDelete, success, error) {
                console.log("Customer Service addProperty");
                $http.post(baseUrl + '/api/removeproperty/customers/'+ customerId, propertyToDelete)
                    .success(success)
                    .error(error);
            },
            get: function (customerId, success, error) {
                console.log("Customer Service");
                $http.get(baseUrl + '/api/customers/'+ customerId)
                    .success(success)
                    .error(error);
            }
        }

}]);