(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('UIDataSelector', UIDataSelector);

    UIDataSelector.$inject = ['WorkspaceService', 'UIUpdateCommandFactory'];

    function UIDataSelector(WorkspaceService, UIUpdateCommandFactory) {
        var self = this;

        /* Public interface */
        self.select = select;

        function select(target) {
            var targetList = target.split('.');
            var selectedData = WorkspaceService.workspace.project.survey.questionContainer[targetList[2]];

            var update = { type: 'SELECT_DATA', dataModel: selectedData.extends, data: selectedData };
            var uiUpdateCommand = UIUpdateCommandFactory.create(update);
            uiUpdateCommand.execute();
        }
    }

}());
