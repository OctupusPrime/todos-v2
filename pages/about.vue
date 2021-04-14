<template>
    <div class="container">
        <main>
            <TodoDeadline :finishDate="1618423999999"/>
        </main>
    </div>
</template>

<script>
export default {
    data: ()=> {
        return {
            dateFinish: new Date()
        }
    },
    mounted: function () { 
      this.dateFinish.setMinutes(this.dateFinish.getMinutes() + 2);
    }
}
</script>

<style scoped>
    main {
        padding-top: 125px;
    }
</style>
