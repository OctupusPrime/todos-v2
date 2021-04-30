<template>
    <main>
        <section class="main-info flex container">
            <div class="main-text">
                <h1 class="main-title black">
                    Do more<br>Spend less 
                </h1>
                <p class="main-body">
                    Todos helps people manage<br>their time and get more done  
                </p>
                <button class="main-btn btn bg-black" @click="openRegLog">Try Todos for free</button>
            </div>
            <div class="main-img-container">
                <img src="~static/main-img-ilustration.png" alt="simple plant on white desk and white wall" class="main-image pd-left-50">
            </div>
        </section>
        <div class="sub-main-bg bg-black ">
            <section class="sub-main-info flex container">
                <div class="sub-main-img-container">
                    <img src="~static/My_selfie.png" alt="Just my selfie" class="sub-main-image pd-right-50">
                </div>  
                <div class="sub-main-text">
                    <h2 class="sub-main-title">
                        About this app
                    </h2>
                    <p class="sub-main-body">         
                        Hi there this application consists of a rest api with refresh and access tokens and a connection to the mongodb database. Also, the entire client is built according to the example of Trello with its own features and full adaptability.<br><br>Want to see more? Checkout my portfolio.
                    </p>
                    <a href="#" class="sub-main-btn btn bg-rounded-white bold">Portfolio</a>
                </div>
            </section>
        </div>
        <footer class="container flex">
            <h3 class="footer-title bold">By Misha Sokil</h3>
            <p class="footer-body">095-855-31-78</p>
            <p class="footer-body">rasiapypkin2014@gmail.com</p>
        </footer>
    </main>
</template> 

<script>
export default {
    layout: 'noAuth',
    middleware: ['auth'],
    methods: {
        openRegLog() {
            this.$store.commit('overlay/open');
            this.$store.commit('regLog/open');
        }
    }
}
</script>

<style scoped>
    main {
        padding: 0;
    }
/* Typography */
    .bg-black {
        background: #000;
        color: #fff;
    }
    .bg-rounded-white {
        border: 2px solid #fff;
        border-radius: 30px;
        color: #fff;    
    }

    .main-title {
        font-size: 3.125rem;
        padding-bottom: 1.2em;
    }
    .main-body {
        font-size: 1.625rem;
        line-height: 120%;
        padding-bottom: 2.5em;
    }
    .main-btn{
        font-size: 1.5rem;
        border-radius: 10px;
        padding: 1em 1.5em;
    }

    .sub-main-title {
        font-size: 2.5rem;
        padding-bottom: 1em;      
    }
    .sub-main-body {
        font-size: 1.3rem;
        line-height: 150%;
        padding-bottom: 2em;      
    }
    .sub-main-btn  {
        font-size: 1.3rem;
        padding: .7em 1.4em;      
    }

    .footer-title {
        font-size: 1.5rem;
    }
    .footer-body {
        font-size: 1.25rem;
    }
/* Layout */
    .main-info {
        min-height: 100vh;
    }
    .main-image,
    .sub-main-image {
        width: 100%;
        max-width: 500px;   
    }

    .sub-main-bg {
        height: fit-content;
        width: 100%;
        padding: 70px 0;
    }
    .sub-main-text {
        max-width: 600px;
    }
    .pd-right-50 {
        padding-right: 50px;
    }
    .pd-left-50 {
        padding-left: 50px;
    }

    footer {
        padding: 30px 0;
    }
/* Media */
    @media (max-width: 600px) {
        main {
            padding-top: 80px;
        }

        .main-info,
        .sub-main-info,
        footer {
            flex-direction: column;
            text-align: center;
        }

        .main-btn {
            margin-bottom: 1.2em;
        }
        .main-image,
        .sub-main-image {
            padding-bottom: 50px;
        }
        .pd-right-50 {
            padding-right: 0;
        }
        .pd-left-50 {
            padding-left: 0;
        }
    }


</style>