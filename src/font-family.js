/**
 * 处理字体样式，调整从蓝湖或 mastergo 上拷贝的字体样式，避免和全局样式冲突
 * @param {*} decl
 * @param {*} options.baseFontFamily 基础字体样式
 * @returns
 */
function convert(decl, options) {
  const ff = decl.value.replace(/'|"/gi, '').replace(', ', ',')
  const normalFf = `PingFangSC-Regular`
  const systemFf = 'system-ui'
  if (ff.indexOf(normalFf) >= 0) {
    decl.remove()
  } else if (ff.indexOf(systemFf) < 0) {
    const parent = decl.parent
    if (parent.type === 'rule') {
      // 如果是自定义字体，在后面追加全局字体样式，避免系统不支持自定义字体时显示异常
      const clonedDecl = decl.clone({
        value: ff.replace('PingFang SC', ` "PingFang SC"`) + ', ' + options.baseFontFamily
      })
      const cloneRule = parent.clone()
      cloneRule.removeAll()
      cloneRule.append(clonedDecl)
      cloneRule.raws.before = parent.raws.before || '\n'
      parent.after(cloneRule)
      decl.remove()
    }
  }
}

module.exports = {
  convert
}
