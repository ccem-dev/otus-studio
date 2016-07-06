(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMaxTimeValidator', otusMaxTimeValidator);

    function otusMaxTimeValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/maxTime/max-time-validator.html',
        };

        return ddo;
    }
}());
