<template>
  <header class="site-header">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
    <div class="header-container">
      <h1 class="logo">AktienRadar</h1>
      <nav class="nav-links">
        <button id="menu-close-button" class="logo-button">
          <i class="fa-solid fa-times"></i>
        </button>
        <router-link to="/" @click="closeMenu">Start</router-link>
        <router-link to="#" @click="closeMenu">Favoriten</router-link>
        <router-link to="/contact" @click="closeMenu">Kontakt</router-link>
        <router-link to="/login" @click="closeMenu">Login</router-link>
      </nav>
      <button id="menu-open-button" class="logo-button">
        ☰✖
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { onMounted } from 'vue';

export default {
  setup() {
    const closeMenu = () => {
      const nav = document.querySelector('nav') as HTMLElement | null;
      if (nav) {
        nav.classList.remove('show-mobile-menu');
      }
    };

    onMounted(() => {
      const menuOpenButton = document.querySelector('#menu-open-button') as HTMLButtonElement | null;
      const menuCloseButton = document.querySelector('#menu-close-button') as HTMLButtonElement | null;
      const nav = document.querySelector('nav') as HTMLElement | null;

      if (menuOpenButton && menuCloseButton && nav) {
        menuOpenButton.addEventListener('click', () => {
          nav.classList.toggle('show-mobile-menu');
        });

        menuCloseButton.addEventListener('click', () => {
          menuOpenButton.click();
        });
      }
    });

    return {
      closeMenu,
    }
  },
};
</script>

<style scoped>
.site-header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
}

.nav-links a {
  color: #374151;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: white;
  background-color: #2563eb;
  border-radius: 1rem;
}

.header-container :where(#menu-close-button, #menu-open-button) {
  display: none;
}

@media screen and (max-width: 900px) {
  nav {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 300px;
    display: none;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
    background: white;
    transition: left 0.2s ease;
    z-index: 1000;
  }

  nav.show-mobile-menu {
    left: 0;
    display: flex;
    transition: left 0.3s ease;
  }

  nav a {
    color: black;
    display: block;
    margin-top: 17px;
    font-size: 25px;
  }

  .header-container :where(#menu-close-button, #menu-open-button) {
    font-size: 25px;
    display: block;
    background: transparent;
    border: none;
  }

  .header-container #menu-close-button {
    position: absolute;
    right: 30px;
    top: 30px;
  }

  .header-container #menu-open-button {
    color: black;
    font-size: 32px;
  }
}
</style>