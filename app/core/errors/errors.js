/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('Errors', function () {

  var InsufficientResourceAmountError = function (type, storageAmount, requestedAmount) {
    Error.call(this);
    this.type = type;
    this.storageAmount = storageAmount;
    this.requestedAmount = requestedAmount;
    this.message = ['Insufficient resource "', this.type, '"',
      ' needed: ', this.requestedAmount,
      ' in storage: ', this.storageAmount].join('');
  };

  InsufficientResourceAmountError.prototype = Object.create(Error.prototype);
  InsufficientResourceAmountError.prototype.constructor = InsufficientResourceAmountError;


  var NoEmptyMapBlocksError = function () {
    Error.call(this);
    this.message = 'No empty map blocks';
  };

  NoEmptyMapBlocksError.prototype = Object.create(Error.prototype);
  NoEmptyMapBlocksError.prototype.constructor = NoEmptyMapBlocksError;


  return {
    noEmptyMapBlocksError: NoEmptyMapBlocksError,
    insufficientResourceAmountError: InsufficientResourceAmountError
  };
});
