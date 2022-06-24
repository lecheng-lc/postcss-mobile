const { multiply } = require('./util')

/**
 * 处理小于 1px 的边框，解决 android 不支持 0.5px 边框的问题
 * @param {*} decl
 * @param {*} options.remRootValue rem 基准值
 * @param {*} options.minBorderWidth 处理的最小边框
 * @returns
 */
function convert(decl, options) {
  const arr = decl.value.split(' ')
  const value = arr[0].toLowerCase()
  const match = value.match(/([\d|.]+)/)
  const minBorderWidth = options.minBorderWidth
  if (match) {
    const borderWidthNum = parseFloat(match[0])
    const borderWidthUnit = value.replace(borderWidthNum, '').toLowerCase()
    if (
      (borderWidthUnit === 'rem' && borderWidthNum < minBorderWidth / options.remRootValue) ||
      (borderWidthUnit === 'px' && borderWidthNum < minBorderWidth)
    ) {
      const parent = decl.parent
      let borderRadiusDecl = null
      let hasPosition = false
      for (const node of parent.nodes) {
        if (node.type === 'decl') {
          if (node.prop === 'border-radius') {
            borderRadiusDecl = node
          } else if (node.prop === 'position') {
            hasPosition = true
          }
        }
      }
      if (!hasPosition) {
        parent.append(decl.clone({ prop: 'position', value: 'relative' }))
      }
      arr[0] = '1px'
      const borderDecl = decl.clone({ value: arr.join(' ') })
      const cloneRule = parent.clone()
      cloneRule.selector += ':after'
      cloneRule.removeAll()
      cloneRule.append(decl.clone({ prop: 'content', value: '""' }))
      cloneRule.append(decl.clone({ prop: 'position', value: 'absolute' }))
      cloneRule.append(decl.clone({ prop: 'top', value: '0' }))
      cloneRule.append(decl.clone({ prop: 'left', value: '0' }))
      cloneRule.append(decl.clone({ prop: 'width', value: '200%' }))
      cloneRule.append(decl.clone({ prop: 'height', value: '200%' }))
      cloneRule.append(decl.clone({ prop: 'transform', value: 'scale(0.5)' }))
      cloneRule.append(decl.clone({ prop: 'transform-origin', value: 'left top' }))
      cloneRule.append(borderDecl)
      if (borderRadiusDecl) {
        cloneRule.append(borderRadiusDecl.clone({ value: multiply(borderRadiusDecl.value, 2) }))
      }
      cloneRule.raws.before = parent.raws.before || '\n'
      decl.value = value + ' solid transparent'
      parent.after(cloneRule)
    }
  }
}

module.exports = {
  convert
}
