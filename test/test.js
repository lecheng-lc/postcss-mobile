const fs = require('fs')
const postcss = require('postcss')

const plugin = require('../')

const read = function (path) {
  return fs.readFileSync(path, 'utf-8')
}

test('测试 font-weight转换', () => {
  const input = read('test/fixtures/normal.css')
  const output = read('test/fixtures/normal.out.css')
  expect(postcss(plugin({})).process(input).css).toEqual(output)
})
test('测试border转换', () => {
  const input = read('test/fixtures/border.css')
  const output = read('test/fixtures/border.out.css')
  expect(postcss(plugin({})).process(input).css).toEqual(output)
})
test('测试lineheight转换', () => {
  const input = read('test/fixtures/lineheight.css')
  const output = read('test/fixtures/lineheight.out.css')
  expect(postcss(plugin({})).process(input).css).toEqual(output)
})

test('测试fontsize转换', () => {
  const input = read('test/fixtures/fontsize.css')
  const output = read('test/fixtures/fontsize.out.css')
  expect(postcss(plugin({})).process(input).css).toEqual(output)
})

test('测试fontfamily转换', () => {
  const input = read('test/fixtures/font-family.css')
  const output = read('test/fixtures/font-family.out.css')
  expect(postcss(plugin({})).process(input).css).toEqual(output)
})