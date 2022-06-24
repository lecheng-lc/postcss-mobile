# PostCSS mobile [![Build Status](https://travis-ci.org/iamvdo/postcss-mobile.svg)](https://travis-ci.org/iamvdo/postcss-mobile)

[PostCSS](https://github.com/postcss/postcss) plugin that convert ios unsupported value (500 and 600) to bold

## Example

```js
postcss([require('postcss-mobile')])
```

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

See [PostCSS](https://github.com/postcss/postcss) docs for examples for your environment.
