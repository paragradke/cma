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
    value('FieldStatus', {
        draft : ['Draft' , 'current status is draft'],
        submitted : ['Submitted' , 'current status is submitted'],
        verified : ['Verified' , 'current status is verified'],
        onHold : ['onHold' , 'current status is onHold']
    }).
    directive('formField',['$timeout','$filter', 'FieldTypes', 'CustomerService' , function($timeout, $filter, FieldTypes ,CustomerService) {
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
                    console.log("inside remove")
                    console.log(field);
                    //scope.blurUpdate();
                    var propertyToDelete = {};
                    if (scope.live !== 'false' && typeof scope.record !== undefined) {
                        propertyToDelete[field] = scope.record[field];
                        //TODO implement and call update API
                        CustomerService.removeProperty(scope.record.id[0], propertyToDelete, function(deletedRecord) {
                            console.log(deletedRecord);
                            delete scope.record[field];
                            scope.blurUpdate();
                        }, function () {
                            //for error
                            alert("Failed to delete field")
                        });
                    }
                    //delete scope.record[field];
                };

                scope.blurUpdate = function() {

                };
                var saveTimeOut;

                scope.update = function() {
                    $timeout.cancel(saveTimeOut);
                    saveTimeOut = $timeout(scope.blurUpdate, 1000);
                }
            }
        }
    }]).directive('newField',['$filter', 'FieldTypes', 'FieldStatus', 'CustomerService' , function($filter, FieldTypes, FieldStatus, CustomerService) {
        return {
            restrict : 'EA',
            templateUrl : 'views/new-field.html',
            replace : true,
            scope : {
                record : '=',
                live : '@'
            },
            require : '^form',
            link : function(scope, element, attrs, form) {

                scope.types = FieldTypes;
                scope.status = FieldStatus;
                scope.field = {};

                scope.show = function(type) {
                    console.log("inside scope show");
                    scope.field.type = type;
                    scope.display = true;
                };

                scope.showStatus = function(status) {
                    console.log("inside scope showStatus :" + status);
                    scope.field.status = status;
                    scope.display = true;
                };

                scope.remove = function() {
                    scope.field = {};
                    scope.display = false;
                };

                scope.add = function() {
                    console.log("add property called");
                    if (form.newField.$valid) {
                        console.log("add property field is valid");
                        var newProperty = {};
                        console.log(scope.record);
                        newProperty[$filter('camelCase')(scope.field.name)] = [scope.field.value, scope.field.type, scope.field.status];
                        //scope.remove();
                        console.log(newProperty);
                        if (scope.live !== 'false') {
                            //TODO implement and call update API
                            CustomerService.addProperty(scope.record.id[0], newProperty, function(updatedRecord) {
                                //scope.record = updatedRecord;
                                console.log("property added");
                                console.log(updatedRecord);
                                scope.record[$filter('camelCase')(scope.field.name)] = [scope.field.value, scope.field.type, scope.field.status];
                            }, function () {
                                alert("Failed to save field")
                            });
                        }
                    }
                }
            }
        }
    }]);