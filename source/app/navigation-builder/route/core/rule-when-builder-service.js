(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RuleWhenBuilderService', service);

  function service() {
    var self = this;
    var _mapping = {};

    /* Public methods */
    self.build = build;

    _initializeIconList();

    function build(item) {
      var builded = {};

      builded.type = item.objectType;
      builded.icon = _mapping[item.objectType];
      builded.templateID = item.templateID;
      builded.customID = item.customID;//adicionada
      builded.label = item.label;
      builded.item = item;

      return builded;
    }

    function _initializeIconList() {
      _mapping.CalendarQuestion = {};
      _mapping.CalendarQuestion.image = 'date_range';
      _mapping.CalendarQuestion.tooltip = 'Data';

      _mapping.IntegerQuestion = {};
      _mapping.IntegerQuestion.image = 'looks_one';
      _mapping.IntegerQuestion.tooltip = 'Número Inteiro';

      _mapping.DecimalQuestion = {};
      _mapping.DecimalQuestion.image = 'exposure_zero';
      _mapping.DecimalQuestion.tooltip = 'Número Decimal';

      _mapping.SingleSelectionQuestion = {};
      _mapping.SingleSelectionQuestion.image = 'radio_button_checked';
      _mapping.SingleSelectionQuestion.tooltip = 'Seleção Única';

      _mapping.CheckboxQuestion = {};
      _mapping.CheckboxQuestion.image = 'check_box';
      _mapping.CheckboxQuestion.tooltip = 'Checkbox';

      _mapping.TextQuestion = {};
      _mapping.TextQuestion.image = 'text_format';
      _mapping.TextQuestion.tooltip = 'Texto';

      _mapping.EmailQuestion = {};
      _mapping.EmailQuestion.image = 'email';
      _mapping.EmailQuestion.tooltip = 'Email';

      _mapping.TimeQuestion = {};
      _mapping.TimeQuestion.image = 'access_time';
      _mapping.TimeQuestion.tooltip = 'Hora';

      _mapping.PhoneQuestion = {};
      _mapping.PhoneQuestion.image = 'phone';
      _mapping.PhoneQuestion.tooltip = 'Telefone';

      _mapping.AutocompleteQuestion = {};
      _mapping.AutocompleteQuestion.image = 'youtube_searched_for';
      _mapping.AutocompleteQuestion.tooltip = 'Auto Completar';

      _mapping.FileUploadQuestion = {};
      _mapping.FileUploadQuestion.image = 'attach_file';
      _mapping.FileUploadQuestion.tooltip = 'Upload de Arquivo';

      _mapping.TextItem = {};
      _mapping.TextItem.image = 'message';
      _mapping.TextItem.tooltip = 'Texto';

      _mapping.ImageItem = {};
      _mapping.ImageItem.image = 'image';
      _mapping.ImageItem.tooltip = 'Imagem';

      _mapping.GridTextQuestion = {};
      _mapping.GridTextQuestion.image = 'grid_on';
      _mapping.GridTextQuestion.tooltip = 'Grade de Texto';

      _mapping.GridIntegerQuestion = {};
      _mapping.GridIntegerQuestion.image = 'grid_on';
      _mapping.GridIntegerQuestion.tooltip = 'Grade de Número';
    }
  }
})();
