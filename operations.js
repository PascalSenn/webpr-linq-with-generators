/**
 * @type {Enumerable<*>}
 */
const operations = {
  select: function* (selector) {
    for (const item of this) {
      yield selector(item);
    }
  },
  toArray: function toArray() {
    return Array.from(this);
  },
  where: function* where(predicate) {
    for (const item of this) {
      if (predicate(item)) {
        yield item;
      }
    }
  },
  orderBy: function* orderBy(selector) {
    for (const item of Array.from(this).sort((a, b) =>
      selector(a) > selector(b) ? 1 : -1
    )) {
      yield item;
    }
  },
  groupBy: function groupBy(selector) {
    const result = {};
    for (const item of this) {
      const key = selector(item);
      if (result[key] === undefined) {
        result[key] = [];
      }
      result[key].push(item);
    }
    return result;
  },
  skip: function* count(amount) {
    let counter = 0;
    for (const item of this) {
      if (counter >= amount) {
        yield item;
      }
      counter++;
    }
  },
  take: function* count(amount) {
    let counter = 0;
    for (const item of this) {
      yield item;
      counter++;
      if (counter >= amount) {
        break;
      }
    }
  },
  count: function count() {
    let counter = 0;
    for (const item of this) {
      counter++;
    }
    return counter;
  },
  any: function any() {
    for (const item of this) {
      return true;
    }
    return false;
  },
  first: function first() {
    for (const item of this) {
      return item;
    }
    return undefined;
  },
  last: function last() {
    let last = undefined;
    for (const item of this) {
      last = item;
    }
    return last;
  },
};

const Generator = Object.getPrototypeOf(function* () {});
Object.assign(Generator.prototype, operations);
Object.assign(Array.prototype, operations);
