# PostCSS mobile 

## Example

```js
postcss([require('postcss-mobile')])
```
- font-weight
```css
/* Input example */
h4 {
  font-weight: 500;
}
```

```css
/* Output example */
.h4 {
  font-weight: 500;
}
.os-ios h4 {
  font-weight: 700;
}
```

- border
```css
/* Input example */
.h{
  border: 0.5px solid red;
}
/* Output example */
.h{
  border: 0.5px solid transparent;
  position: relative;
}
.h:after{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: left top;
  border: 1px solid red;
}
```
- font-size
```css
/* Input example */
.test{
  font-size: 11px;
  display: flex;
  align-items: center;
}
/* Output example */
.test{
  font-size: 11px;
  display: flex;
  align-items: center;
}
.test{
  font-size: 12px;
  display: flex;
  align-items: center;
  transform: scale(0.917);
  transform-origin: left;
  margin-top: -1px;
  margin-right: -2px;
  margin-bottom: -1px;
}
```
- line-height
```css
/* Input example */
.test{
  font-size: 40px;
  line-height: 40px;
}
/* Output example */
.test{
  font-size: 40px;
  line-height: 42px;
}
```
See [PostCSS](https://github.com/postcss/postcss) docs for examples for your environment.
