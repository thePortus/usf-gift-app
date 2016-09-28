// wrapper
(function() {

    'use strict';

    angular.module('core')
        .directive('featureCategory', featureCategory);

    function featureCategory (staticPath) {
        var directive = {
            templateUrl: staticPath('core/templates/core.feature-category.template.html'),
            // variables to pass to directive controller
            scope: {
                category: '=',
                features: '='
            },
            controller: featureCategoryController,
            controllerAs: 'vm',
            bindToController: true // b/c isolated scope
        };
        return directive;
    }

    /* CONTROLLER FUNCTION */
    function featureCategoryController() {
            /* jshint validthis: true */
            var vm = this;

        }
        /* /CONTROLLER FUNCTION */
})(); // end wrapper
