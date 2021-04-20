<template>
  <div class="app">
    <header>
        <div class="container flex bg-white desctop">
            <div class="site-logo grow-2">
                <img src="~static/Todos-logo.svg" alt="">
                <p class="subtitle">.Todos</p>
            </div>
            <nav>
                <ul>
                    <li>
                        <nuxt-link active-class="current-page" to="/tasks">Home</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link active-class="current-page" to="/about">About author</nuxt-link>
                    </li>
                </ul>
            </nav>
            <div class="settings btn">
                <font-awesome-icon icon="cog" />
            </div>
        </div>
        <div class="container flex bg-white mobile">
            <div class="nav btn">
                <font-awesome-icon icon="bars" />
            </div>
            <div class="site-logo">
                <img src="~static/Todos-logo.svg" alt="">
            </div>
            <div class="settings btn">
                <font-awesome-icon icon="cog" />
            </div>
        </div>
    </header>

    <div class="overlay-background" :class="{'active': $store.getters['overlay/getOverlayVal'] }" @click="closeOverlay"/>

       <Nuxt />

    <!-- <aside class="settings-aside">
      <Settings />
    </aside> -->
  </div>
</template>

<script>
export default {
    methods: {
        closeOverlay() {
            this.$store.commit('overlay/close')
        }
    }
}
</script>

<style> 
  .app {
    position: relative;
  }

  .settings-aside {
    width: 500px;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    transform: translate(100%, 0);
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    z-index: 2;
  }

  .desctop,
  .mobile {
    border-radius: 0 0 5px 5px;
    box-shadow: 0px 5px 7px -5px rgba(0, 0, 0, 0.25);
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

  nav a {
    font-size: 1.125rem;
    text-transform: uppercase;
    padding-bottom: 3BVpx;
  }

  header svg {
    font-size: 1.2rem;
  }

/* Layout */
  .mobile {
    display: none;
  }

  .site-logo {
    display: flex;
    align-items: center;
  }
  .grow-2 {
    flex-grow: 2;
  }
  .site-logo img {
    width: 65px;
  }

  .mobile .site-logo img{
    width: 45px;    
  }

  nav {
    flex-grow: 11;

    padding-left: .5em;
  }

  nav ul {
    list-style: none;
    padding: 0;

    display: flex;
  }

  nav li {
    padding-right: 2.5em;
  }
  nav li:last-child {
    padding: 0;
  }

  .current-page {
    border-bottom: 2px solid #737373;
  }

  .overlay-background {
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
  
    position: absolute;
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
