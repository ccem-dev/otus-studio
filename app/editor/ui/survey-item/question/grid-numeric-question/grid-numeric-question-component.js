(function () {
  'use strict';

  angular
    .module('editor.ui')
    .component('gridNumericQuestion', {
      controller: Controller,
      templateUrl: 'app/editor/ui/survey-item/question/grid-numeric-question/grid-numeric-question-template.html',
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [
    '$scope',
    '$element',
    'UpdateQuestionEventFactory'
  ];

  function Controller($scope, $element, UpdateQuestionEventFactory) {
    var self = this;

    self.$onInit = onInit;
    self.addGridLine = addGridLine;
    self.removeGridLine = removeGridLine;
    self.save = save;

    function onInit() { };

    function addGridLine() {
      self.item.createLine();
      self.save();
    }

    function removeGridLine(gridLineIndex) {
      self.item.removeLine(gridLineIndex);
      self.save();
    }

    function save() {
      UpdateQuestionEventFactory.create().execute(self);
    }
  }

}());
