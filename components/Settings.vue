<template>
    <section class="bg-white">
        <h2>Settings</h2>
        <div class="settings-cell">
            <h3>Theme mode</h3>
            <div class="cell-body">
                <p>Enable dark theme</p>
            </div>
        </div>
        <div class="settings-cell">
            <h3>Sort mode</h3>
            <div class="cell-body">
                <p>Configures the sorting method for tasks</p>
            </div>
        </div>

        <div class="go-back">
            <font-awesome-icon icon="chevron-left" />
            <p class="btn">Go Back</p>
        </div>
    </section>
</template>

<style scoped>
    section {
        padding: 1.25em 2.25em 0 2.25em;
        box-sizing: border-box;
        border-bottom-left-radius: 5px;
        box-shadow: 0px 5px 7px -5px rgba(0, 0, 0, 0.25);
    }
/* Typography */

    section h2 {
        font-size: 2.25rem;
        margin-bottom: 1em;
    }

    .settings-cell h3,
    .go-back p {
        font-weight: 600;
        font-size: 1.5rem;

    }  

    .settings-cell h3 {
        margin-bottom: .5em;
    }   

    .cell-body p {
        font-size: 1.35rem;
    }

    .go-back p {
        padding-left: .5em;
    }

    .go-back svg {
        font-size: 1.2rem;
    }
/* Layout */

    .settings-cell, .go-back {
        padding-bottom: 1.5em;
    }

    .go-back {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #3B86FF;
    }

</style>