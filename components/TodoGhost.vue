<template>
    <div class="todo-task-ghost bg-white"
        :style="{width: width + 'px', left: position.left + 'px', top: position.top + 'px', transform: 'translate(' + -offSet.left + 'px, '+ -offSet.top + 'px) rotate(5deg)'}"
        v-if="isActive">

        <BaseResizeTextArea name="ghost-todo-title" 
                            :maxHeight="100"
                            v-model="data.title"
                            class="todo-title"
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
let columBoxs;
let firstPos;
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        index: {
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
            width: 0,

            position: {
                left: 0,
                top: 0
            },
            offSet: {
                left: 0,
                top: 0
            },
            isActive: false
        }
    },
    methods: {
        start(val) {
            const {width, left, top, offSet, index} = val;
            columBoxs = document.querySelectorAll('.todo-row');

            this.width = width;

            this.position.left = left;
            this.position.top  = top;

            this.offSet = offSet;
            this.isActive = true;

            firstPos = index;
        },
        drag(e) {
            if (this.isActive) {
                this.position.left = e.clientX;
                this.position.top = e.clientY;

                this.posEngine();
            }
        },
        end() {
            if (this.isActive) {
                this.isActive = false;
                this.$emit('isertTaskToArr');

                if (firstPos.task === this.index.task && firstPos.colum === this.index.colum);
                else    
                    this.$emit('initReq', {status: this.index.colum, index: this.index.task});

                this.index.colum = this.index.task = -1;
            }
        },
        posEngine() {
            if ((this.index.colum + 1) < columBoxs.length) { //right
                let nextColum = columBoxs[this.index.colum + 1].getBoundingClientRect()
                if (this.position.left > nextColum.left) {
                    this.index.colum = this.index.colum + 1;
                }
            }
            if ((this.index.colum - 1) > -1) { //left
                let pastColum = columBoxs[this.index.colum - 1].getBoundingClientRect();
                if (this.position.left < (pastColum.left + pastColum.width + 35)) {
                    this.index.colum = this.index.colum - 1;
                }
            }             
            
            if (document.querySelector("[data-todo-index=" + JSON.stringify(this.index.colum + '' + (this.index.task + 1))  + "]")) {//bottom
                let nextTask = document.querySelector("[data-todo-index=" + JSON.stringify(this.index.colum + '' + (this.index.task + 1))  + "]").getBoundingClientRect();
                if (this.position.top > nextTask.top) {
                    this.index.task = this.index.task + 1;  
                }
            }
            if (document.querySelector("[data-todo-index=" + JSON.stringify(this.index.colum + '' + (this.index.task - 1)) + "]")) { //top
                let pastTask = document.querySelector("[data-todo-index=" + JSON.stringify(this.index.colum + '' + (this.index.task - 1)) + "]").getBoundingClientRect();
                if (this.position.top < pastTask.top + pastTask.height*2/3) {
                    this.index.task = this.index.task - 1;
                }
            }      
        }
    },
    mounted() {
        window.addEventListener('mousemove', function(e) {
            this.drag(e);
        }.bind(this));
        window.addEventListener('mouseup', function() {
            this.end();
        }.bind(this));         
    }
}
</script>

<style scoped>
    @import '~assets/css/todo.css' all;

    .todo-task-ghost {
        cursor: grabbing;
        padding: .375em .75em;
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.1);

        position: absolute;
        z-index: 2;
        user-select: none;
    }

    .todo-title {
        cursor: grabbing;
    }
</style>