/**
 * Created by benek on 2/19/15.
 */

describe('PersonDecider', function(){
  beforeEach(module('towns'));

  var PersonDecider, LocalMarket;

  beforeEach(inject(function (_PersonDecider_, _LocalMarket_) {
    PersonDecider = _PersonDecider_;
    LocalMarket = _LocalMarket_;
  }));

  describe('tryToBuyFood', function () {

    it('if person has no money he does not buy anything', function () {

      var person = {
        money: 0,
        safe_food_amount_max: 5,
        resources: {
          food: 0
        }
      };
      LocalMarket.getPriceToBuy = jasmine.createSpy('LocalMarket.getPriceToBuy').andReturn(1);
      LocalMarket.buy = jasmine.createSpy('LocalMarket.buy').andCallFake(LocalMarket.buy);

      PersonDecider._instance.tryToBuyFood(person);

      expect(LocalMarket.buy.callCount).toBe(0);
    });

    it('if person has 5 money he buys 5 food when food price is 1', function () {

      var person = {
        money: 5,
        safe_food_amount_max: 5,
        resources: {
          food: 0
        }
      };
      LocalMarket.getPriceToBuy = jasmine.createSpy('LocalMarket.getPriceToBuy').andReturn(1);
      LocalMarket.buy = jasmine.createSpy('LocalMarket.buy').andCallFake(LocalMarket.buy);

      PersonDecider._instance.tryToBuyFood(person);

      expect(LocalMarket.buy).toHaveBeenCalledWith('food', 5, person);
    });

    it('if person has 5000 money he buys 5 food when food price is 1', function () {

      var person = {
        money: 5000,
        safe_food_amount_max: 5,
        resources: {
          food: 0
        }
      };
      LocalMarket.getPriceToBuy = jasmine.createSpy('LocalMarket.getPriceToBuy').andReturn(1);
      LocalMarket.buy = jasmine.createSpy('LocalMarket.buy').andCallFake(LocalMarket.buy);

      PersonDecider._instance.tryToBuyFood(person);

      expect(LocalMarket.buy).toHaveBeenCalledWith('food', 5, person);
    });

    it('if person has 10 money he buys 2.5 food when food price is 4', function () {

      var person = {
        money: 10,
        safe_food_amount_max: 5,
        resources: {
          food: 0
        }
      };
      LocalMarket.getPriceToBuy = jasmine.createSpy('LocalMarket.getPriceToBuy').andReturn(4);
      LocalMarket.buy = jasmine.createSpy('LocalMarket.buy').andCallFake(LocalMarket.buy);

      PersonDecider._instance.tryToBuyFood(person);

      expect(LocalMarket.buy).toHaveBeenCalledWith('food', 2.5, person);
    });

    it('if person has 1 money he buys 0.25 food when food price is 4', function () {

      var person = {
        money: 1,
        safe_food_amount_max: 5,
        resources: {
          food: 0
        }
      };
      LocalMarket.getPriceToBuy = jasmine.createSpy('LocalMarket.getPriceToBuy').andReturn(4);
      LocalMarket.buy = jasmine.createSpy('LocalMarket.buy').andCallFake(LocalMarket.buy);

      PersonDecider._instance.tryToBuyFood(person);

      expect(LocalMarket.buy).toHaveBeenCalledWith('food', 0.25, person);
    });

    it('if person has 10 money he buys 4 food when food price is 1 and he already has 1 food', function () {

      var person = {
        money: 10,
        safe_food_amount_max: 5,
        resources: {
          food: 1
        }
      };
      LocalMarket.getPriceToBuy = jasmine.createSpy('LocalMarket.getPriceToBuy').andReturn(1);
      LocalMarket.buy = jasmine.createSpy('LocalMarket.buy').andCallFake(LocalMarket.buy);

      PersonDecider._instance.tryToBuyFood(person);

      expect(LocalMarket.buy).toHaveBeenCalledWith('food', 4, person);
    });

    it('if person has 10 money he do not buy any food when he already has 5 food', function () {

      var person = {
        money: 10,
        safe_food_amount_max: 5,
        resources: {
          food: 5
        }
      };
      LocalMarket.getPriceToBuy = jasmine.createSpy('LocalMarket.getPriceToBuy').andReturn(1);
      LocalMarket.buy = jasmine.createSpy('LocalMarket.buy').andCallFake(LocalMarket.buy);

      PersonDecider._instance.tryToBuyFood(person);

      expect(LocalMarket.buy.callCount).toBe(0);
    });

    it('if person has 1 money he do not buy any food when he already has 5 food', function () {

      var person = {
        money: 1,
        safe_food_amount_max: 5,
        resources: {
          food: 5
        }
      };
      LocalMarket.getPriceToBuy = jasmine.createSpy('LocalMarket.getPriceToBuy').andReturn(1);
      LocalMarket.buy = jasmine.createSpy('LocalMarket.buy').andCallFake(LocalMarket.buy);

      PersonDecider._instance.tryToBuyFood(person);

      expect(LocalMarket.buy.callCount).toBe(0);
    });

  });

  describe('tryToImproveNeedsSatisfaction', function () {

    it('if person has no money he do not try to buy any food', function () {

      var person = {
        money: 0,
        safe_food_amount_min: 3,
        resources: {
          food: 0
        }
      };
      PersonDecider._instance.tryToBuyFood = jasmine.createSpy('tryToBuyFood func');

      PersonDecider._instance.tryToImproveNeedsSatisfaction(person);

      expect(PersonDecider._instance.tryToBuyFood.callCount).toBe(0);
    });

    it('if person has some money he try to buy some food', function () {

      var person = {
        money: 1,
        safe_food_amount_min: 3,
        resources: {
          food: 0
        }
      };
      PersonDecider._instance.tryToBuyFood = jasmine.createSpy('tryToBuyFood func');

      PersonDecider._instance.tryToImproveNeedsSatisfaction(person);

      expect(PersonDecider._instance.tryToBuyFood).toHaveBeenCalledWith(person);
    });

    it('if person has some money but he also has 2 food he try to buy some food' +
    'when safe_food_amount_min is 3', function () {

      var person = {
        money: 1,
        safe_food_amount_min: 3,
        resources: {
          food: 2
        }
      };
      PersonDecider._instance.tryToBuyFood = jasmine.createSpy('tryToBuyFood func');

      PersonDecider._instance.tryToImproveNeedsSatisfaction(person);

      expect(PersonDecider._instance.tryToBuyFood).toHaveBeenCalledWith(person);
    });

    it('if person has some money but he also has 3 food he do not try to buy any food ' +
    'when safe_food_amount_min is 3', function () {

      var person = {
        money: 1,
        safe_food_amount_min: 3,
        resources: {
          food: 3
        }
      };
      PersonDecider._instance.tryToBuyFood = jasmine.createSpy('tryToBuyFood func');

      PersonDecider._instance.tryToImproveNeedsSatisfaction(person);

      expect(PersonDecider._instance.tryToBuyFood.callCount).toBe(0);
    });

  });

});