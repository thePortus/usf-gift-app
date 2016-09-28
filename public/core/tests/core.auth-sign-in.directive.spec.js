'use strict';

(function() {

    describe('auth-sign-in directive', function() {
        beforeEach(module(ApplicationConfiguration.name));

        var scope, $elt;

        beforeEach(inject(function($rootScope, _$compile_) {
                scope = $rootScope.$new();
                _.extend(scope, {
                    // TODO: populate scope as needed
                });

                var element = angular.element('<auth-sign-in></auth-sign-in>');

                $elt = _$compile_(element)(scope);
                scope.$digest(); // call watchers
                it('should be usable', function() {
                    console.log($elt);
                    expect($elt).toExist();
                });
            }


        ));


    });

})();
