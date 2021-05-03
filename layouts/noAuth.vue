<template>
  <div class="app" :class="{'loaded': isLoaded}">
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
export default {
    data: () => {
        return {
            isLoaded: false
        }
    },
    methods: {
        openReg() {
            this.$refs.overlay.open();
            this.$refs.regForm.open();
        }
    },
    mounted() {
        this.isLoaded = true;
    }
}
</script>



<style scoped>
    @import '~assets/css/header.css' all;

    .app {
        background: #fff;
        opacity: 0;
        transition: opacity 2s ease;
    }
    .loaded {
        opacity: 1;
    }
   
    .rounded {
        font-size: 1.125rem;
        border: 2px solid #000;
        border-radius: 15px;
        padding: .4em .8em;
    }
</style>