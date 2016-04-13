(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('QuestionBuilderService', QuestionBuilderService);

    QuestionBuilderService.$inject = [
        'QuestionFactory',
        'QuestionNavigationFactory',
        'NavigationFactory'
    ];

    function QuestionBuilderService(QuestionFactory, QuestionNavigationFactory, NavigationFactory) {
        var self = this,
            observers = [],
            workResult = {};

        /* Public interface */
        self.runValidations = runValidations;
        self.execute = execute;
        self.getWorkResult = getWorkResult;

        /* Observable interface */
        self.registerObserver = registerObserver;

        // TODO: Implement validator to run here
        function runValidations(work) {
            workResult.status = true;
        }

        function getWorkResult() {
            return workResult;
        }

        function execute(work) {
            var question = null;

            if (work.type.isAddData()) {
                question = addQuestion(work);
            } else if (work.type.isRemoveData()) {
                question = removeQuestion(work);
            } else if (work.type.isUpdateData()) {
                updateQuestion(work);
            }

            workResult.data = question;
            notifyObservers(question, work.type);
        }

        function addQuestion(work) {
            var newQuestion = QuestionFactory.create(work.model, work.questionId);
            work.survey.questionContainer[work.questionId] = newQuestion;
            work.survey.addNavigation(NavigationFactory.create(work.questionId));

            return newQuestion;
        }

        function removeQuestion(work) {
            var selectedQuestion = work.target.split('.')[2],
                questionToRemove = work.survey.questionContainer[selectedQuestion];

            delete work.survey.questionContainer[selectedQuestion];
            work.type.dataModel = 'Question';
            return questionToRemove;
        }

        function updateQuestion(work) {
            if (work.id == 'survey-questions-move-back-question') {
                var targetQuestion = work.target;
                var indexToMove = work.survey.questionContainer[getQuestionOID(targetQuestion)];
            } else if (work.id == 'survey-questions-move-forward-question') {

            }
            // var selectedQuestion = work.target.split('.')[2],
            //     questionToUpdate = work.survey.getQuestionContainer()[selectedQuestion];
            //
            // questionsToUpdate.label.ptBR.text = work.data.value;
        }

        function notifyObservers(question, work) {
            work.data = question;
            observers.forEach(function(observer) {
                observer.update(work);
            });
        }

        function registerObserver(observer) {
            var registered = observers.filter(function (o) {
                if (o.identifier === observer.identifier) {
                    return o;
                }
            });

            if (registered.length === 0)
                observers.push(observer);
        }

        function getQuestionOID(target) {
            return target.split('.')[2];
        }
    }

}());