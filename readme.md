# Webpack Shopify CLI Theme
This is a starter Theme using [Webpack 5](https://webpack.js.org/), [Shopify CLI for themes](https://shopify.dev/themes/tools/cli) and [Tailwind CSS](https://tailwindcss.com/). The goal is to create a tool with a component-based folder structure that is easy to build themes with.

## 📁 Folder Structure
This is pre-defined for a component-based file structure compatible with Shopify 2.0 files. All liquid, js, json and scss are in the same folder to keep things in one place.
Example of folder structure:
* components
    * sections
        * header
            - header.js
            - header.liquid
            - header.scss

**Note:** always import component scss files into the component javascript file. For example `import './header.scss';` is inside `header.js`. This ensures the scss will get compiled to css with Webpack and added to the /dist/assets directory.

## Requirements
- [Shopify CLI for themes](https://shopify.dev/themes/tools/cli/getting-started)
- A Shopify Theme with products and collections

## Node Version Manager
This theme setup is built with Yarn, Webpack and Shopify CLI which are dependent on NodeJS versions.
You can use node `v14` to install dependencies and run build commands.
- Install [nvm](http://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html)
- Run `nvm install v14` in terminal
- Install dependencies `yarn install`

Once the install command is used `nvm use` can be used going forward.

## Getting Started
- Install dependencies using [Yarn](https://yarnpkg.com/) `yarn install`.
- Run a build test `yarn build` if there are no errors then you are good to go.
- Next run command `shopify login --store your-store-name.myshopify.com` and login to your store
- Now split your terminals so you are running two separate windows in tandem.
- In terminal A run `yarn webpack` this will start webpack in watch mode and terser will detect any file changes.
- Then in terminal B run `yarn shopify` this will start Shopify CLI and watch for changes in the /dist directory.
- You are now ready to go. Open the local url from Shopify CLI and you will see changes on save hot module reload. **Note** HMR only works in localhost, not on the preview theme domains. Preview themes require a page refresh on file save.

## Github Actions
![image](https://user-images.githubusercontent.com/29803478/171331857-0c685ed1-8f31-4da8-8f3b-91f4e573ffd8.png)

### Theme Check
[shopify/theme-check-action](https://github.com/Shopify/theme-check-action) will run when a pull request is created. This will flag any linting issues and create an annotation in the pull requests files.

### Lighthouse
[shopify/lighthouse-ci-action](https://github.com/Shopify/lighthouse-ci-action) Lighthouse CI will run on pull requests using GitHub Actions. It will then display the lighthouse stats in the Pull Request.

## Whitespace control
In [Liquid](https://shopify.github.io/liquid/basics/whitespace/), include a hyphen in your tag syntax `{{-`, `-}}`, `{%-`, and `-%}` to strip whitespace from the left or right side of a rendered tag.
By including hyphens in your `assign` tag, you can strip the generated whitespace from the rendered template.
If you don’t want any of your tags to print whitespace, as a general rule you can add hyphens to both sides of all your tags (`{%-` and `-%}`):
```liquid
{%- assign username = "Borat Margaret Sagdiyev" -%}
{%- if username and username.size > 10 -%}
  Wow, {{ username }}, I like!
{%- else -%}
  Hello there!
{%- endif -%}
```
### vscode-liquid
A visual studio code extension for the [Liquid](https://shopify.github.io/liquid/) template language. Includes syntax highlighting support for Liquid code used in HTML, JavaScript CSS, SCSS, Markdown and more. Ships with auto formatting code beautification, advanced snippet auto-completion resolution and respects VS Codes native Intellisense, hover and diagnostic features.

<img width="78" alt="image" src="https://user-images.githubusercontent.com/29803478/171333038-96cd867d-05ba-4df0-b091-0a801662b31b.png">

**NOTE** Please check out the extension repo for customizations and understanding how this works: [https://github.com/panoply/vscode-liquid](https://github.com/panoply/vscode-liquid)

## Frameworks
### Tailwind CSS
This project uses [TailwindCSS](https://tailwindcss.com/) `v3` a mobile first utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. Check out the amazing [documentation](https://tailwindcss.com/docs) and start adding classes to your elements.

#### Headwind & Tailwind CSS IntelliSense
Check out [Headwind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind) VSCode extension for TailwindCSS classes. Headwind is an opinionated Tailwind CSS class sorter for Visual Studio Code. It enforces consistent ordering of classes by parsing your code and reprinting class tags to follow a given order.

Optionally you can also install and use [TailwindCSS IntelliSense](https://github.com/tailwindlabs/tailwindcss-intellisense). Tailwind CSS IntelliSense enhances the Tailwind development experience by providing Visual Studio Code users with advanced features such as autocomplete, syntax highlighting, and linting.

#### Heroicons
Checkout [Heroicons](https://heroicons.com/) for all svg or png icons. Find the icon of choice and then create a snippet `snippets/icons/icon-{NAME}.liquid` then render it where needed.

### Alpine
[Alpine](https://alpinejs.dev/) is a rugged, minimal tool for composing behavior directly in your markup. Think of it like jQuery for the modern web. Plop in a script tag and get going.

### SwiperJS
This project uses [SwiperJS](https://swiperjs.com/) for Sliders. You can browse examples and customization properties here: [Demos](https://swiperjs.com/demos)

## References
- This repo is a new version inspired by this previous project: [themekit-webpack](https://github.com/3daddict/themekit-webpack). Shopify 2.0 removed the need for a webpack dev server. This project is the new version using 2.0's features.
- Boilerplate liquid setup was created from Udemy course: [Shopify Theme Development: Online Store 2.0 + TailwindCSS
](https://www.udemy.com/course/shopify-theme-development-tailwindcss) by Bernard Polidario. If you are new to Shopify themes, Shopify 2.0 or Tailwind CSS this is a great course to get started.
