## How to build our project using `Webpack`

1. We created `src`(all our code will be in there), `dist`(build files will be in there) folders.
2. Created `index.html` file inside dist folder. Add a script tag that points to `src/index.js` file. src's folder js file must be labeled "index.js".
3. To run webpack: add a script to scripts property in the package.json file called ==build== or whatever you want ad set the value "webpack" to it.
4. Run the build command.
   After running build command, `dist/main.js` file will be created and all js code(in `src/index.js` and all other js modules imported inside `src/index.js`) will be inside of it and minimized.

As I said before, all our js code will be inside src folder and we have to set the entry file as `index.js`.

If you tried to import modules or importing other npm packages you can do so and webpack will just combine all these code and imports inside `dist/main.js`

For example, install and import loadash package and try to use a function for it, then build the project. If you opened dist/main.js file you will notice that all lodash code is inside main.js file altough we used only one function from lodash. This will cause a performance issue.
The solution will be using `tree-shaking` using webpack. We will configure it using webpack.config.js file later.

##### Until now, we didn't create webpack.config.json file.

---

#### Now let's create `webpack.config.js` file

In this config file, we can determine:

-   **mode**: production or development. If it is dev, no minification will be applied, but in case of production, there will be minification on the output. Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.

-   **entry and output file**: by default, src/index.js is the entry and the output is dist/main.js.
    We can set multiple entru points by seting entry property to an object.
-   **loaders**: Loaders allow Webpack to understand and bundle non-JavaScript files (like CSS, images, and TypeScript) by converting them into modules that the application can import and use.

And a lot more. We will discover some.

## Loaders

Loaders are the magic behind Webpack. They allow us to process different file types in different ways and the outcome will be a single (or multiple) bundled file.

> **Webpack Docs:** Webpack enables use of loaders to preprocess files.This allows you to bundle any static resource way beyond JavaScript.

Once we are developing for the web, one main concern that we usually have is: it should work cross browser. Which means, it should fallback features that are not present in old browsers. A project that does this kind of job is Babel and we can, via loader, use it with Webpack. We can tell Webpack to process Javascript files with Babel, which will do the job of compiling our code.

We need to make sure that `Babel` is communicating with `Webpack` inorder to compile es6 code into an older version so that older browsers can understand the js code.
To use Babel with Webpack we need to setup its loader. From the Babel loader docs we endup with the following Webpack config:

```js
module.exports = {
    entry: "./src/main.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
};
```

As you can see, inside rules, there will be an object for each file type.

Babel provides a loader so that it can communicate with webpack.
**`babel-loader`** to connect the two together.

**To be able to write a jsx code**, we need another babel loader which is `@babel/preset-react`. Updated code:

```js
module.exports = {
    entry: "./src/main.js",
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"], // Add React preset
                    },
                },
            },
        ],
    },
};
```

**How about adding `typescript` to our project?**
First of all, we need to install the following:

```bash
npm install --save-dev typescript ts-loader  @types/react @types/react-dom --save-dev
```

`@types/react` & `@types/react-dom` is for react.

Now add this configuration to `tsconfig.json` file:

```json
{
    "compilerOptions": {
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react",
        "allowJs": true,
        "esModuleInterop": true, // Enables emit interoperability between CommonJS and ES Modules, if not set it will show a can only be default-imported for named exports
        "moduleResolution": "node"
    }
}
```

The new webpack config would be:

```js
const path = require("path");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                // Test for both .js and .jsx files
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"], // Add React preset
                    },
                },
            },
            {
                // Add a rule for TypeScript files
                test: /\.(tsx|ts)?$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
        ],
    },
};
```

The new added segment of code tells Webpack how to process .ts and .tsx files using `ts-loader`.

---

#### Loading images and styles into JS

**CSS**
Install the following dependencies:

```bash
npm i -D sass style-loader css-loader sass-loader
```

Create a .scss file and then import it inside .(tsx|jsx) file.
If we tried to build the project, an error will show up saying that no loaders configured to precess this file.

In order to buildl the project correctly and let the .scss to be imported inside any .js file, you need to add the following config for webpack config:

```js
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
```

**Images**
We can import images ins .js file just like we did with CSS files. We have to use a loader, but we don't have to install it like other loaders. Webpack has a buil-in asset loader. We just need to add it to the configuration:
Add **output.assetModuleFilename: '[name][ext]'** so that it's original name still the same and the **asset/resource**l oader.

```js
output: {
assetModuleFilename: '[name][ext]'
},
module: {
rules: [
    {
        test: /\.(png|jpg|jpeg|svg|gif)/,
        type: "asset/resource",
    }
]
}
```

Now you can import any image inside your js files. But if you are using typescript, an error in typing will show up:
Cannot find module './assets/wallpaper.jpg' or its corresponding type declarations.ts(2307).

**Why does this happen?**
TypeScript doesn't natively understand non-code file imports (like images). To fix this, you need to provide TypeScript with type declarations for these files.

**To solve this issue:**

-   Create a declarations.d.ts file (or any name ending with .d.ts).
-   Inside the declarations.d.ts file, add the following type declaration to handle image imports:
-   Add the declaration file to your tsconfig.json.

declarations.d.ts

```ts
declare module "*.svg";
declare module "*.jpg";
declare module "*.png";
// and other types of images.
```

tsconfig.json

```json
"include": ["src/**/*", "declarations.d.ts"],
"compilerOptions": {...}
```

**Now, TypeScript will understand the image imports and should no longer throw the error.**

---

## Plugins

> Plugins are the backbone of webpack. Webpack itself is built on the same plugin system that you use in your webpack configuration!

They also serve the purpose of doing anything else that a loader cannot do.

A webpack plugin is a JavaScript object that has an `apply` method. This `apply` method is called by the webpack compiler, giving access to the entire compilation lifecycle.

Ex for using plugins:
We are going to use `html-webpack-plugin`:

```bash
npm i html-webpack-plugin
```

Now let's use it: we need to "require" it in webpack config file and use it:

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
```

We need to add plugins property which is an array of plugins.

```js
  plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack App",
            filename: "index.html", // in the src folder.
        }),
    ],
```

This will create a dist folder(previously it was added by default but without index.html file) with the index.html and bundle.js files.

This is not enough because if we tried to edit the index.html and rebuild the project it will be overwritten by the plugin. What should we do?
=> We can create a `template` so that when we build the project, this template will be copied to dist/index.html.
By using template property inside of the plugin object(in our case, it's HtmlWebpackPlugin) and it's title will be "Webpack App".

**Another** plugin is `webpack.ProgressPlugin()` which is used to customize how progress should be reported during compilation.

code:

```js
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack App",
            filename: "index.html",
            template: "src/index.html",
        }),
    ],
```

---

## Caching & Hashing

We need to ensure files produced by webpack compilation can remain cached unless their content has changed. How can we do that?
Browsers caches web assets, if a content of a file changed then the new file won't be displayed to the user as browser will display the old cached version.

**How to solve this?**
By giving the bundle a new name every time it is being built. Will do this using **Hashing**.

We can use the output.filename substitutions setting to define the names of our output files.

Webpack provides a method of templating the filenames using **bracketed strings** called **substitutions**.

The **[contenthash]** substitution will add a unique hash based on the content of an asset. When the asset's content changes, **[contenthash]** will change as well.

Ex:

```js
 output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].[contenthash].js',
    },
```

After you build the project, you will notice that the created js file will be hashed with different value. And the index.html file will automatically point to that newly generated file. Tha'ts because of the template.

---

## Cleaning up Hash files

After we used the `contentHash` substitution, if you tried to rebuild the project, a new bundle file will be created with a different hashname but the old version won't be substituted ot deleted. We want only one bundle file to show up and that's only the newer version. **How to achive that?**
Just add a new property to **output** property called **clean** and set it's value to true.

```js
 output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].[contenthash].js',
        clean: true,
    },
```

Now every time you build the project, the old version will be deleted and a newer version will show up.

---

## Webpack Dev Server

To run webpack dev server, we have to install this package: webpack-dev-server.
Then in package.json file, add a new script:

```bash
"dev": "webpack serve"
```

It will work fine, but we want to add some configuration to the webpack config like hot reloding, port, etc:
We have to tell it what to serve(what html to serve). Here is an example:

```js
    devServer: {
        port: 3000, // customize the port
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        hot: true, // hot reloading
        open: true, // open the page when server starts
        compress: true, // enable gzip compression
    },
```

I noticed that only js files will utilize the hot reloading feature, not html files. Read more later.

---

## Source map

Source maps are good for debugging. Sometimes when an error shows up with a line number that doesn't show you where the actual problem is.

So source maps provide a map from your production code to your source code(where the code is actually being developed) so that you can return to your code and fix any bugs.

**How to set source maps?**
Through a property called **devtools** and set it to either `source-map` or a config object that you can customize the devtools option.

Now after setting this property and building the project, a new file will be generated has this format: **bundle.294c5747112fe4e830fc.js.map**.

Now any error shows up, the line provided in the console will points to the issue in your source code.

So this feature is mainly for debugging and it's really useful.

---

## Typescript

To write the webpack configuration in TypeScript, you would first install the necessary dependencies, i.e., TypeScript and the relevant type definitions from the DefinitelyTyped project:

```bash
npm install --save-dev typescript ts-node @types/node @types/webpack
# and, if using webpack-dev-server < v4.7.0
npm install --save-dev @types/webpack-dev-server
```

You have to import "webpack-dev-server" module in order for appending devServer type in configuration.
Configuration object must be of type `webpack.Configuration`.
