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
                $http.post(baseUrl + '/api/customers' + customer.id, customer)
                    .success(success)
                    .error(error);
            },
            delete: function (customer, success, error) {
                console.log("Customer Service");
                console.log(customer);
                $http.delete(baseUrl + '/api/customer/'+ customer.id)
                    .success(success)
                    .error(error);
            },
            update: function (customer, success, error) {
                console.log("Customer Service");
                console.log(customer);
                $http.put(baseUrl + '/api/customer/'+ customer.id, customer)
                    .success(success)
                    .error(error);
            },
            get: function (customer, success, error) {
                console.log("Customer Service");
                $http.get(baseUrl + '/api/customer/'+ customer.id)
                    .success(success)
                    .error(error);
            }
        }

}]);