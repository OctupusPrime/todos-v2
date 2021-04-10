<template>
    <div class="todo-task-ghost bg-white"
        :style="{width: width + 'px', left: position.left + 'px', top: position.top + 'px', transform: 'translate(' + -offSet.left + 'px, '+ -offSet.top + 'px) rotate(5deg)'}"
        v-if="isActive">
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
let columBoxs;
export default {
    props: ['data', 'index'],
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
        start(width, left, top, offSet) {
            columBoxs = document.querySelectorAll('.todo-row');

            this.width = width;

            this.position.left = left;
            this.position.top  = top;

            this.offSet = offSet;
            this.isActive = true;

            this.$nextTick(() => {
                this.$emit('removeTaskFromArr');
            });   
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
                this.index.colum = this.index.task = '-';
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
    .todo-task-ghost {
        cursor: grabbing;
        padding: .375em .75em;
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.1);

        position: absolute;
        z-index: 2;
        user-select: none;
    }
</style>