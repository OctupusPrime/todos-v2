<template>
    <div class="radio-btn">
        <input  v-for="switchVal in switchValue.value" :key="switchVal.value"
                type="radio" class="radio-optn btn bg-white" 
                :name="switchValue.name" 
                :data-title="switchVal.txt" 
                :value="switchVal.value"
                v-model="value">
    </div>
</template>

<script>
export default {
    props: ['switchValue'],  
    data: function () {
        return {
            value: ''
        }
    },
    watch: { 
        'value'(){
            this.$emit('initSwitch', this.value);   
        }
    },   
    mounted: function () {   
        this.value = this.switchValue.checked;
    }
}
</script>

<style scoped>
    .radio-btn {
        display: flex;
        flex-direction: row;
    }

    .radio-optn {
        flex-grow: 1;
        text-align: center;
        -webkit-appearance: none;
        padding: .25em .5em;
        margin: 0;
        border: 1px solid #8d99ae;
        transition: all .15s ease;
    }
    .radio-optn::before {
        content: attr(data-title);
        display: inline-block;
        white-space: nowrap;
        font-weight: 600;
    }
    .radio-optn:focus {
        outline: none;
    }
    .radio-optn:first-child {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .radio-optn:last-child {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
    .radio-optn:checked {
        background-color: #3b86ff;
        color: #fff;
        border-color: #3b86ff;
    }

</style>
