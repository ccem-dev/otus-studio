(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.NavigationBuilderService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.MapFactory',
    'otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService',
    'otusjs.studio.navigationBuilder.navigationInspector.NavigationInspectorService'
  ];

  function service(MapFactory, RouteBuilderService, NavigationInspectorService) {
    var self = this;
    var _survey = null;
    var _navigationMap = {};
    var _activeServiceMode = null;

    /* Public methods */
    self.nodes = nodes;
    self.edges = edges;
    self.setSurvey = setSurvey;
    self.activateRouteCreatorMode = activateRouteCreatorMode;
    self.activateNavigationInspectorMode = activateNavigationInspectorMode;
    self.deactiveMode = deactiveMode;

    function nodes() {
      return _navigationMap.nodes();
    }

    function edges() {
      return _navigationMap.edges();
    }

    function setSurvey(survey) {
      _survey = survey;
      _loadTemplateNavigations(survey.NavigationManager.getNavigationList());
    }

    function activateRouteCreatorMode() {
      deactiveMode();
      _activeServiceMode = RouteBuilderService;
      _activeServiceMode.activate(_survey);
    }

    function activateNavigationInspectorMode() {
      deactiveMode();
      _activeServiceMode = NavigationInspectorService;
      _activeServiceMode.activate(_survey);
    }

    function deactiveMode() {
      if (_activeServiceMode) {
        return _activeServiceMode.deactivate();
      }
    }

    function _loadTemplateNavigations(templateNavigations) {
      _navigationMap = MapFactory.create();
      _addNodes(templateNavigations);
      _addEdges(templateNavigations);
    }

    function _addNodes(templateNavigations) {
      templateNavigations.forEach(function(navigation, index) {
        var options = {
          id: navigation.origin,
          label: navigation.origin,
          index: index
        };
        if (navigation.isDefault) {
          _navigationMap.createNodeForDefaultPath(options);
        } else {
          _navigationMap.createNodeForAlterantivePath(options);
        }
      });
    }

    function _addEdges(templateNavigations) {
      templateNavigations.forEach(function(navigation) {

        navigation.routes.forEach(function(route) {
          var options = {};
          options.source = route.origin;
          options.target = route.destination;

          if (route.isDefault) {
            _navigationMap.createEdgeForDefaultPath(options);
          } else {
            _navigationMap.createEdgeForAlterantivePath(options);
          }
        });

      });
    }
  }
})();
