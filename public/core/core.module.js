(function() {

    'use strict';

    ApplicationConfiguration.registerModule('core');
    angular.module('core')
        .config(appConfig)
        .run(runApp);

    function appConfig(staticRoot, $stateProvider) {
        /**
         * PROJECT ROUTES
         *
         * Use `yo djangularjs:angular-route <route-name>` to create new routes
         *
         * NOTE: routes are centralized here to make sure they are processed in the right order
         **/
        var staticPath = function(path) {
            return staticRoot + path;
        };

        $stateProvider
            .state('home', { // main page once logged in
                url: '/',
                templateUrl: staticPath('core/views/core.home.view.html'),
                controller: 'HomeController as vm',
                resolve: {}
            })
            /* leave me here */
        ;
    }

    function runApp($rootScope, $log, format) {
        $rootScope.$on('$stateChangeError', stateChangeError);

        function stateChangeError(event, toState, toParams, fromState, fromParams, error) {
            $log.warn(format('Cannot navigate from {} to {}.\nError: {}', fromState.url, toState.url, error));
        }
    }

})();
