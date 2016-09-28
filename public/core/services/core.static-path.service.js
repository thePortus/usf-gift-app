(function() {

    'use strict';

    angular.module('core')
        .factory('staticPath', staticPathFactory)
        .filter('staticPath', staticPathFilter);

        function staticPathFactory(staticRoot) {
            return function(path) {
                return (staticRoot || '/static/') + path;
            };
        }

        function staticPathFilter(staticPath) {
            return function(path) {
                return staticPath(path);
            };
        }

})();
