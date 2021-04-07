<template>
    <ul class="todo-quick-menu bg-white" 
            :style="{left: position.left + 'px', top: position.top + 'px'}"
            v-if="isShow">
        <li class="quick-menu-item btn" @click="initEmit('openTask')">
            <h3 class="quick-menu-item-title normal">Open</h3>
        </li>
        <li class="quick-menu-item btn" @click="openForm">
            <h3 class="quick-menu-item-title normal">Move</h3>
            <div class="quick-menu-item-form-container" v-show="isMoveOpened">
                <form @submit.prevent="initEmit('moveTask')" class="quick-menu-item-form">
                    <label for="move" class="semi-bold">Move task</label>
                    <select name="move">
                        <option value="0">New</option>
                        <option value="1">Processed</option>
                        <option value="2">Done</option>
                    </select>

                    <input type="submit" value="Move">
                </form>
            </div>


        </li>
        <li class="quick-menu-item btn" @click="initEmit('editTask')">
            <h3 class="quick-menu-item-title normal">Edit</h3>
        </li>
        <li class="quick-menu-item red btn" @click="initEmit('deleteTask')">
            <h3 class="quick-menu-item-title normal">Delete</h3>
        </li>
    </ul>    
</template>

<script>
export default {
    props: ['data'],
    data: () => {
        return {
            isClicked: false,
            isMoveOpened: false,

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
        open(top, left) {
            this.position.left = left;
            this.position.top  = top;

            this.isClicked = true;
        },
        close() {
            this.isClicked = false;
        },
        initEmit(emit) {
            this.$emit(emit);
        },
        openForm() {
            this.isMoveOpened = true;
        }
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
    .quick-menu-item-title {
        font-size: 1rem;
    }

    .red {
        color: #FA3333;
    }

/* Layout */    
    .quick-menu-item {
        position: relative;
    }
    .quick-menu-item + .quick-menu-item {
        margin-top: .25em
    }

    .quick-menu-item-form-container {
        background: #EBEBEB;
        padding: .65rem;
        border-radius: 7px;

        position: absolute;
        bottom: 0;
        left: 0;
        transform: translate(0, calc(100% + .25em));
        z-index: 11;
    }

</style>