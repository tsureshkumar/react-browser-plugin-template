# Github to Jira plugin


## Basic Plugin template with React

* uses webpack multiple entry target to build different js files
* uses HtmlWebpack plugin to tempalatize html  with webpack generated javascript
  file names
* uses copy-webpack-plugin to copy any files and use transform method to
  auto-inject some of the dynamic javascript file names
* uses `watch` package inside package.json's run command to watch for any
  changes in src or public folders and build browser plugin directory
