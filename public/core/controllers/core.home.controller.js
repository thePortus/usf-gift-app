(function() {

    'use strict';

    angular.module('core').controller('HomeController', homeController);

    function homeController(featuresCatalogue) {

        /* jshint validthis: true */
        var vm = this;

        vm.features = featuresCatalogue;

        vm.show_features = false;

    }

})();
