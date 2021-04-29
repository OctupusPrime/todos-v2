<template>
  <div class="app">
    <header>
        <div class="container flex desctop">
            <div class="site-logo grow-2">
                <img src="~static/Todos-logo.svg" alt="">
                <p class="subtitle">.Todos</p>
            </div>
            <h2 class="rounded btn" @click="openOverlay">Sign / Log</h2>

        </div>
        <div class="container flex mobile">
            <div class="site-logo">
                <img src="~static/Todos-logo.svg" alt="">
            </div>
            <h2 class="rounded btn" @click="openOverlay">Sign / Log</h2>
        </div>
    </header>

    <div class="overlay-background" :class="{'active': $store.getters['overlay/getOverlayVal'] }" @click="closeOverlay" />

    <RegLog ref="regLogForm"/>

       <Nuxt />

    <!-- <aside class="settings-aside">
      <Settings />
    </aside> -->
  </div>   
</template>
 
<script>
export default {
    methods: {
        openOverlay() {
            this.$store.commit('overlay/open');
            this.$refs.regLogForm.open();
        },
        closeOverlay() {
            this.$store.commit('overlay/close');
        }
    }
}
</script>

<style scoped>
    h2 {
        font-size: 1.125rem;
    }
    .rounded {
        border: 2px solid #000;
        border-radius: 15px;
        padding: .4em .8em;
    }

    .desctop,
    .mobile {
        border-radius: 0;
        box-shadow:none;
    }
</style>