angular.module('CustomerManagementApp').
    value('FieldTypes', {
        text : ['Text' , 'should be text'],
        email : ['Email' , 'should be an email address'],
        number : ['Number' , 'should be a number'],
        date : ['Date' , 'should be date'],
        datetime : ['Datetime' , 'should be datetime'],
        time : ['Time' , 'should be time'],
        month : ['Month' , 'should be month'],
        week : ['Week' , 'should be week'],
        url : ['URL' , 'should be url'],
        tel : ['Phone Number' , 'should be a phone number'],
        color : ['Color' , 'should be a color']
    }).
    directive('formField',['$timeout', 'FieldTypes', 'CustomerService' , function($timeout, FieldTypes, CustomerService) {
        return {
            restrict : 'EA',
            templateUrl : 'views/form-field.html',
            replace : true,
            scope : {
                record: "=",
                field: "@",
                live: "@",
                required: "@"
            },
            link: function(scope, element, attr) {

                scope.$on('record:invalid', function() {
                    console.log("inside record invalid");
                    scope[scope.field].$setDirty();
                });

                scope.types = FieldTypes;

                scope.remove = function(field) {
                    delete scope.record[field];
                    scope.blurUpdate();
                };

                scope.blurUpdate = function() {
                    if (scope.live !== 'false' && typeof scope.record !== undefined) {
                        //TODO implement and call update API
                        CustomerService.update(scope.record, function(updatedRecord) {
                            scope.customer = updatedRecord;
                        }, function () {
                            //for error
                        });
                    }
                };
                var saveTimeOut;

                scope.update = function() {
                    $timeout.cancel(saveTimeOut);
                    saveTimeOut = $timeout(scope.blurUpdate, 1000);
                }
            }
        }
    }]).directive('newField',['$filter', 'FieldTypes', 'CustomerService' , function($filter, FieldTypes, CustomerService) {
        return {
            restrict : 'EA',
            templateUrl : 'views/new-field.html',
            replace : true,
            scope : {
                record : '=',
                live : '@'
            },
            require : '^form',
            link : function(scope, element, attrs, form, CustomerService) {

                scope.types = FieldTypes;
                scope.field = {};

                scope.show = function(type) {
                    console.log("inside scope show");
                    scope.field.type = type;
                    scope.display = true;
                };

                scope.remove = function() {
                    scope.field = {};
                    scope.display = false;
                };

                scope.add = function() {
                    if (form.newField.$valid) {
                        scope.record[$filter('camelCase')(scope.field.name)] = [scope.field.value, scope.field.type];
                        scope.remove();
                        if (scope.live !== 'false') {
                            //TODO implement and call update API
                            CustomerService.update(scope.record, function(updatedRecord) {
                                scope.record = updatedRecord;
                            }, function () {
                                //for error
                            });
                        }
                    }
                }
            }
        }
    }]);