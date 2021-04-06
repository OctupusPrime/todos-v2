<template>
  <div class="app">
    <Header />
    <BaseOverlayBg />
    <div class="container">
       <Nuxt />
    </div>
    <aside class="settings-aside">
      <Settings />
    </aside>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped> 
  .app {
    position: relative;
  }

  .settings-aside {
    width: 500px;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    transform: translate(100%, 0);
  }

  .container {
    height: 100vh;
    overflow-y: hidden;
  }

  @media (max-width: 600px) {
    .container {
      overflow: hidden;
    }
  }
</style>
