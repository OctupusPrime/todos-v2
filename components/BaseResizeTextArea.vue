<template>
    <textarea   class="resible-text-area bg-white semi-bold"
                rows="1"
                :name="name"
                :id="name"
                :style="{'min-height': minHeight + 'px','max-height': maxHeight + 'px'}"
                :value="value"

                @input="$emit('input', $event.target.value); resize($event);"
                @keydown.enter="submitArea($event)"
                @blur="submitArea($event)"/>    
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
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px'
        },
        submitArea(e) {
            if (this.enterSubmit) {
                e.target.blur();
                this.$emit('submitTextArea')
            }

        }
    }
}
</script>

<style scoped>
    .resible-text-area {
        overflow: auto;
        resize: none;
    }
</style>