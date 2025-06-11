# Vue 3 + Vite Example


## Requirements

* Node v18 or higher

## Project Setup

* Run `npm create vite@latest`
  * Select a project name (eg: `vite-example`)
  * Select a framework (`Vue`)
  * Select a variant (`Javascript`)

* Go to the project folder and install initial packages
  * `cd [project-name]` (eg: `vite-example`)
  * `npm install`

* Customize your initial screen
  * Rename `src/components/HelloWorld` to `src/components/Home` and customize contents.
  * Modify `src/App.vue` 
    * Import `Home` instead of `HelloWorld`
    * Change other component references from `HelloWorld` to `Home`

* Runing the dev server
  * Run `npm run dev` to start the dev server
  * Go to `http://localhost:5173/` to see your web app
  * Try changing something in `src/components/Home` to test HMR (Hot Module Reload). Any changes will be automatically applied to the web version. (Eg: change `<code>components/HelloWorld.vue</code>` to `<code>components/Home.vue</code>`)







This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
