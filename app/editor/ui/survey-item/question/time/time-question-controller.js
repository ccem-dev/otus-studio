(function() {
  'use strict';

  angular
    .module('editor.ui')
    .controller('TimeQuestionController', Controller);

  Controller.$inject = [
    'AddOptionItemEventFactory',
    'UpdateOptionItemEventFactory',
    'RemoveOptionItemEventFactory'
  ]

  function Controller(AddOptionItemEventFactory, UpdateOptionItemEventFactory, RemoveOptionItemEventFactory) {
    var self = this;

    self.$onInit = onInit;
    self.updateOption = updateOption;
    self.getItem = getItem;

    function onInit() {
      self.item = self.getItem();

      self.button = true;
      self.disabledButton = 'disabledButton';
      if (self.item.isQuestion()) {
        if (self.item.options.data == undefined) {
          self.questionOptions = false;
        } else {
          self.questionOptions = self.item.options;
          self.button = self.item.options.data.disabledButton.value ? false : true;
          if (!self.questionOptions.data.disabledButton.value) {
            updateOption(self.disabledButton, !self.button);

          }
        }
      }
    }

    function updateOption(name, value) {
      if (!self.button) {
        AddOptionItemEventFactory.create().execute(self.item, name, value);
        getItem().options.data = self.questionOptions.data;
        UpdateOptionItemEventFactory.create().execute();
      } else {
        RemoveOptionItemEventFactory.create().execute(self.item, name);
      }
    }

    function getItem() {
      return self.item;
    }

  }

}());