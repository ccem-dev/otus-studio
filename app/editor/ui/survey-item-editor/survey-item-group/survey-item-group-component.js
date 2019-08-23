(function () {
  'use strict';

  angular.module('editor.ui')
    .component('surveyItemGroup', {
      templateUrl: 'app/editor/ui/survey-item-editor/survey-item-group/survey-item-group-template.html',
      controller: 'otusSurveyItemGroupCtrl as $ctrl',
      bindings: {
        item: "<",
      }
    })
    .controller('otusSurveyItemGroupCtrl', Controller);

  Controller.$inject = [
    'SurveyItemGroupService',
    '$scope'
  ];

  function Controller(SurveyItemGroupService, $scope) {
    var self = this;
    self.stateItemGroup = "createGroup";
    self.itemCandidateCheckbox = false;

    self.$onInit = onInit;
    self.editorSurveyItemGroup = editorSurveyItemGroup;
    self.setUpQuestionGroup = setUpQuestionGroup;

    function onInit() {
      SurveyItemGroupService.surveyItemsRegistry(self, _stateControl);
      _flagStatusGroupItems();
    }

    //internal callBack register in onInit
    function _stateControl() {
      let vm = this;
      self.stateItemGroup = vm.status;
    }

    function _flagStatusGroupItems(){
      let itemEndGroup = _checkEndItemGroup();
      itemEndGroup ? SurveyItemGroupService.identifiesGroupItemStatus(itemEndGroup.id): 0;
    }

    function _checkEndItemGroup(){
      return SurveyItemGroupService.verifyEndItemGroup(self.item.templateID) ? {id: self.item.templateID} : 0;
    }

    function editorSurveyItemGroup() {
      SurveyItemGroupService.getValidItemsByTemplateID(self.item.templateID);
    }

    function setUpQuestionGroup(){
      SurveyItemGroupService.setUpQuestionGroup(self.item.templateID)
    }
  }
}());
