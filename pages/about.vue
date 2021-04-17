<template>
    <div class="container">
        <main>
            <p ref="pClass">Hello</p>
        </main>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
        }
    },
    mounted() { 
        console.log(this.$refs.pClass.getBoundingClientRect());
        console.log(document.body.offsetWidth);
    }
}
</script>

<style scoped>
    main {
        padding-top: 125px;
    }
</style>
