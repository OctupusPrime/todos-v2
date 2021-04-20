<template>
    <div class="todo-overlayed-task bg-white"
        :style="{width: width + 'px', left: position.left + 'px', top: position.top + 'px'}"
        v-if="isShow">
        <BaseResizeTextArea name="overlayred-task-title" 
                            :maxHeight="100"
                            :enterSubmit="true"
                            placeholder="Init task title"
                            @submitTextArea="initReq"
                            v-model="data.title"/>
        <div class="todo-opts"
            :class="data.prioraty">
            <p class="todo-prioraty bold">{{data.prioraty}}</p>
        </div>
        <TodoDeadline :finishDate="data.deadline" :dateNow="dateNow"/> 
    </div>    
</template>

<script>
let title = '';
export default {
    props: ['data', 'dateNow'],
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
                let reqUrl = '/api/tasks/' + title.replace(' ', '%20');

                this.$axios({                
                    method: 'put',
                    url: reqUrl,
                    headers: {
                    'Authorization': `token ${this.$store.getters['token/getToken']}`
                    },
                    data: {
                        title: this.data.title
                    }
                })
                .then(res => {
                    this.$store.commit('overlay/close');
                })
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

