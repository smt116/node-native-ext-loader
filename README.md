# Node Native Loader

Module for loading native files in Node and Electron applications. The project is inspired by the (node-addon-loader)[https://github.com/ushu/node-addon-loader]. It works in the similar way but allows to build path in the runtime.

## Install

Add the package to the `package.json` file:

```bash
$ yarn add --dev native-ext-loader
```

## Usage

Update `webpack.config.js` file's rules:

```javascript
module: {
  rules: [
    test: /\.node$/,
    loader: 'native-ext-loader'
  ]
}
```

## Options

It is possible to adjust options:

```javascript
module: {
  rules: [
    test: /\.node$/,
    loader: 'node-native-loader',
    options: {
      name: '[hex].[ext]',
      rewritePath: path.resolve(__dirname, 'dist')
    }
  ]
}
```

### `name`

This option allows to change the file name in the output directory. You can use all placeholders defined in the (loader-utils)[https://github.com/webpack/loader-utils/tree/v1.1.0#interpolatename] package.

### `rewritePath`

This options allows to set an absolute path. Note that it needs to remain `undefined` if you are building a package with embedded files.
