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

## Adding Vue Router

Organize router views in a special folder `src/views`

* Create `src/views/Home.vue`
```html
<template>
<h1>Home</h1>
</template>
```  
* Or move `src/components/Home.vue` to `src/views`

Setup Vue-router

* Run `npm install vue-router`
* Create `src/router/index.js`
```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{ path: '/', component: Home }]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
```
  * Import router in `src/main.js`
```javascript
import router from './router'
```
  * Add `use(router`)` to the Vue app in `src/main.js`
```javascript
createApp(App)
  .use(router)
  .mount('#app')
```



## Adding Pinia (State management)

Pinia replaces Vuex as the recommended state management library. 

### Installation and setup

* Run `npm install pinia`
* Create a store file in `src/stores/` folder (eg: `src/stores/counter.js`)
```javascript
import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    },
  },
})
```
* Import `createPinia` in `src/main.js`
```javascript
import { createPinia } from 'pinia'
```
* Add pinia to the vue app in `src/main.js`
```javascript
app
  .use(createPinia())
  ...
```

### Using a store in a component

Import and declare the store. 
```javascript
import { useCounterStore } from '../stores/counter'
const counterStore = useCounterStore()
```

You can use the store actions (eg: `counterStore.increment()`) and properties (eg: `counterStore.count`). 

For example, you can use counter example in the `Home` view (from `HelloWorld` default component) to use the store instead of `ref(value)`

Remove `count` constant
```javascript
// const count = ref(0)
```

Replace button @click action (`count++`) and current count display (`{ count }`) with a call to `increment()` action and `count` store property.
```html
<button type="button" @click="counterStore.increment()">count is {{ counterStore.count }}</button>
```

You can also define custom `getters` in the store, to return specific information from the current `state`.


# Official References

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
