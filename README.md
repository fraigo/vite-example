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

## Adding supoort for `scss`

* Import sass as a dev dependency: `npm add -D sass`
* Now you can import `.scss` files
```javascript
import './styles.scss'
```
* Or you can declare `type="sass"` in style sections of components to use scss syntax:
```html
<style lang="scss">
    div {
      color: blue;
      &:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
      }
    }
</style>
```

### Example: Add vue Logo, class and apply hover state:

Import the svg logo in the `<script>` section
```javascript
import vueLogo from '../assets/vue.svg'
```
Include the logo in the html template
```html
  <p>
    <img :src="vueLogo" class="vueLogo" alt="Vue logo" />
  </p>
```
Declare `.vueLogo` class and `:hover` state in the `<style>` section, using `type="sass"`
```html
<style scoped lang="scss">
.vueLogo {
  height: 4em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  &:hover {
    filter: drop-shadow(0 0 1em #42b883aa);
  }
}
</style>
```

## Add Tailwind CSS support

See https://tailwindcss.com/docs/installation/using-postcss 

Install the dev dependencies
```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest @tailwindcss/postcss
```

Create a basic `/tailwind.config.js` file for yourself:
```javascript
export default {
  purge: [],
  darkMode: 'media', // or 'false' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

Create a basic `/postcss.config.js` file:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

Modify `src/style.css` to import tailwindcss styles. Add this line to the start and remove any unused styles. The second line is to force dark mode when the `dark` class is present.
```css
@import 'tailwindcss';
@custom-variant dark (&:where(.dark, .dark *));
```

Modify `src/views/Home.vue` to use Tailwind CSS classes in elements. For example
* `text-center` for centered text
* `flex flex-col items-center justify-center` to center elements horizontally and vertically
* `bg-white dark:bg-gray-900` for light and dark mode background
* `text-gray-900 dark:text-gray-400` for light and dark mode text color
* `hover:underline text-blue-800` for links

## Setup automatic Dark mode

Allow the user or default browser setting to activate dark mode.

* Install plugin `npm install vue-plugin-darkmode`
* Import and use the plugin in `src/main.js`
```javascript
import darkMode from 'vue-plugin-darkmode'

createApp(App)
  .use(darkMode)
  .mount('#app');
```
* Add to your view a button to call `$setDarkMode(boolean)` to enable/disable dark mode:
```html
      <button
        type="button"
        @click="$setDarkMode(!$isDarkMode())"
        class="mb-2 rounded-full bg-gray-400 px-6 py-2 text-black transition-shadow hover:shadow-lg"
      >
        Toggle Dark Mode
      </button>
```

## Setup multi-language support (Internationalization)

* Install vue-i18n `npm install vue-i18n`
* Create a language file `src/lang/index.js`
```javascript
import { createI18n } from 'vue-i18n'
const messages = {
  en: { 
    Hello: 'Hello' 
  },
  es: { 
    Hello: 'Hola' 
  },
}
const i18n = createI18n({ 
    locale: 'en', 
    fallbackLocale: 'en',
    messages })
export default i18n
```
* Import and use the plugin in `src/main.js`
```javascript
import i18n from './lang'

createApp(App)
  .use(i18n)
  .mount('#app');
```
* Add entries in the component that will be automatically translated to the current locale using the `$t(key)` method.
```html
<h1>{{ $t('Hello')}}</h1>
```
* You can set the current language using the exposed `$i18n` object: 
```javascript
$i18n.locale = 'es'`
```
* For pluralization see: https://vue-i18n.intlify.dev/guide/essentials/pluralization.html
* For date/time formatting see: https://vue-i18n.intlify.dev/guide/essentials/datetime.html
* For number formatting: https://vue-i18n.intlify.dev/guide/essentials/number.html







# Official References

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
