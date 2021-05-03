<template>
    <ul class="todo-quick-menu" 
            :style="{left: position.left + 'px', top: position.top + 'px'}"
            v-if="isShow"
            ref="menu">
        <li class="quick-menu-item btn" @click="initEmit('openTask')">
            <h3 class="quick-menu-item-title normal">Open</h3>
        </li>
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
</template>

<script>
export default {
    props: {
        colum: {
            type: Number,
            required: true
        }
    },
    data: () => {
        return {
            isClicked: false,
            isMoveOpened: false,

            position: {
                left: 0,
                top: 0
            },
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
        },
    },
    methods: {
        open(top, left) {
            this.position.left = left;
            this.position.top  = top;

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

<style>
    .todo-quick-menu {
        padding: .25rem .65rem;

        position: absolute;
        z-index: 10;

        background: #F5F5F5;
    }
 /* Typography */
    .quick-menu-item-title {
        font-size: 1.125rem;
        color: #767676;
    }

    .red {
        color: #FA3333;
    }

    .quick-menu-item-form-title h3 {
        font-size: 1rem;
        white-space: nowrap;
    }

    .quick-menu-item-form-title .icon {
        font-size: .9rem;
        margin-left: 1em;
    }

    .item-form-submit {
        display: inline-block;
        border-radius: 5px;
        background: #3B86FF;
        color: #fff;
        padding: .25em .7em;
    }


/* Layout */    
    .quick-menu-item {
        position: relative;
    }
    .quick-menu-item + .quick-menu-item {
        margin-top: .25em
    }

    .quick-menu-item-form-container {
        padding: .3em .65em;

        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.25);

        position: absolute;
        bottom: 0;
        left: 0;
        transform: translate(0, calc(100% + .25em));
        z-index: 11;
    }

    .quick-menu-item-form-title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: .25em;
    }

    .select-container {
        margin-bottom: .5em;
    }

</style>