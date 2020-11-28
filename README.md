# @vlsergey/react-bootstrap-button-with-spinner

Ready-to-use wrapper for react-bootstrap Button component. Automatically disables button and displays spinner inside until async `onClick` handler is completed.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

# Installation
```
npm i --save @vlsergey/react-bootstrap-button-with-spinner
```
or
```
npm i --save-dev @vlsergey/react-bootstrap-button-with-spinner
```

# Usage
```jsx
// Replace import Button from "react-bootstrap/Button" with
import Button from "@vlsergey/react-bootstrap-button-with-spinner"

<Button onClick={this.handleClick}>Button text</Button>
```

Component is a drop-in replacement for React Bootstrap Button component.

No additional configuration is required.

`onClick` handle *does not* need to be async, i.e. is not required to return Promise. But auto-disable/auto-spinner functionality will work only if handler is async. In other cases it will fallback to original functionality of Button.

# Props
| Property        | Default value | Description |
| --------------- |:-------------:| ----------- |
| `spinner`       | `<Spinner
  animation="border"
  aria-hidden="true"
  as="span"
  role="status"
  size="sm"
  {...spinnerProps} />`      | Allow to replace default spinner with something else |
| `spinnerProps`  | `{}`          | Allow to override default Spinner properties.                |

[npm-image]: https://img.shields.io/npm/v/@vlsergey/react-bootstrap-button-with-spinner.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@vlsergey/react-bootstrap-button-with-spinner
[travis-image]: https://travis-ci.com/vlsergey/react-bootstrap-button-with-spinner.svg?branch=master
[travis-url]: https://travis-ci.com/vlsergey/react-bootstrap-button-with-spinner
[downloads-image]: http://img.shields.io/npm/dm/@vlsergey/react-bootstrap-button-with-spinner.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/@vlsergey/react-bootstrap-button-with-spinner
