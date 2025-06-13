<script setup>
import { useCounterStore } from '../stores/counter'
import vueLogo from '../assets/vue.svg'
const counterStore = useCounterStore()
import { temperatureQuery, queryRequest } from '../api/openMeteo';
const currentTemp = temperatureQuery(queryRequest)

defineProps({
  msg: String,
})

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-400">
    <h1 class="text-center">{{ $t('Hello') }} {{ msg }}</h1>

    <p>
      <img :src="vueLogo" class="vueLogo" alt="Vue logo" />
    </p>

    <div class="flex flex-col items-center">
      <button
        type="button"
        @click="counterStore.increment()"
        class="mb-2 rounded-full bg-gray-400 px-6 py-2 text-black transition-shadow hover:shadow-lg"
      >
        Count is {{ counterStore.count }}
      </button>
      <p>
        Edit
        <code class="bg-gray-300 dark:bg-gray-700 p-1 rounded-md">views/Home.vue</code> to test HMR
      </p>
    </div>

    <p class="text-center">
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
        class="hover:underline text-blue-800"
        >create-vue</a
      >, the official Vue + Vite starter
    </p>
    <p class="text-center">
      Learn more about IDE Support for Vue in the
      <a
        href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
        target="_blank"
        class="hover:underline text-blue-800"
        >Vue Docs Scaling up Guide</a
      >.
    </p>

      <button
        type="button"
        @click="$setDarkMode(!$isDarkMode())"
        class="mb-2 rounded-full bg-gray-400 px-6 py-2 text-black transition-shadow hover:shadow-lg"
      >
        Toggle Dark Mode
      </button>
      <p>
        Dark Mode is
        <span>{{ $darkMode.value ? 'ON' : 'OFF' }}</span>
      </p>

      <p>
        <button class="m-1 rounded-full bg-gray-400 px-4 py-1 text-black" @click="$i18n.locale = 'es'" >Spanish Version</button>
        <button class="m-1 rounded-full bg-gray-400 px-4 py-1 text-black" @click="$i18n.locale = 'en'" >English Version</button>
      </p>

      <p class="my-2">
        Current Temperature in Vancouver:
        {{ currentTemp }}
      </p>


  </div>
</template>

<style scoped lang="scss">
.read-the-docs {
  color: #888;
}
.vueLogo {
  height: 4em;
  padding: 1em;
  will-change: filter;
  transition: filter 300ms;
  &:hover {
    filter: drop-shadow(0 0 1em #42b883aa);
  }
}
</style>
