<template>
    <div class="deadline-input-conteiner">  
        <div class="deadline-input-box" v-for="(item, index) in inputVal" :key="index">
            <div class="ipt-add btn"  @click="plus($event, item.max, index)">
                <font-awesome-icon icon="chevron-up"/>
            </div>

            <input type="text"  class="deadline-input" 
                                pattern="^[ 0-9]+$"     
                                placeholder="0"
                                :maxlength="item.max.toString().length" 
                                :name="item.name" 
                                :value="item.model"
                                @keydown="filter($event)" 
                                @blur="validate($event, item.max, index)"
                                @input="handleInput($event.target, index)"
                                autocomplete="off">

            <div class="ipt-add btn" @click="minus($event, index)">
                <font-awesome-icon icon="chevron-down" />
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    props: {
        inputVal: {
            required: true,
            type: Array
        }
    },
    methods: {
        filter(e) {
            if ((e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) && e.keyCode !== 46) 
                e.preventDefault();
        },
        validate(e, max, index) {
            if (e.target.value > max)
                e.target.value = max;

             this.handleInput(e.target, index);
        },

        plus(e, max, index) {
            if (Number(e.currentTarget.nextElementSibling.value) + 1 <= max)
                e.currentTarget.nextElementSibling.value = Number(e.currentTarget.nextElementSibling.value) + 1;

            this.handleInput(e.currentTarget.nextElementSibling, index);
        },
        minus(e, index) {
            if (Number(e.currentTarget.previousElementSibling.value) - 1 >= 0)
                e.currentTarget.previousElementSibling.value = Number(e.currentTarget.previousElementSibling.value) - 1;    

            this.handleInput(e.currentTarget.previousElementSibling, index);
        },
        handleInput(e, index) {
            this.inputVal[index].model = e.value;
        }
    }
}
</script>

<style scoped>
    .deadline-input-conteiner {
        width: fit-content;
        border-radius: 5px;
        display: flex;
        margin: 0 auto;
        background: #cee0ff;
        color: #3B86FF;
        text-shadow: 0px 0px 5px rgba(59, 134, 255, 0.5);
    }

    .deadline-input-box {
        display: flex;
        justify-content: center;
        flex-direction: column;
        position: relative;
    }

    .ipt-add {
        text-align: center;
    }

    .deadline-input {
        width: 3em;
        font-size: 1rem;
        text-align: center;
        text-shadow: 0px 0px 5px rgba(59, 134, 255, 0.5);
    }
    .deadline-input,
    .deadline-input::placeholder {
        color: #3B86FF;
    }
</style>