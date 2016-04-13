(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('BuilderSelectorService', BuilderSelectorService);

    function BuilderSelectorService() {
        var self = this;

        /* Public interface */
        self.getBuilderName = getBuilderName;

        function getBuilderName(editingTarget) {
            return filter(editingTarget);
        }

        function filter(target) {
            var IDENTITY_REGEX = /^survey\.identity/;
            var QUESTION_CONTAINER_REGEX = /^survey\.question$/;
            var SELECTED_QUESTION_REGEX = /^survey\.question.[\d|\w|\-]+$/;
            var LABEL_REGEX = /survey\.question\.[\d|\w|\-]+\.label/;
            var UNIT_REGEX = /survey\.question\.[\d|\w|\-]+\.unit/;
            var ANSWER_OPTION_REGEX = /survey\.question\.[\d|\w|\-]+\.option/;
            var NAVIGATION_CONTAINER_REGEX = /^survey\.navigations$/;
            var ROUTE_REGEX = /^survey\.navigations\[[\d|\w|\-]\]\.routes\[[\d|\w|\-]\]/;
            var ROUTE_TO_REMOVE_REGEX = /^survey\.navigations\[[\d|\w|\-]\]\.routeToRemove/;
            var METADATA_REGEX = /survey\.question\.[\d|\w|\-]+\.metadata.option/;

            if (LABEL_REGEX.test(target)) {
                return 'LabelBuilderService';
            } else if (UNIT_REGEX.test(target)) {
                return 'UnitBuilderService';
            } else if (QUESTION_CONTAINER_REGEX.test(target)) {
                return 'QuestionBuilderService';
            } else if (SELECTED_QUESTION_REGEX.test(target)) {
                return 'QuestionBuilderService';
            } else if (IDENTITY_REGEX.test(target)) {
                return 'SurveyIdentityBuilderService';
            } else if (ANSWER_OPTION_REGEX.test(target)) {
                return 'AnswerOptionBuilderService';
            } else if (NAVIGATION_CONTAINER_REGEX.test(target)) {
                return 'RouteBuilderService';
            } else if (ROUTE_TO_REMOVE_REGEX.test(target)) {
                return 'RouteBuilderService';
            } else if (ROUTE_REGEX.test(target)) {
                return 'RouteBuilderService';
            }else if (METADATA_REGEX.test(target)) {
                return 'MetadataAnswerBuilderService';
            }

            return target;
        }
    }

}());
