<template>
    <div class="overlay-background" :class="{'active': $store.getters['overlay/getOverlayVal'] }" @click="close"/>
</template>

<script>
export default {
    methods: {
        close() {
            this.$store.commit('overlay/close')
        }
    }
}
</script>

<style scoped>
    .overlay-background {
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);
  
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;

        opacity: 0;
        visibility: hidden;

        transition: opacity .3s ease;
    }
    .active {
        opacity: 1;
        visibility: visible;
    }
</style>