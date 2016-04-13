(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('EditingSourceFactory', EditingSourceFactory);

    function EditingSourceFactory() {
        var self = this;

        /* Public interface */
        self.produceEditingSource = produceEditingSource;

        /*
         * Creates a simple EditingSource instance
         */
        function produceEditingSource(esComponent, esType, esId, esModel, esTarget, esProcessor) {
            return new EditingSource(esComponent, esType, esId, esModel, esTarget, esProcessor);
        }

        return self;
    }

    /* EditingSource model used as factory product */
    function EditingSource(esComponent, esType, esId, esModel, esTarget, esProcessor) {
        Object.defineProperty(this, 'type', {
            value: esType,
            writable: false
        });

        Object.defineProperty(this, 'id', {
            value: esId,
            writable: false
        });

        Object.defineProperty(this, 'model', {
            value: esModel,
            writable: false
        });

        Object.defineProperty(this, 'target', {
            value: esTarget,
            writable: false
        });

        Object.defineProperty(this, 'processor', {
            value: esProcessor,
            writable: false
        });

        Object.defineProperty(this, 'component', {
            value: EditingSource.prototype.getComponent(esComponent),
            writable: false
        });

    }

    EditingSource.prototype.getComponent = function(eventComponent) {
        return eventComponent[0];
    };

}());