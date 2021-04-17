<template>
    <div class="container">
        <main>
            <!-- <BaseNumberInput :inputVal="numberInputVal"/> -->
            <!-- <TodoDeadline :finishDate="1618423999999"/> -->
            <BaseRadioBtn :switchValue="radioPrioratyValue" v-model="radioPrioratyValue.model"/>
            <p>{{radioPrioratyValue.model}}</p>
        </main>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            // numberInputVal: [{
            //     name: 'deadline-days',
            //     model: '',
            //     max: 999
            // },{
            //     name: 'deadline-hours',
            //     model: '',
            //     max: 24               
            // },{
            //     name: 'deadline-minutes',
            //     model: '',
            //     max: 60
            // }],
            // dateFinish: new Date(),
            radioPrioratyValue: {
                model: 'low',
                value: [
                    {txt: 'low' , value: 'low', color: '50,160,0'},
                    {txt: 'medium' , value: 'medium', color: '230,170,104'},
                    {txt: 'high' , value: 'high', color: '250,51,51'},
                ],
                name: 'prioraty'
            }
        }
    },
    mounted: function () { 
    //   this.dateFinish.setMinutes(this.dateFinish.getMinutes() + 2);
    }
}
</script>

<style scoped>
    main {
        padding-top: 125px;
    }
</style>
