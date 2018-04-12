const isFunc = x => typeof x === 'function'

export default class ArrayLikeSet extends Set {
  map(func) {
    if (!isFunc(func)) throw new TypeError('Expected function')
    let index = 0
    const result = []
    for (const [i, _] of super.entries()) {
      result.push(func(i, index))
    }
    return result
  }

  filter(func) {
    if (!isFunc(func)) throw new TypeError('Expected function')
    let index = 0
    const result = []
    for (const [i, _] of super.entries()) {
      const r = func(i, index)
      if (r) result.push(i)
    }
    return result
  }
}
