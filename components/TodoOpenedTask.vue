<template>
    <div class="todo-opened-task bg-white" v-if="isShow">
        <div class="main-todo-info">
            <h3 class="todo-title">{{data.title}}</h3>
            <p class="todo-subtittle">In colum {{selectData[colum]}}</p>

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
        <ul class="aside-todo-menu">
            <li class="quick-menu-item btn">
                <h3 class="quick-menu-item-title normal" @click="openForm">Move</h3>

                 <div class="quick-menu-item-form-container bg-white" v-if="isMoveOpened">
                    <div class="quick-menu-item-form-title">
                        <h3 class="normal">Move task</h3>
                        <span class="icon" @click="closeForm">
                            <font-awesome-icon icon="times" />
                        </span>

                    </div>
                    <BaseSelectOptn :data="selectData" 
                                    :current="colum"
                                    @changedChoise="changedChoise"/>
                    <p class="item-form-submit btn" @click="initEmit('moveTask', moveSelectValue)">Move</p>
                </div>

            </li>
            <li class="quick-menu-item btn" @click="initEmit('deleteTask')">
                <h3 class="quick-menu-item-title red normal">Delete</h3>
            </li>
        </ul>
    </div>    
</template>

<script>
export default {
    props: ['data', 'colum'],
    data: () => {
        return {
            isClicked: false,
            isMoveOpened: false,

            selectData: ['New', 'Processed', 'Done'],
            moveSelectValue: 0
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
            this.closeForm();
        },
        initEmit(emit, val) {
            this.$emit(emit, val);
        },
        openForm() {
            this.isMoveOpened = true;
        },
        closeForm() {
            this.isMoveOpened = false; 
        },
        changedChoise(val) {
            this.moveSelectValue = val
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

        display: flex;
        justify-content: flex-start;
    }

/* Typography */
    .todo-title {
        padding-bottom: 0;
    }
    .todo-subtittle {
        font-size: .875rem;
        color: #737373;
        padding-bottom: .75em;
    }

    h4 {
        font-size: 1.125rem;
        margin: .625em 0;
    }

    .todo-body {
        line-height: 1.5em;
        padding: .5em 1em;

        background: #F5F5F5;
    }

    .quick-menu-item-form-container {
        left: auto;
        right: 0;
    }
</style>