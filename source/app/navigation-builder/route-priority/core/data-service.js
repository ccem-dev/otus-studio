(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationRoutePriority')
    .service('otusjs.studio.navigationBuilder.navigationRoutePriority.DataService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService'
  ];

  function service(moduleScope) {
    var self = this;
    var _survey = null;
    var _selectedNode = null;

    /* Public methods */
    // Service management
    self.activate = activate;
    self.deactivate = deactivate;
    self.selectNode = selectNode;
    self.selectedNode = selectedNode;

    //-----------------------------------------------------
    // Service management
    //-----------------------------------------------------

    function activate(survey) {
      _survey = survey;
    }

    function deactivate() {
      _survey = null;
    }

    //-----------------------------------------------------
    // Navigation Route Priority
    //-----------------------------------------------------

    function selectNode(node) {
      if (!_selectedNode) {
        _selectedNode = node;
        moduleScope.emit(moduleScope.NBEVENTS.NAVIGATION_SELECTED, _selectedNode);
      } else {
        moduleScope.emit(moduleScope.NBEVENTS.NAVIGATION_UNSELECTED, _selectedNode);
        if (node && node.id !== _selectedNode.id) {
          _selectedNode = node;
          moduleScope.emit(moduleScope.NBEVENTS.NAVIGATION_SELECTED, _selectedNode);
        } else {
          _selectedNode = null;
        }
      }
    }

    function selectedNode() {
      return _selectedNode;
    }
  }
})();
