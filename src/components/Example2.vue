<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  props: {
    msg: {
        type: String
    }
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style>
button{
  border: 1px solid blue;
}
</style>