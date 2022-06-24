const postcss = require('postcss')
const fontWeight = require('./src/font-weight')
const fontFamily = require('./src/font-family')
const lineHeight = require('./src/line-height')
const fontSize = require('./src/font-size')
const border = require('./src/border')

module.exports = postcss.plugin('postcss-mobile', function (opts = {}) {
  const awesomeClass = (opts.awesomeClass || 'awesome-fw').replace('.', '') // 指定需要转换 font-weight 的 根元素class
  const fontSizeOverflow = opts.fontSizeOverflow || 2 // fontSize 溢出大小，单位px（对应375px设计稿）
  const remRootValue = opts.remRootValue || 16 // rem 基准值
  const baseFontFamily =
    opts.baseFontFamily || `miui, system-ui, -apple-system, Roboto, "Helvetica Neue", Helvetica, sans-serif` // 全局字体
  const minFontSize = opts.hasOwnProperty('minFontSize') ? opts.minFontSize : 12 // 最小字号
  const minBorderWidth = opts.hasOwnProperty('minBorderWidth') ? opts.minBorderWidth : 1 // 最小边框宽度
  return (css) => {
    css.walkDecls((decl) => {
      if (decl.prop === 'font-weight') {
        fontWeight.convert(decl, {
          awesomeClass
        })
      } else if (decl.prop === 'font-family') {
        fontFamily.convert(decl, {
          baseFontFamily
        })
      } else if (decl.prop === 'line-height') {
        lineHeight.convert(decl, {
          fontSizeOverflow,
          remRootValue
        })
      } else if (decl.prop === 'font-size') {
        fontSize.convert(decl, {
          minFontSize,
          remRootValue
        })
      } else if (decl.prop === 'border') {
        border.convert(decl, {
          remRootValue,
          minBorderWidth
        })
      }
    })
  }
})
