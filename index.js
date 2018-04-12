const isFunc = x => typeof x === 'function'
const each = Symbol('each')

class ArrayLikeSet extends Set {
  static from (array) {
    return new ArrayLikeSet(array)
  }

  [each](behavior) {
    let index = 0
    for (const [i, _] of super.entries()) {
      behavior(i, index++)
    }
  }

  map(func) {
    if (!isFunc(func)) throw new TypeError('Expected function')
    const result = new ArrayLikeSet()
    this[each]((val, idx) => result.add(func(val, idx)))
    return result
  }

  filter(func) {
    if (!isFunc(func)) throw new TypeError('Expected function')
    const result = new ArrayLikeSet()
    this[each]((val, idx) => {
      const r = func(val, idx)
      if (r) result.add(val)
    })
    return result
  }
}
