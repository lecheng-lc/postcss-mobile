/**
 * 在选择器前面追加类选择器
 * @param {*} selector
 * @param {*} root
 */
function unshiftClassToSelector(selector, className) {
  const selectorArr = selector.split(',')
  const newSelectorArr = []
  for (const selector of selectorArr) {
    newSelectorArr.push('.' + className + ' ' + selector.trim())
  }
  return newSelectorArr.join(', ')
}

/**
 * 处理字重
 * @param {*} decl
 * @param {*} options.awesomeClass 特殊处理字重的class
 * @returns
 */
function convert(decl, options) {
  if (decl.important) {
    return
  }
  const awesomeClass = options.awesomeClass
  const parent = decl.parent
  let value = decl.value
  // 如果字重是0，根据 font-family 推算
  if (value === 0) {
    for (const node of parent.nodes) {
      if (node.type === 'decl' && node.prop === 'font-family') {
        const value = node.value.toLowerCase()
        if (value.indexOf('bold') > 0) {
          value = 600
        } else if (value.indexOf('medium') > 0) {
          value = 500
        } else {
          value = 400
        }
        decl.value = value
        break
      }
    }
  }
  // 在指定环境下使用 text-stroke 替代 font-weight 解决默认字体不支持 500、600 字重的问题
  let strokeWidth = ''
  if (value == 500) {
    strokeWidth = '0.2Px' // 使用Px避免受px2rem插件的影响
  } else if (value == 600) {
    strokeWidth = '0.4Px'
  } else if (value == 700) {
    strokeWidth = '0.6Px'
  }
  if (strokeWidth) {
    if (parent.type === 'rule') {
      const clonedDecl = decl.clone({ value: '400' })
      const textStrokeDecl = decl.clone({ prop: '-webkit-text-stroke-width', value: strokeWidth })
      const cloneRule = parent.clone()
      cloneRule.selector = unshiftClassToSelector(cloneRule.selector, awesomeClass)
      cloneRule.removeAll()
      cloneRule.append(clonedDecl)
      cloneRule.append(textStrokeDecl)
      cloneRule.raws.before = parent.raws.before || '\n'
      parent.after(cloneRule)
    }
  }
}

module.exports = {
  convert
}
