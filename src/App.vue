<template>
  <div id="app">
    <TopologyPanel></TopologyPanel>
  </div>
</template>

<script>
import TopologyPanel from './package'

export default {
  name: 'App',
  components: {
    TopologyPanel
  }
}
</script>

<style>
html,body {
  padding: 0;
  margin: 0;
}
#app {
  /* padding: 50px; */
}
</style>
