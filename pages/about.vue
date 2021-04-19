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
//Спросить у Maveldus
export default {
    data: () => {
        return {
            dateNow: new Date().getTime()
        }
    },
    created() {
        var self = this
        setInterval(function () {
            self.dateNow = new Date().getTime();
        }, 60000)
    },
}
</script>

<style scoped>
    main {
        padding-top: 125px;
    }
</style>
