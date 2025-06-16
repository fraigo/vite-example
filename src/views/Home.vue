<script setup>
import { useCounterStore } from '../stores/counter'
import vueLogo from '../assets/vue.svg'
const counterStore = useCounterStore()
import { temperatureQuery, queryRequest } from '../api/openMeteo';
const currentTemp = temperatureQuery(queryRequest)

import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { reactive, watch } from 'vue'
import { helpers } from '@vuelidate/validators'
const requiredName = helpers.withMessage('Name cannot be empty', required)
const minLengthName = helpers.withMessage('Name must be at least 2 characters long', minLength(2))
const formData = reactive({ name: '' })
const rules = { name: { requiredName, minLengthName } }
const v$ = useVuelidate(rules, formData)

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

import { useMagicKeys } from '@vueuse/core'
const keys = useMagicKeys({ reactive: true })
const shiftCtrlV = keys['Shift+Ctrl+V']
// only when is not reactive
watch(shiftCtrlV, (v) => {
  if (v)
    console.log('Shift + Ctrl + V have been pressed')
})


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

      <div class="flex flex-col items-center" >
        <input v-model="formData.name" type="text" placeholder="Enter your name" />
        <p class="text-red-500" v-if="v$.name.$invalid">
          {{ v$.name.$silentErrors ? v$.name.$silentErrors[0].$message : 'Invalid' }}
        </p>
        <p v-else class="text-green-700">
          Name is Valid
        </p>
      </div>

      <h3>Infinite Scroll Example</h3>
      <div ref="scrollContainer" class="w-32 max-h-32 overflow-y-auto border rounded-lg bg-gray-100 p-2 ">
        <div v-for="item in data">
          {{ item }}
        </div>
      </div>

      <h3>Magic Keys Example</h3>
      <div v-if="keys.down">Down is pressed</div>
      <div v-if="keys.up">Up is pressed</div>

      <div class="read-the-docs">
        <p>
          For more information, check out the
          <a href="https://vuejs.org/guide/introduction.html" target="_blank" class="text-blue-800 hover:underline">Vue 3 Documentation</a>.
        </p>
      </div>

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
