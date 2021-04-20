<template>
    <div class="container">
        <main>
          <h1>Hello world</h1>
        </main>
    </div>
</template> 

<script>
export default {
    layout: 'noAuth',
    middleware: ['auth'],
    mounted() {
        console.log(this.$store.getters['token/getToken']);
    }
}
</script>