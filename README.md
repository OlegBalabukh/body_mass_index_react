# WEBPACK CONFIGURATION

  ##  Delete create-react-app from project (remove 'react-scripts' from package.json)

  ##  Add dev dependencies 
  ``` bash
  # Install packages:
  # for webpack, last version of html plugin, babel dependencies,
  # plugin for transformation static class properties
  npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin@next @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties

  # Webpack dev server runs on http://localhost:8080
  # Tutorial: https://youtu.be/A4swyDR45SY
  ```

  ## Configure 'webpack.config.js'

  ###  Create 'webpack.config.js' file in root folder
  ``` bash
  touch webpack.config.js
  ```

  ### Skip 'entry' and 'output' properties
  #### Default entry: ./src/index.js
  #### Default output: ./dist/main.js

  ### Add 'cheap-module-source-map' for devtool property
  #### https://webpack.js.org/configuration/devtool/

  ### Add module object with rule for js files

  ### Configure '.babelrc' file

  ### Install decorator plugin, add it to '.babelrc' file.
  #### When using decorators like @withStyles(style) of MaterialUI
   ``` bash
  npm i -D @babel/plugin-proposal-decorators
  ```
  
  ### Add 'start', 'dev', 'build' properties to package.json

  ### Install loaders for css and sass
   ``` bash
  npm i -D css-loader style-loader sass-loader node-sass
  ```
  ### Install file loader and html loader
  ``` bash
  npm i -D html-loader file-loader
  ```

  ### Install bootstrap and dependencies for using it
  ``` bash
  npm i -D jquery popper.js
  ```

  ### Install babel/polyfill to load polyfills for older browsers
  ``` bash
  npm i @babel/polyfill
  ```

  ### Provide code splitting  using Dynamic Imports
  #### https://webpack.js.org/guides/code-splitting/

  ### Install webpack-merge to share the common functionality between webpack config files 
  ``` bash
  npm i -D webpack-merge
  ```