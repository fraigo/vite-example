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

Vue Router is the official client-side routing solution for Vue.

First, organize router views in a specific folder `src/views`

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
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{ path: '/', component: Home }]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
```
  * Import router in `src/main.js`
```javascript
import router from './router'
```
  * Add `use(router)` to the Vue app in `src/main.js`
```javascript
createApp(App)
  .use(router)
  .mount('#app')
```
  * Setup a `RouterView` in your main App container `src/App.vue` to render the view selected from `routes`.
```javascript
<script setup>
  import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
```

You can use `createWebHistory` instead of `createWebHashHistory` to use regular URL paths to improve SEO if needed. However, tHis needs additional server configuration to make it work. See https://router.vuejs.org/guide/essentials/history-mode#Example-Server-Configurations for more details.


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


## Supoort for HTTP(S) requests

* Install Axios library: `npm install axios`
* Import axios in your code and retrieve content:
```javascript
import axios from 'axios'

axios.get('/api/data').then(response => {
  console.log(response.data)
})
```

Request and response example: getting current weather temperature.

* Add this `<script>` section to `src/views/Home.vue`
```html
<script>
export default {
  data() {
    return {
      weatherData: null,
    }
  },
  mounted() {
    console.log('Home.vue mounted')
    axios.get('https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current=temperature_2m&timezone=America%2FLos_Angeles&forecast_days=1')
      .then(response => {
        console.log('Weather data:', response.data);
        this.weatherData = response.data.current.temperature_2m + ' ' + response.data.current_units.temperature_2m;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }
}
</script>
```
* Then use `{{ weatherData }}` in your content.
```html
  <p>Current temperature is {{ weatherData }}</p>
```

More information about Axios in the official page: https://axios-http.com/docs/intro

## Fetching, caching, and syncing server state

Use Vue-Query along with Axios library to automate reactive fetch operations with cache and auto-refresh.

* Install: `npm install vue-query`
* Import and use in Vue App (`src/main.js`)
```javascript
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
const queryClient = new QueryClient()

createApp(App)
    .use(VueQueryPlugin, { queryClient })
    .mount('#app')
```
* Import and call `useQuery()` to create a managed query, and populate a local object.
```javascript
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
const currentItem = ref(null)
const itemId = ref(null)
const itemQuery = useQuery({
    queryKey: ['item', itemId.value],
    queryFn: (context) => axios.get('https//myitems/item/'+itemId.value).then(res => res.data),
    select: (data) => {
        console.log('Result data:', data)
        currentItem.value = data
        return data
    },
})
```
* Now you can:
  * Change `itemId` value to request a different result. Results are hashed by `queryKey`
  * Call to `itemQuery.refetch()` to reresh the result
  * See https://tanstack.com/query/v4/docs/framework/vue/reference/useQuery for more useQuery parameters

## Add VueUse Composition Utilities

VueUse is a pack of useful utilities to load into your Vue project. It includes: State, Elements, Browser, Sensors, Network, Animation, Component, Watch, Reactivity, Array, Time, Utilities. Also useful add-ons like: Electron, Firebase, Head, Integrations, Math, Motion, Router, RxJS, SchemaOrg, Sound.

### Sensors - useInfiniteScroll

Reference: https://vueuse.org/core/useInfiniteScroll/

Example:
* Define the load logic for `data` array and limits
```javascript
import { useInfiniteScroll } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'
const data = ref([])
useInfiniteScroll(
  useTemplateRef('scrollContainer'),
  () => {
    data.value.push(...[1,2,3,4,5,6,7,8,9,10].map(i => i + data.value.length))
  },
  {
    distance: 100, // distance in pixels from the bottom of the scroll container to trigger loading more data
    canLoadMore: () => {
      return data.value.length < 5000
    },
  }
)
```
* Create the scroll container embedding the `data` in a loop
```html
<h3>Infinite Scroll Example</h3>
<div ref="scrollContainer" class="w-32 max-h-32 overflow-y-auto border rounded-lg bg-gray-100 p-2 ">
  <div v-for="item in data">
    {{ item }}
  </div>
</div>
```


### Sensors: useMagicKeys

Reference: https://vueuse.org/core/useMagicKeys/

Example:

* Define keys or combinations to watch
```javascript
import { useMagicKeys } from '@vueuse/core'
const keys = useMagicKeys({ reactive: false })
const shiftCtrlA = keys['Shift+Ctrl+A']
// non reactive, use watches
watch(shiftCtrlA, (v) => {
  if (v)
    console.log('Shift + Ctrl + A have been pressed')
})
```
* Use `{ reactive: true }` to use it directly in your components:
```html
<h3>Magic Keys Example</h3>
<div v-if="keys.down">Down is pressed</div>
<div v-if="keys.up">Up is pressed</div>
```

## Vite Config improvements

YOu can edit `vite.config.js` to configure some options for compiling and building the project.

### Use `@` in imports, as an alias of the root `src` directory 

For example, use `@/views/Home.vue` instead of `../views/Home.vue`

* Add the import of `fileURLToPath` and `URL`:
```javascript
import { fileURLToPath, URL } from 'node:url'
```
* Define a resolve alias entry:
```javascript
export default defineConfig({
  // ...
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
```
* Then you can use `@` instead of a relative path in imports:
```javascript
import Home from '@/views/Home.vue'
```

### Convert base path from absolute to relative

This will allow to build the app to be served in a subfolder. All the content is loaded relative to that folder, instead of a fixed root path (`/`).

* Define the `base` path, use `'./'` or `''`
```javascript
export default defineConfig({
  base: './',
  // ...
})
```


## Other Useful Libraries

`vue3-lottie`

Lottie animation support for Vue 3 [https://app.lottiefiles.com/]

* Install calling `npm install vue-lottie`
* Create and download a Lottie json animation
* Import library and .json object: 
```javascript
import { Vue3Lottie } from 'vue3-lottie'
import myAnimation from '../lotties/animation1.json'
```
* Include the element in your component
```html
<Vue3Lottie :width="200" :height="200" :animationData="myAnimation" />
```

`vuelidate`

Model-based validation library for Vue 3

* Install calling `npm install @vuelidate/core @vuelidate/validators`
* Use Vuelidate, create rules, personalize messages, and validate against rules
```javascript
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { reactive } from 'vue'
import { helpers } from '@vuelidate/validators'
const requiredName = helpers.withMessage('Name cannot be empty', required)
const minLengthName = helpers.withMessage('Name must be at least 2 characters long', minLength(2))
const formData = reactive({ name: '' })
const rules = { name: { requiredName, minLengthName } }
const v$ = useVuelidate(rules, formData)
```
* Validate dynamically while data changes
```html
<div class="flex flex-col items-center" >
  <input v-model="formData.name" type="text" placeholder="Enter your name" />
  <p class="text-red-500" v-if="v$.name.$invalid">
    {{ v$.name.$silentErrors ? v$.name.$silentErrors[0].$message : 'Invalid' }}
  </p>
  <p v-else class="text-green-700">
    Name is Valid
  </p>
</div>
```

`@unhead/vue` 

Manage `<head>` content like title, meta and SEO tags.

* Install using `npm install @unhead/vue`
* Import and use in app `src/main.js`:
```javascript
import { createHead } from '@unhead/vue/client'

createApp(App)
    .use(createHead())
    .mount('#app')
```
* Call to useHead() and/or useSeoMeta() on your vue App (eg: `src/App.vue`)
```javascript
import { useHead, useSeoMeta } from '@unhead/vue'

useHead({
  title: 'Vue 3 + Vite + Libraries Starter',
  meta: [
    { name: 'description', content: 'A starter template for Vue 3 with Vite and commonly used libraries.' },
  ],
})

useSeoMeta({
  title: 'Vue 3 + Vite + Libraries Starter',
  description: 'A starter template for Vue 3 with Vite and commonly used libraries.',
  ogDescription: 'A starter template for Vue 3 with Vite and commonly used libraries.',
  ogTitle: 'Vue 3 + Vite + Libraries Starter',
  ogImage: 'https://example.com/image.png',
})
```
* More info in https://unhead.unjs.io/docs/vue/head/guides/get-started/installation#next-steps


# Official References

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
