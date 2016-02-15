(function() {

    angular
        .module('editor.engine.core')
        .service('SurveyQuestionEditorService', SurveyQuestionEditorService);

    SurveyQuestionEditorService.$inject = [
        'SurveyEditorService',
        'CalendarQuestionFactory',
        'NumericQuestionFactory',
        'SingleSelectionQuestionFactory',
        'TextQuestionFactory',
        'TimeQuestionFactory',
        'SurveyQuestionsUpdateService'
    ];

    function SurveyQuestionEditorService(SurveyEditorService, CalendarQuestionFactory, NumericQuestionFactory, SingleSelectionQuestionFactory, TextQuestionFactory, TimeQuestionFactory, SurveyQuestionsUpdateService) {
        var self = this;

        /* Public interface */
        self.createCalendarQuestion = createCalendarQuestion;
        self.createNumericQuestion = createNumericQuestion;
        self.createSingleSelectionQuestion = createSingleSelectionQuestion;
        self.createTextQuestion = createTextQuestion;
        self.createTimeQuestion = createTimeQuestion;

        function createCalendarQuestion() {
            return createQuestion(CalendarQuestionFactory);
        }

        function createNumericQuestion() {
            return createQuestion(NumericQuestionFactory);
        }

        function createSingleSelectionQuestion() {
            return createQuestion(SingleSelectionQuestionFactory);
        }

        function createTextQuestion() {
            return createQuestion(TextQuestionFactory);
        }

        function createTimeQuestion() {
            return createQuestion(TimeQuestionFactory);
        }

        function createQuestion(questionFactory) {
            var survey = SurveyEditorService.getCurrentSurvey();
            return SurveyQuestionsUpdateService.addQuestion(questionFactory, survey);
        }
    }

}());
