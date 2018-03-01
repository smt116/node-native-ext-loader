# Node Native Loader

Package for loading native files in Node and Electron applications. The project is inspired by the [node-addon-loader](https://github.com/ushu/node-addon-loader). It works in the similar way but **allows to build path at runtime**.

## Install

Add the package to the development dependencies:

```bash
# using npm:
$ npm install native-ext-loader --save-dev

# using yarn:
$ yarn add --dev native-ext-loader
```

## Usage

Update rules entry in the Webpack configuration file:

```javascript
module: {
  rules: [
    test: /\.node$/,
    loader: 'native-ext-loader'
  ]
}
```

## Options

Options are configurable using `options` hash:

```javascript
module: {
  rules: [
    test: /\.node$/,
    loader: 'native-ext-loader',
    options: {
      rewritePath: path.resolve(__dirname, 'dist')
    }
  ]
}
```

### `rewritePath` (default: `undefined`)

It allows to set an absolute paths to native files.

Note that it needs to remain `undefined` if you are building a package with embedded files. This way, the compiled application will work no matter of its location. This is important when building Electron applications that can be placed in any directory by the end user.
