<template>
  <div class="app" :class="{'loaded': isLoaded}">

    <header>
        <div class="container flex bg-white shadow">
            <div class="site-logo">
                <img src="~assets/images/logo.svg" alt="Todos logo">
                <p class="subtitle">.Todos</p>
            </div>
            <div class="settings btn" @click="openSet">
                <font-awesome-icon icon="cog" />
            </div>
        </div>
    </header>

    <OverlayBg ref="overlay"/>

       <Nuxt />

    <aside class="settings-aside bg-white" :class="{'opened': isShow}">
        <h2>Settings</h2>
        <div class="settings-cell">
            <h3>Account</h3>
            <div class="cell-body" @click="logout">
                <p class="red btn">Log out</p>
            </div>
        </div>

        <div class="go-back" @click="closeSet">
            <font-awesome-icon icon="chevron-left" />
            <p class="btn">Go Back</p>
        </div>
    </aside>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data: () => {
      return {
        isSetingsOpen: false,
        isLoaded: false
      }
    },
    computed: {
        isShow() {
            if (this.isSetingsOpen) {
                if (!this.$store.getters['overlay/getOverlayVal']) {
                    this.closeSet();
                    return false;
                }
                return true;
            }
            return false;
        }
    },
    methods: {
      ...mapActions('todos', ['getTodos']),
        openSet() {
          this.$store.commit('overlay/open');
          this.isSetingsOpen = true;
        },
        closeSet() {
          this.isSetingsOpen = false;
          this.$refs.overlay.close();
        },
        async logout() {
          try {
            await this.$axios.$post('auth/logout');
            this.$cookies.remove('isAuth');
            this.$refs.overlay.close();
            this.$router.push('/');
            this.$store.commit('todos/clearTodos');
          } catch (e) {
            console.log(e);
          }
        },
        async refreshToken() {
          try {
            await this.$axios.$post('auth/refresh-token');
            this.getTodos();
            this.$cookies.set('isAuth', true, {
                path: '/',
                maxAge: 604800
            });
          } catch (e) {
            console.log(e);
            this.logout();
          }
      }
    },
    async beforeMount() {
      await this.refreshToken();
      this.isLoaded = true;
      setInterval(function () {
        this.refreshToken();
      }.bind(this), 1700000)//28 Minutes 20 Seconds
    }
}
</script>

<style scoped> 
  @import '~assets/css/header.css' all;

  .app {
    position: relative;
    min-height: 100vh;    
    background: #F5F5F5;
    opacity: 0;
    transition: opacity 2s ease;
  }
  .loaded {
    opacity: 1;
  }

  .settings-aside {
    width: 250px;
    position: fixed;
    right: 0;
    top: 0;
    transform: translate(100%, 0);

    padding: 1.25em 2.25em 0 2.25em;
    border-bottom-left-radius: 5px;
    box-shadow: 0px 5px 7px -5px rgba(0, 0, 0, 0.25);

    transition: transform .3s ease;
    z-index: 10;
  }

  .opened {
    transform: translate(0, 0);
  }

/* Typography */
  .settings {
    font-size: 1.2rem;
  }

  .settings-aside h2 {
    font-size: 2rem;
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

  .red {
    color: #FA3333;  
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
