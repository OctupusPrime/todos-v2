<template>
    <div class="reg-log-container bg-white" v-if="isShow">
        <form class="reg-log-form" v-if="isLog" 
            @submit.prevent="logIn">

            <input type="email" name="email" placeholder="Email" autocomplete="off" v-model="userEmail">
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
</template>

<script>
export default {
    data: () => {
        return {
            isClicked: false,
            isLog: true,

            userEmail: 'test@gmail.com',
            userPassword: '123qwe'
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
        open() {
            this.isClicked = true;
            // this.userEmail = this.userPassword = '';
        },
        close() {
            this.isClicked = false;
        },
        toggleForm() {
            this.isLog = !this.isLog;
            // this.userEmail = this.userPassword = '';
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
            } catch (e) {
                this.userEmail = this.userPassword = '';
                console.log(e);
            }
        }
    }
}
</script>

<style scoped>
    .reg-log-container {
        width: 95%;
        max-width: 500px;

        padding: 1.7em 1.5em;

        position: absolute;
        left: 50%;
        top: 15%;
        transform: translate(-50%, 0);
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