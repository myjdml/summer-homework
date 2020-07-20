<template>
  <div id="app">
    这是一个年龄：{{$store.state.age}}<br />
    计算后的年龄：{{$store.getters.myAge}}
    <button @click="syncChange">点击添加</button>
    <button @click="asyncChange">异步添加</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  methods: {
    syncChange () {
      this.$store.commit('syncChange', 10)
    },
    asyncChange() {
      this.$store.dispatch('asyncChange', 5)
    }
  }
}


</script>

<style>

</style>
