<template>
    <ul class="todo-quick-menu bg-white" 
            :style="{left: position.left + 'px', top: position.top + 'px'}"
            v-if="$store.getters['overlay/getOverlayVal'] && isClicked">
        <li class="quick-menu-item btn" v-for="item in data" :key="item.emit"
                :class="item.class"
                @click="initEmit(item.emit)">
            {{item.title}}
        </li>
    </ul>    
</template>

<script>
export default {
    props: ['data'],
    data: () => {
        return {
            isClicked: false,

            position: {
                left: 0,
                top: 0
            },
        }
    },
    methods: {
        open(top, left) {
            this.position.left = left;
            this.position.top  = top;

            this.isClicked = true;
        },
        initEmit(emit) {
            this.$emit(emit);
        }
    },
    updated() {
        if (!this.$store.getters['overlay/getOverlayVal'])
            this.isClicked = false;
    }
}   
</script>

<style scoped>
    .todo-quick-menu {
        padding: .25rem .65rem;
        border-radius: 7px;

        position: absolute;
        z-index: 10;
    }
 /* Typography */

    .red {
        color: #FA3333;
    }

/* Layout */
    .quick-menu-item + .quick-menu-item {
        margin-top: .25em
    }

</style>