<template>
    <div class="select-container" :class="{'active': isOpen}">
        <div class="selected-option-title btn" @click="open">
            <h2 class="normal">{{currentChoise}}</h2>
            <font-awesome-icon icon="chevron-left" />
        </div>
        <ul class="select-options">
            <li class="options-item btn bg-white" v-for="(item, index) in data" :key="index" @click="changeChoise(item, index)">{{item}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true
        },
        current: {
            type: Number,
            default: 0
        }
    },
    data: () => {
        return {
            currentChoise: '',
            isOpen: false
        }
    },
    methods: {
        open() {
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        },
        changeChoise(selectedData, index) {
            this.currentChoise = selectedData;

            this.$emit('changedChoise', index);
        }
    },
    mounted() {
        let amount = 0;
        document.addEventListener('click', function() {
            if (this.isOpen) 
                amount++;

            if (amount > 1) {
                this.close();
                amount = 0;
            }

        }.bind(this)); 
        // this.maxWidth = document.querySelector('.select-options').offsetWidth + 'px';  
        this.currentChoise = this.data[this.current];
    }
}
</script>

<style scoped>
    .select-container {
        display: inline-block;
        position: relative;
    }
/* Typography */
    .selected-option-title h2,
    .options-item {
        font-size: 1rem;
    }
    .selected-option-title svg {
        font-size: .75rem;
        margin-left: 1em;
        transition: transform .1s ease;
    }

    .options-item {
        padding: .3em .6em;
        white-space: nowrap;
    }

/* Layout */
    .selected-option-title {
        background: #000;
        border-radius: 5px;

        padding: .25em .5em;
        color: #fff;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .select-options {
        margin-top: .5em;
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.1);

        position: absolute;
        left: 0;
        bottom: -.25em;
        transform: translate(0, 100%);
        z-index: 2;

        opacity: 0;
        visibility: hidden;
        transition: opacity .3s ease;
    }

    .options-item:hover{
        background: #EBEBEB;
    }

/* active class */
    .active .select-options{
        opacity: 1;
        visibility: visible;
    }

    .active .selected-option-title svg{
        transform: rotate(-90deg);
    }
</style>
