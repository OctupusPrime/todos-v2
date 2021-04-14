<template>
    <div class="radio-btn">
        <input  v-for="switchVal in switchValue.value" :key="switchVal.value"
                type="radio" class="radio-optn btn bg-white" 
                :style="{'--checkbox--color': switchVal.color}"
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
            value: '',
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
    .radio-optn:checked {
        background: rgb(var(--checkbox--color), .25) ;
        color: rgb(var(--checkbox--color));
        border-color: rgb(var(--checkbox--color), .25);
        text-shadow: 0px 0px 5px rgba(var(--checkbox--color), 0.5);
    }

    .radio-btn {
        display: flex;
        flex-direction: row;
    }

    .radio-optn {
        flex-grow: 1;
        text-align: center;
        -webkit-appearance: none;
        padding: .3em .6em;
        margin: 0;
        border: 1px solid #8d99ae;
        transition: all .15s ease;
    }
    .radio-optn::before {
        content: attr(data-title);
        display: inline-block;
        white-space: nowrap;
        font-weight: 600;
        font-size: .875rem;
    }
    .radio-optn:focus {
        outline: none;
    }
    .radio-optn:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .radio-optn:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

</style>
