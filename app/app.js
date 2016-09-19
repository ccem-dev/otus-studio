(function() {

    angular
        .module('studio', [
            /* External modules */
            'dependencies',
            /* Application modules */
            'studio.dashboard',
            'studio.authenticator',
            'editor',
            'otusjs',
            'preview',
            'surveyTemplates',
            /* Otus platform modules */
            'ui.components',
            'utils',
            /* otusjs.player */
            'otusjs.player.core',
            'otusjs.player.component',
            'otus.validation'
        ]);

}());
