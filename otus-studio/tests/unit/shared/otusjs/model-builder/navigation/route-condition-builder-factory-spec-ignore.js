describe('RouteConditionBuilderFactory', function() {

    beforeEach(function() {
        module('otusjs');

        inject(function(_$injector_) {
            factory = _$injector_.get('RouteConditionBuilderFactory');
        });
    });

    describe('create method', function() {

        it('should return a RouteConditionBuilder', function() {
            var builder = factory.create();

            expect(builder).toBeDefined();
        });

    });

});