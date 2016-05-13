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


License
-------
The Apache-2.0 license is included here to make it easier for others to apply their own license.

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "{}"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright {yyyy} {name of copyright owner}

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
