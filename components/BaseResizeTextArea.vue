<template>
    <textarea   class="resible-text-area bg-white semi-bold"
                rows="1"
                :name="name"
                :id="name"
                :style="{'min-height': minHeight + 'px','max-height': maxHeight + 'px'}"
                :value="value"

                @input="$emit('input', $event.target.value); resize($event.target);"
                @keydown.enter="blur($event.target)"
                @blur="submitArea($event.target)"
                ref="textArea"/>    
</template>

<script>
export default {
    props: {
        name: {
            required: true,
            type: String
        },
        value: String,
        minHeight: Number,
        maxHeight: Number,
        enterSubmit: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        resize(e) {
            e.style.height = 'auto';
            e.style.height = e.scrollHeight + 'px';
        },
        submitArea(e) {
            this.$emit('submitTextArea')
        },
        blur(e) {
            if (this.enterSubmit)
                e.blur();
        }
    },
    mounted() {
        const elem = this.$refs.textArea;
        this.resize(elem);
        setTimeout(function() {
            this.resize(elem);
        }.bind(this), 10);
    },
    updated() {
        const elem = this.$refs.textArea;
        this.resize(elem); 
    }
}
</script>

<style scoped>
    .resible-text-area {
        overflow: hidden;
        resize: none;
    }
</style>