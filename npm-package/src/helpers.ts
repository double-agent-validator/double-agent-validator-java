export function findInArray(array: any[], predicate: Function) {
  if (array == null) {
    throw new TypeError('findInArray called on null or undefined');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function');
  }
  let list = Object(array);
  let length = list.length || 0;
  let thisArg = arguments[2];
  let value;

  for (let i = 0; i < length; i++) {
    value = list[i];
    if (predicate.call(thisArg, value, i, list)) {
      return value;
    }
  }
  return undefined;
};
