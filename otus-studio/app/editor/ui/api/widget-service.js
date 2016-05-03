(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('WidgetService', WidgetService);

    WidgetService.$inject = [
        'WidgetTemplateService',
        'QuestionWidgetFactory',
        'QuestionEditorWidgetFactory',
        'QuestionAnswerOptionEditorWidgetFactory',
        'MetadataGroupWidgetFactory',
        'MetadataOptionWidgetFactory',
        'NavigationWidgetFactory',
        'RouteEditorWidgetFactory',
        'RouteCreatorWidgetFactory',
	'PageItemWidgetFactory',
        'PageItemEditorWidgetFactory'
    ];

    function WidgetService(WidgetTemplateService, QuestionWidgetFactory, QuestionEditorWidgetFactory, QuestionAnswerOptionEditorWidgetFactory,
        MetadataGroupWidgetFactory, MetadataOptionWidgetFactory, NavigationWidgetFactory, RouteEditorWidgetFactory, RouteCreatorWidgetFactory, PageItemWidgetFactory, PageItemEditorWidgetFactory) {

        var self = this;

        self.widgetMap = {};

        /* Public interface */
        self.getWidgetForModel = getWidgetForModel;
        self.getMetadataWidget = getMetadataWidget;
        self.getQuestionEditorWidget = getQuestionEditorWidget;
        self.getQuestionAnswerOptionWidget = getQuestionAnswerOptionWidget;
        self.getMetadataAnswerOptionWidget = getMetadataAnswerOptionWidget;
        self.getNavigationEditorWidget = getNavigationEditorWidget;
        self.getRouteWidget = getRouteWidget;
        self.getRouteCreatorWidget = getRouteCreatorWidget;
        self.getPageItemWidget = getPageItemWidget;
        self.getPageItemEditorWidget = getPageItemEditorWidget;

        function getWidgetForModel(model) {
            var widget = QuestionWidgetFactory.create(model);
            widget.template = WidgetTemplateService.getDirectiveTemplate(model.objectType);
            return widget;
        }

        function getMetadataWidget(model) {
            var widget = MetadataGroupWidgetFactory.create(model);
            widget.template = WidgetTemplateService.getDirectiveTemplate('MetadataGroup');
            return widget;
        }

        function getQuestionEditorWidget(question) {
            return QuestionEditorWidgetFactory.create(question);
        }

        function getQuestionAnswerOptionWidget(model) {
            return QuestionAnswerOptionEditorWidgetFactory.create(model);
        }

        function getMetadataAnswerOptionWidget(model) {
            return MetadataOptionWidgetFactory.create(model);
        }

        function getNavigationEditorWidget(model) {
            return NavigationWidgetFactory.create(model);
        }

        function getRouteWidget(navigation, model) {
            return RouteEditorWidgetFactory.create(navigation, model);
        }

        function getRouteCreatorWidget(model, element) {
            var widget = RouteCreatorWidgetFactory.create(model, element);

            self.widgetMap[widget.type] = self.widgetMap[widget.type] || {};
            self.widgetMap[widget.type][widget.name.guid] = widget.name;
            self.widgetMap[widget.type][widget.destination.guid] = widget.destination;
            self.widgetMap[widget.type][widget.processor.guid] = widget.processor;
            return widget;
        }

        function getPageItemWidget(item){
            return PageItemWidgetFactory.create(item);
        }

        function getPageItemEditorWidget(item) {
            return PageItemEditorWidgetFactory.create(item);
        }
    }

}());
