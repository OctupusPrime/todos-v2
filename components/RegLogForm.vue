<template>
    <div class="reg-log-container bg-white" v-if="isShow">
        <form class="reg-log-form" v-if="isLog" 
            @submit.prevent="logIn">

            <p class="errors" v-if="errors">{{errors}}</p>

            <input type="email" name="email" placeholder="Email" v-model="userEmail" ref="inputEmail">
            <input type="password" name="password" maxlength="15" placeholder="Password" v-model="userPassword">

            <button type="submit">Log In</button>
            <button type="button" @click="demo" class="btn">Demo mode</button>

            <p>Dont have account? <span class="btn" @click="toggleForm">Sign up</span></p>
        </form>
        <form class="reg-log-form" v-else
            @submit.prevent="reg">

            <p class="errors" v-if="errors">{{errors}}</p>

            <input type="email" name="email" placeholder="Email" v-model="userEmail">
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
            isLog: true,

            userEmail: '',
            userPassword: '',
            errors: ''
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
        //demo log
        demo() {
            this.userEmail = 'test@gmail.com';
            this.userPassword = '123qwe';
            this.logIn()
        },
        //Form config
        async logIn() {
            if (!this.userPassword)
                this.errors = 'Input password';
            else if (this.userPassword.length < 5) 
                this.errors = 'Input more then 5 characters';
            else if (!this.userEmail)
                this.errors = 'Input email';
            else {
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
                    this.errors = e.response.data.message;
                }              
            }

        },
        async reg() {
            if (!this.userPassword)
                this.errors = 'Input password';
            else if (this.userPassword.length < 5) 
                this.errors = 'Input more then 5 characters';
            else if (!this.userEmail)
                this.errors = 'Input email';
            else {
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
                    this.errors = e.response.data.message;
                }
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