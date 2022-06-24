const { add } = require('./util')

/**
 * 处理字体大小，字号小于一定值，采用 transform 加 margin 的方式转化，解决android不能垂直居中的问题
 * @param {*} decl
 * @param {*} options.remRootValue rem 基准值
 * @param {*} options.minFontSize 最小字号
 * @returns
 */
function convert(decl, options) {
  const minFontSize = options.minFontSize
  const remRootValue = options.remRootValue
  const value = decl.value
  const parent = decl.parent
  const match = value.match(/([\d|.]+)/)
  if (match) {
    let num = parseFloat(match[0])
    const unit = value.replace(num, '').toLowerCase()
    let convertRem = false
    if (unit === 'rem') {
      convertRem = true
      num = remRootValue * num
    }
    if ((convertRem || unit === 'px') && num < minFontSize) {
      let hasDisplay = false
      let hasTransform = false
      let marginTop = ''
      let marginRight = ''
      let marginBottom = ''
      for (const node of parent.nodes) {
        if (node.type === 'decl') {
          const prop = node.prop
          if (prop === 'display') {
            if (node.value !== 'inline') {
              hasDisplay = true
            }
          } else if (prop.indexOf('margin') === 0) {
            if (prop === 'margin') {
              const arr = node.value.split(' ')
              if (arr.length === 1) {
                marginTop = arr[0]
                marginRight = arr[0]
                marginBottom = arr[0]
              } else if (arr.length === 2) {
                marginTop = arr[0]
                marginRight = arr[1]
                marginBottom = arr[0]
              } else if (arr.length >= 3) {
                marginTop = arr[0]
                marginRight = arr[1]
                marginBottom = arr[2]
              }
            } else if (prop === 'margin-top') {
              marginTop = node.value
              node.remove()
            } else if (prop === 'margin-right') {
              marginRight = node.value
              node.remove()
            } else if (prop === 'margin-bottom') {
              marginBottom = node.value
              node.remove()
            }
          } else if (prop.indexOf('transform') === 0) {
            hasTransform = true
            break
          }
        }
      }
      if (!hasTransform) {
        // 当原样式里不包含 transform 再处理
        if (convertRem) {
          decl.value = minFontSize / remRootValue + 'rem'
        } else {
          decl.value = minFontSize + 'px'
        }
        const pxOffset = num - minFontSize
        const scale = parseFloat((num / minFontSize).toFixed(3))
        parent.append(decl.clone({ prop: 'transform', value: `scale(${scale})` }))
        parent.append(decl.clone({ prop: 'transform-origin', value: `left` }))
        parent.append(decl.clone({ prop: 'margin-top', value: add(marginTop, pxOffset, remRootValue) }))
        parent.append(decl.clone({ prop: 'margin-right', value: add(marginRight, pxOffset * 2, remRootValue) }))
        parent.append(decl.clone({ prop: 'margin-bottom', value: add(marginBottom, pxOffset, remRootValue) }))
        if (!hasDisplay) {
          parent.append(decl.clone({ prop: 'display', value: 'inline-block' }))
        }
      }
    }
  }
}

module.exports = {
  convert
}
