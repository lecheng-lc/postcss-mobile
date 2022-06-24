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
