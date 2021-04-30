<template>
  <div class="app" :class="{'loaded': isLoaded}">
    <header class="bg-white">
        <div class="container flex desctop">
            <div class="site-logo grow-2">
                <img src="~static/Todos-logo.svg" alt="">
                <p class="subtitle">.Todos</p>
            </div>
            <h2 class="rounded btn" @click="openOverlay">Sign / Log</h2>

        </div>
        <div class="container flex mobile">
            <div class="site-logo">
                <img src="~static/Todos-logo.svg" alt="">
            </div>
            <h2 class="rounded btn" @click="openOverlay">Sign / Log</h2>
        </div>
    </header>

    <div class="overlay-background" :class="{'active': $store.getters['overlay/getOverlayVal'] }" @click="closeOverlay" />

    <div class="reg-log-container bg-white" v-if="isShow">
        <form class="reg-log-form" v-if="isLog" 
            @submit.prevent="logIn">

            <input type="email" name="email" placeholder="Email" autocomplete="off" v-model="userEmail" ref="inputEmail">
            <input type="password" name="password" maxlength="15" placeholder="Password" v-model="userPassword">

            <button type="submit">Log In</button>

            <p>Dont have account? <span class="btn" @click="toggleForm">Sign up</span></p>
        </form>
        <form class="reg-log-form" v-else
            @submit.prevent="reg">
            <input type="email" name="email" placeholder="Email" autocomplete="off" v-model="userEmail">
            <input type="password" name="password" maxlength="15" placeholder="Password" v-model="userPassword">

            <button type="submit">Create account</button>

            <p>Already have account? <span class="btn" @click="toggleForm">Log in</span></p>
        </form>
    </div>

       <Nuxt />
  </div>   
</template>
 
<script>
export default {
    data: () => {
        return {
            isLog: true,

            userEmail: '',
            userPassword: '',
            isLoaded: false
        }
    },
    computed: {
        isShow() {
            if (this.$store.getters['regLog/getRegLog']) {
                if (!this.$store.getters['overlay/getOverlayVal']) {
                    this.close();
                    return false;
                }
                this.$nextTick(() => {
                    this.$refs.inputEmail.focus();
                })
                return true;
            }
            return false;
        }
    },
    methods: {
        openOverlay() {
            this.$store.commit('overlay/open');
            this.open();
        },
        closeOverlay() {
            this.$store.commit('overlay/close');
        },
        open() {
            this.$store.commit('regLog/open');
        },
        close() {
            this.$store.commit('regLog/close');
            this.isLog = true;
            this.userEmail = this.userPassword = '';
        },
        toggleForm() {
            this.isLog = !this.isLog;
            this.userEmail = this.userPassword = '';
        },
        //Form config
        async logIn() {
            try {
                await this.$axios.$post('auth/log', {
                    email: this.userEmail,
                    password: this.userPassword
                });

                this.$cookies.set('isAuth', true, {
                    path: '/',
                    maxAge: 604800
                });

                this.$router.push('/tasks');        
                this.$store.commit('overlay/close');
            } catch (e) {
                this.userEmail = this.userPassword = '';
                console.log(e);
            }
        },
        async reg() {
            try {
                await this.$axios.$post('auth/reg', {
                    email: this.userEmail,
                    password: this.userPassword
                });

                this.$cookies.set('isAuth', true, {
                    path: '/',
                    maxAge: 604800
                });

                this.$router.push('/tasks');   
                this.$store.commit('overlay/close');     
            } catch (e) {
                this.userEmail = this.userPassword = '';
                console.log(e);
            }
        }
    },
    mounted() {
        this.isLoaded = true;
    }
}
</script>



<style scoped>
    .app {
        background: #fff;
        opacity: 0;
        transition: opacity 2s ease;
    }
    .loaded {
        opacity: 1;
    }

    header {
        background: #fff;
    }
    
    header h2 {
        font-size: 1.125rem;
    }
    .rounded {
        border: 2px solid #000;
        border-radius: 15px;
        padding: .4em .8em;
    }

    .reg-log-container {
        width: 95%;
        max-width: 500px;

        padding: 1.7em 1.5em;

        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;

        display: flex;
        justify-content: flex-start;
    }
/* Typography */
    input {
        width: 100%;
        font-size: 1.5rem;
        font-weight: 700;
        padding: .4em .8em;
        border-radius: 5px;
        border: 3px solid #000;
        transition: border .3s ease;
        margin-bottom: 1.2em;
    }
    input:focus {
        border-color: #3B86FF;
    }
    input::placeholder {
        color: #BBBBBB;
    }

    button {
        width: 100%;
        font-size: 1.5rem;
        padding: .7em 0;
        background: #000;
        border-radius: 10px;
        color: #fff;
        margin-bottom: 1.2em;
    }

    p {
        text-align: center;
    }

    span {
        color: #3B86FF;
    }

/* Layout */
    .reg-log-form {
        width: 100%;
    }
</style>