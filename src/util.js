/**
 * 加
 * @param {*} origin 原始值
 * @param {*} pxOffset px偏移量
 * @param {*} convertRem rem基准值
 */
function add(origin, pxOffset, remRootValue) {
  if (!origin) {
    origin = pxOffset + 'px'
  } else {
    const match = origin.match(/([\d|.]+)/)
    if (match) {
      let num = parseFloat(match[0])
      const unit = origin.replace(num, '').toLowerCase()
      if (unit === 'px') {
        origin = num + pxOffset + 'px'
      } else if (unit === 'rem') {
        num = remRootValue * num
        origin = (num + pxOffset) / remRootValue + 'rem'
      }
    }
  }

  return origin
}

/**
 * 乘
 * @param {*} origin 原始值
 * @param {*} ratio 比例
 */
function multiply(origin, ratio) {
  if (origin) {
    const match = origin.match(/([\d|.]+)/)
    if (match) {
      let num = parseFloat(match[0])
      const unit = origin.replace(num, '').toLowerCase()
      if (unit === 'px') {
        origin = num * ratio + 'px'
      } else if (unit === 'rem') {
        origin = num * ratio + 'rem'
      }
    }
  }

  return origin
}

/**
 * 除
 * @param {*} origin 原始值
 * @param {*} ratio 比例
 */
function divide(origin, ratio) {
  if (origin) {
    const match = origin.match(/([\d|.]+)/)
    if (match) {
      let num = parseFloat(match[0])
      const unit = origin.replace(num, '').toLowerCase()
      if (unit === 'px') {
        origin = num / ratio + 'px'
      } else if (unit === 'rem') {
        origin = num / ratio + 'rem'
      }
    }
  }

  return origin
}

module.exports = {
  add,
  multiply,
  divide
}
