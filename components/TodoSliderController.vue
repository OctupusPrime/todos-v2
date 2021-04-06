<template>
    <div class="todo-slider-controller bg-white"></div>
</template>

<style scoped>
    .todo-slider-controller {
        display: none;
        width: calc(100% - 50px);/*15px both sides */
        height: 40px;
        border-radius: 5px;
        box-shadow: 0px 5px 7px -5px rgba(0, 0, 0, 0.25);

        position: fixed;
        left: 50%;
        bottom: 12px;
        transform: translate(-50%, 0);
    }

    @media (max-width: 600px) {
        .todo-slider-controller {
            display: block;
        }
    }
</style>