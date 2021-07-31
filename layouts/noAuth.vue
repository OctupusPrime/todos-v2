<template>
  <div class="app">

    <div class="page-loader" :class="{'hide': isLoaded}">
      <div class="loader">
        <img src="~assets/images/logo.svg" alt="Todos logo">
        <p class="loader-subtitle semi-bold">It may take a while.</p>
      </div>
    </div>

    <header class="bg-white">
        <div class="container flex">
            <div class="site-logo grow-2">
                <img src="~assets/images/logo.svg" alt="Todos logo">
                <p class="subtitle">.Todos</p>
            </div>
            <h2 class="rounded btn" @click="openReg">Sign / Log</h2>
        </div>
    </header>

    <OverlayBg ref="overlay"/>

    <RegLogForm ref="regForm"/>

       <Nuxt />
       
  </div>   
</template>
 
<script>
import { mapMutations } from "vuex";
export default {
    name: 'noAuth',
    data: () => {
      return {
        isLoaded: false
      }
    },
    methods: {
        ...mapMutations('todos', ['notLoaded']),
        openReg() {
            this.$refs.overlay.open();
            this.$refs.regForm.open();
        }
    },
    beforeMount() {
        this.notLoaded();
    },
    mounted() {
        setTimeout(function() {
            this.isLoaded = true;
        }.bind(this), 500)
    }
}
</script>



<style scoped>
    @import '~assets/css/header.css' all;

    .app {
        background: #fff;
        position: relative;
    }
   
    .rounded {
        font-size: 1.125rem;
        border: 2px solid #000;
        border-radius: 15px;
        padding: .4em .8em;
    }
</style>