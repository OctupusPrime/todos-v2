<template>
    <div class="container">
        <BaseSelectOptn :data="selectData" 
                        @changedChoise="changedChoise"/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam in, iusto, provident sint magnam alias quas praesentium delectus amet quia necessitatibus, ea veniam quo doloremque.</p>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            selectData: ['New', 'Processed', 'Done']
        }
    },
    methods: {
        changedChoise(val) {
            console.log(val);
        }
    }
}
</script>

<style scoped>
    .container {
        padding-top: 125px;
    }
</style>
