/**
 * Created by benek on 12/25/14.
 */

describe('mapProvider', function(){
  beforeEach(module('towns'));

  var mapProvider, _map_config, Errors, saved_map_config = {};

  beforeEach(inject(function(_mapProvider_, __map_config_, _Errors_){
    mapProvider = _mapProvider_;
    _map_config = __map_config_;
    Errors = _Errors_;
    saved_map_config.x = _map_config.map_dim.x;
    saved_map_config.y = _map_config.map_dim.y;
  }));

  afterEach(inject(function(__map_config_){
    __map_config_.map_dim.x = saved_map_config.x;
    __map_config_.map_dim.y = saved_map_config.y;
  }));

  describe('getEmptyRandomBlockIndex', function () {

    for (var n = 1, m = 1; m < 15; n++) {
      it(['returns each block if it calls so many times as count of blocks (', n, '*', m, ')'].join(''),
        (function(n, m){
          return function (){
            var random_indexes = [],
                blocks = mapProvider.getAllBlocks();

            _map_config.map_dim.x = n;
            _map_config.map_dim.y = m;
            mapProvider.initMap();

            for (var i = 0, index; i < n * m; i++) {
              index = mapProvider.getEmptyRandomBlockIndex();
              blocks[index].building = jasmine.createSpy(['Building on index', index].join());
              random_indexes.push(index);
            }

            expect(random_indexes.length).toBe(n * m);

            random_indexes.sort(function(a, b){ return a < b ? -1 : (a == b ? 0 : 1); });
            for (var j = 0; j < n * m; j++) {
              expect(random_indexes[j]).toBe(j);
            }
          }
        })(n, m)
      );

      if (n > 10) {
        m++;
        n = 0;
      }
    }

    it('throws noEmptyMapBlocksError if there is no empty block', function () {
      var random_indexes = [],
          blocks = mapProvider.getAllBlocks(),
          n = 18, m = 19;

      _map_config.map_dim.x = n;
      _map_config.map_dim.y = m;
      mapProvider.initMap();

      for (var i = 0, index; i < n * m; i++) {
        index = mapProvider.getEmptyRandomBlockIndex();
        blocks[index].building = jasmine.createSpy(['Building on index', index].join());
        random_indexes.push(index);
      }

      expect(random_indexes.length).toBe(n * m);

      expect(function () {
        mapProvider.getEmptyRandomBlockIndex();
      }).toThrow(new Errors.noEmptyMapBlocksError());
    });
  });

  describe('getEmptyRandomBlockIndexWithinRect', function () {
    it('returns each block within given rect', function () {
      var random_indexes = [],
          blocks = mapProvider.getAllBlocks(),
          n = 16, m = 21, x = 5, y = 3, width = 3, height = 6;

      _map_config.map_dim.x = n;
      _map_config.map_dim.y = m;
      mapProvider.initMap();

      for (var i = 0, index; i < width * height; i++) {
        index = mapProvider.getEmptyRandomBlockIndexWithinRect(x, y, width, height);
        blocks[index].building = jasmine.createSpy(['Building on index', index].join());
        random_indexes.push(index);
      }

      expect(random_indexes.length).toBe(width * height);

      random_indexes.sort(function(a, b){ return a < b ? -1 : (a == b ? 0 : 1); });
      var expected = [53, 54, 55, 69, 70, 71, 85, 86, 87, 101, 102, 103, 117, 118, 119, 133, 134, 135];
      for (var j = 0; j < width * height; j++) {
        expect(random_indexes[j]).toBe(expected[j]);
      }
    });
  });


});