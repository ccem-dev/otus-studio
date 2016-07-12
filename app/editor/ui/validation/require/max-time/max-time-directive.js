(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMaxTimeValidator', otusMaxTimeValidator);

    function otusMaxTimeValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/max-time/max-time-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }
        };

        return ddo;
    }
}());