/**
 * Created by parag on 08/01/15.
 */
angular.module('CustomerManagementApp')
.factory('UserService',  ['$http', '$localStorage', function($http, $localStorage) {
        var baseUrl = "http://localhost:3000";
        console.log("inside UserService");

        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var currentUser = getUserFromToken();

        return {
            save: function (data, success, error) {
                $http.post(baseUrl + '/api/users', data).success(success).error(error)
            },
            get: function (id, success, error) {
                $http.get(baseUrl + '/api/user/'+id).success(success).error(error)
            },
            list: function (success, error) {
                $http.get(baseUrl +'/api/users').success(success).error(error);
            },
            update: function (id, success, error) {
                console.log("inside update");
                $http.post(baseUrl +'/api/user/'+id).success(success).error(error);
            }
        };


    }]);