(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('InValidatorWidgetFactory', InValidatorWidgetFactory);

    function InValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new InValidator();
        }

        return self;
    }

    function InValidator() {
      var self = this;

      /* Public Methods */
      self.getTemplate = getTemplate;
      self.date = [];
      self.updateData = updateData;
      self.deleteValidator = deleteValidator;

      var parent = scope.$parent.widget.getItem();

      function updateData() {
          getRuleType().data.value = self.date;
      }

      function getRuleType() {
          return parent.fillingRules.options['minDate'];
      }

        function getTemplate(){
          return '<otus:in-validator></otus:in-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('in');
            console.log(self.element);
            self.element.remove();
            self.directiveScope.$destroy();
        }    }

}());
