<template>
    <div class="todo-opened-task bg-white" v-if="isShow">
        <h3 class="todo-title">{{data.title}}</h3>

        <div class="todo-opts"
            :class="data.priopaty">
            <p class="todo-prioraty bold">{{data.priopaty}}</p>
        </div>
        <div class="todo-opts blue">
            <p class="todo-deadline semi-bold">{{data.deadline}}</p>
        </div>

        <h4 class="semi-bold">Desctiption </h4>
        <p class="todo-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente hic debitis ullam, voluptatum nostrum aspernatur.</p>
    </div>    
</template>

<script>
export default {
    props: ['data'],
    data: () => {
        return {
            isClicked: false
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
        open() {
            this.isClicked = true;
        },
        close() {
            this.isClicked = false;
        }
    }
}
</script>

<style scoped>
    .todo-opened-task {
        width: 100%;
        max-width: 500px;

        padding: .65em 1.3em;

        position: absolute;
        left: 50%;
        top: 20%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }

/* Typography */
    h4 {
        font-size: 1.125rem;
        margin: .625em 0;
    }

    .todo-body {
        line-height: 1.5em;
        padding: .5em 1em;

        background: #F5F5F5;
    }
</style>