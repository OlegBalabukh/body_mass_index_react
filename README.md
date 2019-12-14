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