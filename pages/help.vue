<template>
    <main>
        <h1>.Todos <span class="bold">/help</span></h1>
        <section class="container">
            <article class="help-article" v-for="(item, index) in helpData" :key="item.title" :class="{'img-left': (index + 1) % 2 === 0}"> 
                <div class="article-text">
                    <h2 class="article-title">{{item.title}}</h2>
                    <p class="artice-body">{{item.desc}}</p>
                </div>
                <div class="article-img-cont" :class="{'flex-column': item.imgs.length > 1}">
                    <img :src="require(`~/assets/${img}`)" class="article-img" v-for="img in item.imgs" :key="img">
                </div>

            </article>
        </section>
    </main>
    
</template>

<script>
export default {
    layout: 'clear',
    data: () => {
        return {
            helpData: [
                {
                    title: 'How convert  deadline',
                    desc: 'Its just (days : hours : minutes).',
                    imgs: ['images/deadline-explain.svg']
                },{
                    title: 'How to add task',
                    desc: 'In column new just click "Add" and define params.',
                    imgs: ['gifs/create-todo.gif']            
                },{
                    title: 'How to move task',
                    desc: 'Just grub task to next column or  from context menu.',
                    imgs: ['gifs/move-todo.gif', 'gifs/move-todo-mobile.gif']            
                },{
                    title: 'How to open quick menu',
                    desc: 'Just right click on the task (only on desktop). Also you can change title.',
                    imgs: ['gifs/quickMenu-todo.gif']            
                },{
                    title: 'How to open edit task',
                    desc: 'Click on edit button or from quick menu "open", and then define params.',
                    imgs: ['gifs/reduct-todo.gif']            
                },{
                    title: 'How to open delete task',
                    desc: 'Open task and click delete or from quick menu.',
                    imgs: ['gifs/delete-todo.gif']            
                },{
                    title: 'How to logout',
                    desc: 'Open settings bar and click logout.',
                    imgs: ['gifs/logOut-ac.gif']            
                }
            ]
        }
    }
}
</script>

<style scoped>
    main {
        padding: 70px 0;
    }

/* Typography */
    main h1 {
        padding: .5em 0;
        position: sticky;
        top: 0;
        z-index: 2;
        background: #fff;
        text-align: center;
    }

    .article-title {
        font-size: 2rem;
        margin-bottom: .5em;
    }
    .artice-body {
        font-size: 1.5rem;
        margin: 3em 0;
        font-style: italic;
    }
/* Layout */
    .help-article {
        display: flex;
        justify-content: space-between;
        gap: 25px;
        padding-top: 60px;
    }    
    .img-left .article-text {
        order: 2;
    }
    .article-text {
        width: 75%;
    }
    .flex-column {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 25px;
    }
    .article-img {
        height: 350px;
        border-radius: 5px;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    }

    @media (max-width: 800px) {
        .help-article { 
            align-items: center;
            flex-direction: column;
        } 
        .img-left .article-text {
            order: -1;
        }
    
        .article-text {
            width: 100%;
        }
        .artice-body {
            margin: 1em 0;
        }
        .article-img {
            max-width: fit-content;
            width: 100%;
            height: auto;
        }

    }
</style>