<template>
    <div class="container">
        <main>
            <TodoDeadline :finishDate="1618760934450" :dateNow="dateNow"/> 
            <TodoDeadline :finishDate="1618750934450" :dateNow="dateNow"/> 
            <TodoDeadline :finishDate="1618760934450" :dateNow="dateNow"/> 
        </main>
    </div>
</template> 

<script>
export default {
    layout: 'noAuth',
    data: () => {
        return {
            dateNow: new Date().getTime()
        }
    },
    mounted() {
        console.log(this.$store.getters['token/getToken']);
         console.log(this.$cookies.get('token'));
    },
    created() {
        var self = this
        setInterval(function () {
            self.dateNow = new Date().getTime();
        }, 60000)
    }
}
</script>

<style scoped>
</style>
