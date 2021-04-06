<template>
    <div class="todo-task-quick-menu bg-white"
        :style="{width: width + 'px', left: position.left + 'px', top: position.top + 'px'}"
        v-if="$store.getters['overlay/getOverlayVal'] && isClicked">
        <h3 class="todo-title">{{data.title}}</h3>

        <div class="todo-opts"
            :class="data.priopaty">
            <p class="todo-prioraty bold">{{data.priopaty}}</p>
        </div>
        <div class="todo-opts blue">
            <p class="todo-deadline semi-bold">{{data.deadline}}</p>
        </div>
    </div>    
</template>

<script>
export default {
    props: ['data'],
    data: () => {
        return {
            isClicked: false,
            width: 100,

            position: {
                left: 0,
                top: 0
            },
        }
    },
    methods: {
        open(query) {

            const {width, left, top} = query;

            this.width = width;

            this.position.left = left;
            this.position.top  = top;

            this.isClicked = true;
        }
    },
    updated() {
        if (!this.$store.getters['overlay/getOverlayVal'])
            this.isClicked = false;
    }
}   
</script>

<style scoped>
    .todo-task-quick-menu {
        padding: .375em .75em;
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.1);

        position: absolute;
        z-index: 10;
        user-select: none;
    }

/* Typography */

    .todo-title {
        font-size: 1.25rem;
        padding-bottom: .15em;
    }

    .todo-prioraty,
    .todo-deadline {
        font-size: .875rem;
    }

/* Layout */

    .todo-opts{
        display: inline-block;
        margin-right: .625em;
        padding: .3em .6em;
        border-radius: 5px;
    }
    .low {
        background: #deebd9;
        color: #32A000;
        text-shadow: 0px 0px 5px rgba(50, 160, 0, 0.5);
    }
    .medium {
        background: #f8e9d9;
        color: #E6AA68;
        text-shadow: 0px 0px 5px rgba(230, 170, 104, 0.5);
    }
    .high {
        background: #fdcccc;
        color: #FA3333;
        text-shadow: 0px 0px 5px rgba(250, 51, 51, 0.5);
    }
    .blue {
        background: #cee0ff;
        color: #3B86FF;
        text-shadow: 0px 0px 5px rgba(59, 134, 255, 0.5);
    }
</style>>

