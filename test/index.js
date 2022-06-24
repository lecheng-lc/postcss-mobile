const fs = require('fs')
const postcss = require('postcss')
const read = function (path) {
  return fs.readFileSync(path, 'utf-8')
}
const input = read('./fixtures/normal.css')
const output = read('./fixtures/normal.out.css')
const plugin = require('../')
postcss(plugin({})).process(input).then(res=>{
  console.log(res.css)
})