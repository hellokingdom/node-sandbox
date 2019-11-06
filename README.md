# SIS Creator for Online powered by Vue.js

This project creates static files for Online shop in shops. Each project is described by a JSON file which contains all the data required to build a styled SIS for direct upload into scribe.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for Scribe CMS on Morrisons Groceries

This generates a full build of all paths into the dist folder as seperate folders with a single index file in each, the body tags are stripped and CSS injected ready for direct use in Scribe.

```
yarn run scribe-build
```
