(function() {

    angular
        .module('editor.engine.ui')
        .service('WidgetLoaderService', WidgetLoaderService);

    WidgetLoaderService.$inject = [
        'editor.engine.ui.mpath',
        '$compile',
        '$templateRequest',
        '$templateCache',
        'WidgetService'
    ];

    function WidgetLoaderService(mpath, $compile, $templateRequest, $templateCache, WidgetService) {
        var self = this;

        /* Public interface */
        self.loadWidget = loadWidget;

        function loadWidget(model, scope, callback) {
            scope.widgetTemplateList = scope.widgetTemplateList || [];

            if (model.extends == 'Question') {
                var questionWidget = WidgetService.getWidgetForModel(model);
                loadEditorWidget(questionWidget, scope, callback);
            } else if (model.objectType == 'QuestionAnswerOption') {
                var widget = WidgetService.getQuestionAnswerOptionWidget(model);
                if (callback) callback(widget);
            }
        }

        function loadEditorWidget(modelWidget, scope, callback) {
            var widget = WidgetService.getQuestionEditorWidget(modelWidget);
            loadTemplate(mpath.getQuestionEditorWidgetPath(), widget, scope, function(widget) {
                if (callback) callback(widget.template);
            });
        }

        function loadTemplate(templateUrl, data, scope, callback) {
            $templateRequest(templateUrl).then(function(html) {
                scope.widget = data;
                scope.templateIndex = data.questionId;
                scope.widgetTemplateList[scope.templateIndex] = data.questionTemplate;
                scope.widget.template = compileTemplate(html, scope);

                if (callback) callback(scope.widget);
            });
        }

        function compileTemplate(html, scope) {
            return $compile(html)(scope);
        }
    }

}());