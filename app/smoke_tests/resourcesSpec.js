/**
 * Created by benek on 12/25/14.
 */

describe('resourcesProvider', function(){
  beforeEach(module('towns'));

  var resourcesProvider, Errors;

  beforeEach(inject(function(_resourcesProvider_, _Errors_){
    resourcesProvider = _resourcesProvider_;
    Errors = _Errors_;
  }));

  describe('decreaseResourceAmount', function(){
    it('throws insufficientResourceAmountError if there is not sufficient resource', function(){
      resourcesProvider.setResourceAmount('wood', 15);
      expect(function(){
        resourcesProvider.decreaseResourceAmount('wood', 25);
      }).toThrow(new Errors.insufficientResourceAmountError('wood', 15, 25));
    });

    it('throws Error if there is not sufficient resource', function(){
      var error_thrown = false;
      resourcesProvider.setResourceAmount('wood', 18);

      try {
        resourcesProvider.decreaseResourceAmount('wood', 20);
      } catch (e) {
        expect(e instanceof Error).toBeTruthy();
        error_thrown = true;
      }
      expect(error_thrown).toBeTruthy();
    });

  });

});