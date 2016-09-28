(function() {

    'use strict';

    angular.module('core').controller('HeaderController', headerController);

    function headerController($state) {
        /* jshint validthis: true */
        var vm = this;
        vm.state = $state;
    }

})();
