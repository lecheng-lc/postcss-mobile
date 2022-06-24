/**
 * 处理行高，当行高和字体大小一样，自动加大行高，避免文字显示不全，主要是处理直接从蓝湖拷贝的样式
 * @param {*} decl
 * @param {*} options.fontSizeOverflow fontSize 溢出大小，单位px（对应750px设计稿）
 * @param {*} options.remRootValue rem 基准值
 * @returns
 */
function convert(decl, options) {
  const lh = decl.value
  const match = lh.match(/([\d|.]+)/)
  if (match) {
    const fontSizeOverflow = options.fontSizeOverflow
    const remRootValue = options.remRootValue
    let lhNum = parseFloat(match[0])
    const lhUnit = lh.replace(lhNum, '').toLowerCase()
    let lhUnit2 = lhUnit
    if (lhUnit === 'rem') {
      lhUnit2 = 'px'
      lhNum *= remRootValue
    }
    const parent = decl.parent
    for (const node of parent.nodes) {
      if (node.type === 'decl' && node.prop === 'font-size') {
        const fs = node.value
        const match = fs.match(/([\d|.]+)/)
        if (match) {
          let fsNum = parseFloat(match[0])
          let fsUnit = fs.replace(fsNum, '').toLowerCase()
          if (fsUnit === 'rem') {
            fsUnit = 'px'
            fsNum *= remRootValue
          }
          if (lh === fs || (lhUnit2 === fsUnit && fsNum >= lhNum)) {
            const newLh = fsNum + fontSizeOverflow
            if (lhUnit === 'px') {
              decl.value = newLh + 'px'
            } else if (lhUnit === 'rem') {
              decl.value = newLh / remRootValue + 'rem'
            }
          }
        }
        break
      }
    }
  }
}

module.exports = {
  convert
}
