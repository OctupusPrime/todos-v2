<template>
    <div class="todo-overlayed-task bg-white"
        :style="{width: width + 'px', left: position.left + 'px', top: position.top + 'px'}"
        v-if="isShow">
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
    computed: {
        isShow() {
            if (this.isClicked) {
                if (!this.$store.getters['overlay/getOverlayVal']) {
                    this.close();
                    return false;
                }
                return true;
            }
            return false;
        }
    },
    methods: {
        open(query) {

            const {width, left, top} = query;

            this.width = width;

            this.position.left = left;
            this.position.top  = top;

            this.isClicked = true;
        },
        close() {
            this.isClicked = false;
        }
    }
}   
</script>

<style scoped>
    .todo-overlayed-task  {
        padding: .375em .75em;
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.1);

        position: absolute;
        z-index: 10;
        user-select: none;
    }
</style>>

