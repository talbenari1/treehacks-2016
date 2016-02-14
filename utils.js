'use strict'

// Merges the elements of obj2 into obj1
exports.merge = (obj1, obj2) => {
  for (let item in obj2) {
    if (obj2.hasOwnProperty(item) && !obj1.hasOwnProperty(item)) {
      obj1[item] = obj2[item]
    }
  }
  return obj1
}

exports.isClean = (obj) => {
  for (let item in obj) {
    if (obj.hasOwnProperty(item)) {
      if (obj[item].constructor && obj[item].constructor === 'Object') {
        exports.isClean(obj[item])
      }
      if (!obj[item]) {
        return false
      }
    }
  }
  return true
}
