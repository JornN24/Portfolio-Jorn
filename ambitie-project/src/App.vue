<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  min-height: 100vh;
  background-color: white;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
}

router-view {
  flex: 1;
}
</style>
