<template>
    <header>
        <div class="container flex bg-white desctop">
            <div class="site-logo grow-2">
                <img src="~static/Todos-logo.svg" alt="">
                <p class="subtitle">.Todos</p>
            </div>
            <nav>
                <ul>
                    <li>
                        <nuxt-link exact no-prefetch active-class="current-page" to="/">Home</nuxt-link>
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
</template>

<style scoped>
    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        z-index: 2;
    }

    .container {
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

    @media (max-width: 600px) {
        .desctop{
            display: none;
        }

        .mobile {
            display: flex;
        }
    }
</style>