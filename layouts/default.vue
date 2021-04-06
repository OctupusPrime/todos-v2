<template>
  <div>
    <Header />
    <div class="container">
       <Nuxt />
    </div>
    <aside class="settings-aside">
      <Settings />
    </aside>
  </div>
</template>

<style scoped> 
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
