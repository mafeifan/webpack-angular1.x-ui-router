/**
 * 一个对localStorage的简单封装，提供set,get和remove方法
 * 简单用法：
 * const _DB = new LocalDB('__demoDB__');
 * _DB.set('name', 'finley');
 * _DB.remove('name');
 *
 * TODO data应该是私有
 * @type {module.LocalDB}
 */

module.exports = class LocalDB {
  constructor(name) {
    this.LS = null
    this.name = name
    this.checkLS()
    this.init(name)
  }

  checkLS() {
    if (window && window.localStorage) {
      this.LS = window.localStorage
    } else {
      console.error('your browser is not support localStorage')
    }
  }

  init(name) {
    if (this.LS) {
      if (this.LS[name]) {
        this.data = JSON.parse(this.LS[name])
      } else {
        this.data = {}
      }
    }
  }

  set(key, data) {
    this.data[key] = data
    if (this.LS) {
      this.LS[this.name] = JSON.stringify(this.data)
    }
  }

  get(key) {
    if (this.data[key]) {
      return this.data[key]
    }
    return null
  }

  remove(key) {
    if (this.data[key]) {
      delete this.data[key]
      if (this.LS) {
        this.LS[this.name] = JSON.stringify(this.data)
      }
    }
  }
}
