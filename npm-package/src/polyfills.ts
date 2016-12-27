
if (!Array.isArray) {
  (<any>Array)['isArray'] = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

if (!Array.prototype['customLookup']) {
  Object.defineProperty(Array.prototype, 'customLookup', {
    value: function(predicate) {
     'use strict';
     if (this == null) {
       throw new TypeError('Array.prototype.find called on null or undefined');
     }
     if (typeof predicate !== 'function') {
       throw new TypeError('predicate must be a function');
     }
     let list = Object(this);
     let length = list.length || 0;
     let thisArg = arguments[1];
     let value;

     for (let i = 0; i < length; i++) {
       value = list[i];
       if (predicate.call(thisArg, value, i, list)) {
         return value;
       }
     }
     return undefined;
    }
  });
}
