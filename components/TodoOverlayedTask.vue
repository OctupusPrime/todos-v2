<template>
    <div class="todo-overlayed-task bg-white"
        :style="{width: width + 'px', left: position.left + 'px', top: position.top + 'px'}"
        v-if="isShow">
        <BaseResizeTextArea v-if="!data.isFinished"
                            name="overlayred-task-title" 
                            :maxHeight="100"
                            :enterSubmit="true"
                            placeholder="Init task title"
                            @submitTextArea="initReq"
                            v-model="data.title"
                            ref="taskTitle"/>
        <BaseResizeTextArea v-else
                            name="overlayred-task-title" 
                            :maxHeight="100"
                            v-model="data.title"
                            readonly/>
                            
        <div class="todo-opts-row">
            <div class="todo-opts"
                :class="data.prioraty">
                <p class="todo-prioraty bold">{{data.prioraty}}</p>
            </div>
            <TodoDeadline :finishDate="data.deadline" :dateNow="dateNow" :isFinished="data.isFinished"/> 
            <button class="reduct-icon clear btn"></button>
        </div>
    </div>    
</template>

<script>
let title = '';
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        dateNow: {
            type: Number,
            required: true          
        }
    },
    data: () => {
        return {
            isClicked: false,
            width: 100,

            position: {
                left: 0,
                top: 0
            }
        }
    },
    watch: {
        'isClicked'() {
            title = this.data.title;
        }
    },
    computed: {
        isShow() {
            if (this.isClicked) {
                if (!this.$store.getters['overlay/getOverlayVal']) {
                    this.close();
                    return false;
                }
                if (!this.data.isFinished) {
                    this.$nextTick(() => {
                        this.$refs.taskTitle.$el.focus();
                    })
                }
                return true;
            }
            return false;
        }
    },
    methods: {
        open(width, left, top) {
            this.width = width;

            this.position.left = left;
            this.position.top  = top;

            this.isClicked = true;
        },
        close() {
            this.isClicked = false;
        },
        initReq() {
            if (title != this.data.title) {
                this.$emit('editTask', {title, data: {
                    title: this.data.title.trim()
                }});
                this.$store.commit('overlay/close');
            }
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

