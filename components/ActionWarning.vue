<template>
    <div class="warning-container bg-white" v-if="isShow">
        <h2 class="warning-title">Action warning</h2>
        <p class="warning-body">Are you sure you want to {{data}}</p>
        <div class="warning-buttons-row">
            <p class="btn" @click="close">Cancel</p>
            <p class="btn bg-blue" @click="submit">Ok</p>    
        </div> 
    </div>    
</template>

<script>
export default {
    props: ['data', 'emit'],
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
        open(emit) {
            this.isClicked = true;
            this.warningEmit = emit;
        },
        close() {
            this.isClicked = false;
            this.$store.commit('overlay/close');
        },
        submit() {
            this.$emit(this.emit);
            this.close();
        }
    }
}
</script>

<style scoped>
    .warning-container {
        width: 95%;
        max-width: 350px;

        padding: .65em 1.3em;

        position: absolute;
        top: 20%;
        left: 50%;

        transform: translate(-50%, 0);
        z-index: 10;
    }

/* Typography */
    .warning-title {
        color: #FA3333;
        margin-bottom: .3em;
    }

    .warning-body {
        margin-bottom: .5em;
    }

    .btn {
        border-radius: 5px;
        background: #000;
        color: #fff;
        padding: .25em .7em;
    }

    .bg-blue {
        background: #3B86FF;
    }

/* Layout */  
    .warning-buttons-row {
        display: flex;
        justify-content: space-between;
    }
</style>