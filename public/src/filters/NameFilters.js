/**
 * Created by parag on 10/01/15.
 */
angular.module('CustomerManagementApp').
    filter('labelCase', function() {
        return function(input) {
            input = input.replace(/([A-Z])/g, ' $1');
            return input[0].toUpperCase() + input.slice(1);
        };
    }).
    filter('keyFilter', function () {
        return function(object, query) {
            var result = {};
            angular.forEach(object, function(value, key) {
                if (key !== query) {
                    result[key] = value;
                }
            })
            return result;
        };
    }).
    filter('camelCase', function() {
        return function(input) {
            return input.toLowerCase().replace(/ (\w)/g, function(match, letter) {
                return letter.toUpperCase();
            });
        }
    });

;