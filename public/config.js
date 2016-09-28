'use strict';

/* Keeping app config outside wrapper function to maintain global scope */
var ApplicationConfiguration = (function() {
    var APP_NAME = 'app';
    return {
        name: APP_NAME,
        dependencies: [
            'ngResource', 'ngAnimate', 'ngCookies', 'ngMessages',
            'ngSanitize', 'ui.router', 'ui.router.title',
            'angular-loading-bar', 'angularMoment',
            'restangular', 'pascalprecht.translate', 'angular-toolbox',
            'ngAria', 'ngMaterial'
        ],
        registerModule: function(moduleName, dependencies) {
            // Create angular module
            var module = angular.module(moduleName, dependencies || []);
            // Add the module to the AngularJS configuration file
            angular.module(APP_NAME).requires.push(moduleName);
            return module;
        }
    };
})();

/* Wrapper function to keep variables from global scope */
(function() {

    angular.module(ApplicationConfiguration.name, ApplicationConfiguration.dependencies)
        .config(httpProviderConfig)
        .config(restangularProviderConfig)
        .config(translateProviderConfig)
        .config(localizationProvidersConfig)
        .config(mdThemeConfig);

    function httpProviderConfig($httpProvider) {
        // django and angular both support csrf tokens. This tells angular which cookie to add to what header.
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }

    function restangularProviderConfig(RestangularProvider) {
        // dealing with the slash difference between django and angular URLs
        RestangularProvider.setRequestSuffix('/');
    }

    function translateProviderConfig($translateProvider) {
        // internationalization translation config
        
        $translateProvider.fallbackLanguage('en');
        $translateProvider.useMessageFormatInterpolation();
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.determinePreferredLanguage();
    }

    function localizationProvidersConfig($locationProvider, $urlRouterProvider, $stateProvider, $httpProvider) {
        // internationalization location config
        $locationProvider.hashPrefix('!');

        function unauthorizedInterceptor($q, $window) {
            return {
                responseError: responseError
            };

            function responseError(rejection) {
                switch (rejection.status) {
                    case 401:
                    case 403:
                        $window.location.href = '/'; // Redirect to signin page
                        break;
                }
                return $q.reject(rejection);
            }
        }
        // Set the httpProvider "not authorized" interceptor
        $httpProvider.interceptors.push(unauthorizedInterceptor);

        // ROUTES
        // -- Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');
    }

    function mdThemeConfig($mdThemingProvider) {
        // Material Design palette config
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .backgroundPalette('grey')
            .accentPalette('deep-orange');
        $mdThemingProvider.theme('default-dark')
            .primaryPalette('blue-grey')
            .backgroundPalette('grey')
            .accentPalette('deep-orange')
            .dark();
    }

    // Bootstrap the app window and prepare
    angular.element(document).ready(bootstrapApp);

    function bootstrapApp() {
        //Fixing facebook bug with redirect
        if (window.location.hash === '#_=_') window.location.hash = '#!';

        // bootstrap the app
        angular.bootstrap(document, [ApplicationConfiguration.name]);
    }

})();
