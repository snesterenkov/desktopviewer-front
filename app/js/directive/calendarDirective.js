'use strict';

directives.directive('picker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            setDate: '&'
        },
        link: function (scope, element, attributes, ctrl) {

            var picker = element.data("DateTimePicker");

            element.on('dp.change', function (event) {
                scope.$apply(function () {
                    var date = picker.date();
                    scope.setDate({ date: date });
                });
            });
        }
    };
});
