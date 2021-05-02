<template>
  <div class="app" :class="{'loaded': isLoaded}">
    <header>
        <div class="container flex bg-white desctop shadow">
            <div class="site-logo">
                <img src="~assets/images/logo.svg" alt="Todos logo">
                <p class="subtitle">.Todos</p>
            </div>
            <div class="settings btn" @click="openSet">
                <font-awesome-icon icon="cog" />
            </div>
        </div>
        <div class="container flex bg-white mobile shadow"><!-- Mobile menu -->
            <div class="site-logo">
                <img src="~assets/images/logo.svg" alt="Todos logo">
            </div>
            <div class="settings btn" @click="openSet">
                <font-awesome-icon icon="cog" />
            </div>
        </div>


    </header>

    <div class="overlay-background" :class="{'active': $store.getters['overlay/getOverlayVal'] }" @click="closeOverlay"/>

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
        closeOverlay() {
            this.$store.commit('overlay/close');
        },
        openSet() {
          this.$store.commit('overlay/open');
          this.isSetingsOpen = true;
        },
        closeSet() {
          this.isSetingsOpen = false;
          this.closeOverlay();
        },
        async logout() {
          try {
            await this.$axios.$post('auth/logout');
            this.$cookies.remove('isAuth');
            this.closeOverlay();
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

<style> 
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


  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    z-index: 2;
  }
  .shadow {
    box-shadow: 0px 5px 7px -5px rgba(0, 0, 0, 0.25);
  }

  .desctop,
  .mobile {
    border-radius: 0 0 5px 5px;
  }
  .desctop {
    padding: 1em 2em;
  }
  .mobile {
    padding: .5em 1em;   
  }
/* Typography */

  .subtitle {
    font-size: 1.875rem;
    font-weight: 700;
    margin: 0;
    margin-left: .5em;
  }

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
  .mobile {
    display: none;
  }

  .site-logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .site-logo img {
    width: 65px;
  }

  .mobile .site-logo img{
    width: 45px;    
  }

  .overlay-background {
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
  
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;

    opacity: 0;
    visibility: hidden;

    transition: opacity .3s ease;
  }
  .active {
    opacity: 1;
    visibility: visible;
  }

  .settings-cell, .go-back {
    padding-bottom: 1.5em;
  }

  .go-back {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #3B86FF;
  }

  main {
    padding-top: 125px;
  }

  @media (max-width: 600px) {
    .desctop{
      display: none;
    }

    .mobile {
      display: flex;
    }

    main {
      padding-top: 80px; /* Padding from fixed header */
    }
  }
</style>
