<template>
    <div class="container">
        <main>
            <BaseResizeTextArea name="first" 
                                :maxHeight="100"
                                :enterSubmit="true"
                                @submitTextArea="submitTextArea"
                                v-model="msg"/>
            <p>{{msg}}</p>
        </main>

    </div>
</template>

<script>
import BaseResizeTextArea from '../components/BaseResizeTextArea.vue';
export default {
  components: { BaseResizeTextArea },
    data: () => {
        return {
 	        msg: ''
        }
    },
    methods: {
        submitTextArea() {
            console.log(1);
        }
    }
}
</script>

<style scoped>
    main {
        padding-top: 125px;
    }
</style>
