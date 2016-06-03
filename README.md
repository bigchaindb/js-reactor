JS Reactor
==========

Minimalistic boilerplate to power your next React app.

[See what's provided](#whats-included) and [why we bothered](#yet-another-react-boilerplate).


Getting started
---------------

#### Initialize a new repository

Just clone or fork this repo, `rm -rf .git` inside the repo, and `git init` to start your new
project using this boilerplate as a base.

More literally:

```bash
# If you'd like, fork js-reactor and clone your fork locally
$ git clone git@github.com:<forked-by-user>/js-reactor.git your-project

# Or, just straight up clone this repo
$ git clone git@github.com:bigchaindb/js-reactor.git your-project

# And reinitialize the repo
$ cd your-project
$ rm -rf .git && git init
$ git add . && git commit -m "Initial commit"
```

This will clone this repository into `your-project/` and initialize a new git repository for you to
start working in.

#### Start hacking

Open `src/app.js` to start working on the app. A demo server with hot reloading is provided out of
the box, so you can immediately see what you're building.

```bash
$ npm install
$ npm start     # By default runs on localhost:3000

$ vim src/app.js
```

#### Additional setup

Some Good Things~~<sup>TM</sup>~~ you may be interested in doing:

* Replace some of the values in [package.json](./package.json), specifically:
    * `name` - [Your project's name](https://docs.npmjs.com/files/package.json#name)
    * `version` - [Your project's version](https://docs.npmjs.com/files/package.json#version)
    * `description` - [A description of your project](https://docs.npmjs.com/files/package.json#description-1)
    * `homepage` - [Your project's homepage](https://docs.npmjs.com/files/package.json#homepage)
    * `bugs` - [Where people should go for help](https://docs.npmjs.com/files/package.json#bugs)
    * `authors` - [Authors of your project](https://docs.npmjs.com/files/package.json#people-fields-author-contributors)
    * `repository` - [Your project's online repository](https://docs.npmjs.com/files/package.json#repository)
* Replace this README.md with your own project's
* If desired, select your own license (replace LICENSE.md and package.json's `license`)
* Use a more appropriate element to render your app into (see [app.js](src/app.js#L14) and the demo
  [index.html](demo/index.html#L13))
* Add tests (and add npm scripts for testing)
* Look at [extending the initial Webpack features](#optional-addons--tips)


Dependencies
------------

Requires Node 5+. Install [nvm](https://github.com/creationix/nvm) if you haven't already.


What's Included
---------------

* [Babel 6](http://babeljs.io/)
    * [See .babelrc config](./.babelrc)
* [Webpack 2](https://webpack.github.io/)
    * [See webpack.config.js config](./webpack.config.js)
        * JS loader with Babel
        * CSS loader
        * Source maps
        * [Production build settings](#production-settings)
    * [Dev server](https://github.com/webpack/webpack-dev-server)
        * [See server.demo.js config](./server.demo.js)
* [Autoprefixer](https://github.com/postcss/autoprefixer)
    * [See browserlist for initial browser support](./browserlist)
* [ESLint](http://eslint.org/) + [ESLint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
    * [See .eslintrc config](./.eslintrc)
* [React hot reloading](https://github.com/gaearon/babel-plugin-react-transform)

#### Initial App Structure

A small barebones app is provided in `src/app.js`. The initial Webpack config expects this to be the
root of the app and uses it as its [entry point](https://webpack.github.io/docs/configuration.html#entry).

The demo app (`demo/app.js`) just imports the app at `src/app.js`, which, when run, will be
rendered into `demo/index.html` through the `#js-reactor-app` element.

#### Npm Scripts

Pretty basic stuff:

* `npm run start`: Start Webpack dev server with hot reloading
* `npm run build`: Build project into `build/`
* `npm run build:dist`: Build project with production settings into `dist/`
* `npm run lint`: Lint entire project

#### Production Settings

Some standard fare:

* Use `NODE_ENV=PRODUCTION` environment variable for building
* Bundle, uglify, and minimize JS + CSS
* Extract CSS out from JS
* Extract source maps from bundles


Optional Addons / Tips
----------------------

In the interest of Keeping Things Simple~~<sup>TM</sup>~~, the initial [webpack
config](./webpack.config.js) was kept rather barebones. It can only understand Javascript files
(`.js` or `.jsx`) and CSS files (`.css`).

Here are some other nice things you can include, if desired.

#### Build Systems

We've kept it simple with npm scripts, but if you like Gulp / Grunt / etc, feel free to integrate
Webpack with them.

#### Using Environment Variables

Webpack provides the [define plugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin)
to inject free variables into your builds.

Initially, `NODE_ENV` is already defined and passed into your builds, so you can use it by
referencing `process.env.NODE_ENV`. This is a great way to handle logic surrounding debug and
production modes, as Webpack can do dead code elimination during production builds
([see the docs](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin)).

To inject more variables like this, add definitions to the [DEFINITIONS object](./webpack.config.js#L24).

#### Sass / SCSS

Install some of the Sass utilities:

```bash
npm install -D node-sass sass-loader
```

And add [sass-loader](https://github.com/jtangelder/sass-loader) to your Webpack loaders, with the
test `/\.s[ac]ss$/`, using these settings:

```js
{
    loader: 'sass',
    query: {
        precision: '8', // If you use bootstrap, must be >= 8. See https://github.com/twbs/bootstrap-sass#sass-number-precision
        outputStyle: 'expanded',
        sourceMap: true
    },
},
```

Assuming you're not going to use plain CSS anymore, you can edit your `webpack.config.js`'s
`CSS_LOADERS` to look something like:

```js
const CSS_LOADER = combineLoaders([
    {
        loader: 'css',
        // ...
    },
    { loader: 'postcss' },
    {
        loader: 'sass',
        query: {
            precision: '8', // See https://github.com/twbs/bootstrap-sass#sass-number-precision
            outputStyle: 'expanded',
            sourceMap: true
        }
    },
    // ...
]);
```

And now replace the `css` loader specification's test (`test: /\.css$/`), with `test: /\.s[ac]ss$/`.

#### LESS

See [less-loader](https://github.com/webpack/less-loader), with a set up that is likely very similar
to [sass-loader](#sass-less).

#### PostCSS

Install the PostCSS plugins via npm, and add them to the `postcss` array in the [Webpack
config](./webpack.config.js#L115). When in doubt, refer back to the plugin's documentation.

#### CSS Modules

Modify the [css-loader](https://github.com/webpack/css-loader) with something like:

```js
{
    loader: 'css',
    query: {
        modules: true,
        importLoaders: 2, // NOTE: This must be the number of loaders after this (ie. 2 if you have postcss-loader and sass-loader chained after)
        localIdentName: '[path]__[name]__[local]_[hash:base64:5]',
        sourceMap: true
    },
},
```

Assuming you're not going to use CSS without CSS Modules anymore, you can edit your
`webpack.config.js`'s `CSS_LOADERS` to look something like:

```js
const CSS_LOADER = combineLoaders([
    {
        loader: 'css',
        query: {
            modules: true,
            importLoaders: 2, // 2 for the chained postcss-loader and sass-loader
            localIdentName: '[path]__[name]__[local]_[hash:base64:5]',
            sourceMap: true
        },
    },
    { loader: 'postcss' },
    {
        loader: 'sass',
        // ...
    },
    // ...
]);
```

Note the comments above on `importLoaders`: this value should always match the number of loaders
chained after the `css-loader` in order for imported files to be processed by the later loaders.

#### HTML Generation

You can have Webpack generate the HTML file that'll import and render your app with plugins. We've
had success with [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin).

#### Assets

##### SVGs

There are a number of ways to load SVGs, but we've had success with loading them as React components
that we can manipulate.

Install [svg-react-loader](https://github.com/boopathi/react-svg-loader) and
[image-webpack-loader](https://github.com/tcoopman/image-webpack-loader):

```bash
npm install -D react-svg-loader image-webpack-loader
```

Add a SVG loader configuration to your Webpack configuration:

```js
const SVG_LOADER = combineLoaders([
    { loader: 'babel' },
    { loader: 'svg-react' },
    // Can't supply the query using the query object as json formats aren't supported
    { loader: 'image-webpack?{ svgo: { plugins: [{ removeTitle: true }, { cleanupIDs: false }] } }' },
]);
```

And add the SVG loader to your Webpack configuration:

```js
module: {
    loaders: [
        {
            test: /\.svg$/,
            exclude: [PATHS.NODE_MODULES],
            loader: SVG_LOADER
        },
        // ...
    ],
    // ...
}
```

##### Images

Install [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) and
[url-loader](https://github.com/webpack/url-loader):

```bash
npm install -D file-loader url-loader image-webpack-loader
```

Add an image loader configuration to your Webpack configuration:

```js
// Define a PNG loader that will be inlined as a Data Url if it's under 100kb
const PNG_LOADER = combineLoaders([
    {
        loader: 'url',
        query: {
            limit: 100000
            mimetype: 'image/png',
        },
    },
    // Can't supply the query using the query object as json formats aren't supported
    // NOTE: These are super awesome optimization levels, you should dial them down if the build is slow
    { loader: 'image-webpack?{ optimizationLevel: 7, pngquant: { quality: "65-90", speed: 1 } }' },
]);
```

And add the image loader to your Webpack configuration:

```js
module: {
    loaders: [
        {
            test: /\.png$/,
            exclude: [PATHS.NODE_MODULES],
            loader: PNG_LOADER
        },
        // ...
    ],
    // ...
}
```

[See the image-webpack-loader docs](https://github.com/tcoopman/image-webpack-loader#usage)
to see how to define loaders for other formats as well as control their qualities.

#### Bootstrap

Our preferred way of loading Bootstrap is to use [bootstrap-loader](https://github.com/shakacode/bootstrap-loader)
so that bootstrap can be safely loaded into the global scope without more configuration when using
CSS Modules.

Install it, with [bootstrap-sass](https://github.com/twbs/bootstrap-sass):

```bash
npm install -D bootstrap-loader
npm install -S bootstrap-sass
```

Create a `.bootstraprc`:

```yaml
---
bootstrapVersion: 3

# Make sure to load bootstrap through Sass and Autoprefixer
styleLoaders:
    - style
    - css?sourceMap
    - postcss
    - sass?sourceMap&output=expanded&precision=8

styles:
    # Always needs to be included
    mixins: true

    # Any other stylesheets you'd like
```

And add it to your Webpack config and demo server's entry:

```js
// webpack.config.js
const config = {
    entry: [
        PRODUCTION || EXTRACT ? 'bootstrap-loader/extractStyles' : 'bootstrap-loader',
        PATHS.APP,
    ],
    // ...
}

// server.demo.js
config.entry = ['bootstrap-loader', path.resolve(__dirname, 'demo/app')];
```

See the [usage](https://github.com/shakacode/bootstrap-loader#usage) and
[configuration](https://github.com/shakacode/bootstrap-loader#common-options-for-bootstrap-3-and-4)
docs for more information.

#### Developing with npm link

Due to the way `npm link` works, it can cause your bundles to have duplications (for example, if
both your project and the `link`ed library use React, it'll be included twice). Add aliases using
[config.resolve.alias](https://webpack.github.io/docs/configuration.html#resolve-alias) to have all
imports matching the alias to resolve to the path you specify.

This is especially important if you plan to keep the `link`s for publishing, but useful while
developing to make builds faster.


Good to Know
------------

At the moment, we're using the newest Webpack beta (2.0.0-beta6) because [Webpack 2 comes with a
lot of great features](https://gist.github.com/sokra/27b24881210b56bbaff7), especially
tree-shaking. Although it's in beta, we've been using it for a while and have had no stability
issues. Although there are some package warnings, most 1.x plugins and loaders will work seamlessly
with no changes required (*read as: we have yet to encounter any plugin requiring more than just a
version bump on their webpack peer-dependency to support Webpack 2*).

We include our own ESLint config, based off our [Javascript Styleguide](https://github.com/ascribe/javascript),
which is itself based off of the [Airbnb Javascript Styleguide](https://github.com/airbnb/javascript).
If you find you don't like the settings, you can change them through the [.eslintrc config](./.eslintrc).

There are a TON of [plugins](https://webpack.github.io/docs/list-of-plugins.html) and
[loaders](https://webpack.github.io/docs/list-of-loaders.html), so go exploring!


Yet Another React Boilerplate???
--------------------------------

Yep.

But before you go back to your [boilerplate-finder](http://andrewhfarmer.com/starter-project/) and
pick out [the most complicated boilerplate of all time](https://github.com/davezuko/react-redux-starter-kit)
(just joking; you should check it out as a resource for things to include on top / later), think
about all the effort you'll spend either understanding everything in that boilerplate or, perhaps
more anti-climatically, ripping out the features you don't need.

We built this because we like starting small and simple; we like understanding our tools and why we
use them. And also because we make tons of demos.


Acknowledgements
----------------

Special thanks to the BigchainDB/ascribe.io team for their insights and code contributions:

@diminator, @r-marques, @vrde, @ttmc, @rhsimplex, @sbellem, @TimDaub
