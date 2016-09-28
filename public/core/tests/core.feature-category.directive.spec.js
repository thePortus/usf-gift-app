'use strict';

/*
 * NOTE: this example uses jasmine-jquery to make sure directive is properly loaded in the DOM
 *
 * See https://github.com/velesin/jasmine-jquery for more information.
 */

(function() {
    describe('feature-category', function() {
        beforeEach(module(ApplicationConfiguration.name));

        var scope, $elt, $httpBackend;

        beforeEach(inject(featureCategoryInject));

        function featureCategoryInject($rootScope, _$compile_, _$httpBackend_) {
            scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            _.extend(scope, {
                myFeature: {
                    'img': 'relative/path/to/img.jpg',
                    'name': 'Feature Name',
                    descriptionKey: 'SOME_TRANSLATION_KEY'
                }
            });
            var element = angular.element('<feature-category category="category" features="vm.features"></feature-category>');
            $elt = _$compile_(element)(scope);
            scope.$digest(); // call watchers
            it('should be usable', function() {
                expect($elt).toExist();
            });
        }

    });
})();
