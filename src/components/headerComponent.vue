<template>
  <header class="site-header">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
    <div class="header-container">
      <h1 class="logo">AktienRadar</h1>
      <nav ref="navRef">
        <button id="menu-close-button" class="logo-button" @click="closeMenu">
          <font-awesome-icon icon="fa-solid fa-times" />
        </button>
        <div class="nav-links">
          <router-link to="/" @click="closeMenu">Start</router-link>
          <router-link to="/favorites" @click="closeMenu">Favoriten</router-link>
          <router-link to="/contact" @click="closeMenu">Kontakt</router-link>
          <div class="user-button-container">
            <button class="user-button" @click="toggleDropdown">
              <template v-if="token && userInitials">
                <div class="user-initials">{{ userInitials }}</div>
              </template>
              <template v-else>
                <i class="fa-solid fa-user"></i>
              </template>
            </button>
            <div v-if="dropdownVisible" class="dropdown">
              <button class="dropdown-item" @click.stop="logout">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" /> Abmelden
              </button>
            </div>
          </div>
        </div>
      </nav>
      <button id="menu-open-button" class="logo-button" @click="openMenu">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';


export default {
  setup() {
    const router = useRouter()
    const userStore = useUserStore();
    const dropdownVisible = ref(false);

    const navRef = ref<HTMLElement | null>(null);

    const closeMenu = () => {
      if (navRef.value) {
        navRef.value.classList.remove('show-mobile-menu');
      }
    };

    const openMenu = () => {
      if (navRef.value) {
        navRef.value.classList.add('show-mobile-menu');
      }
    };

    router.afterEach(() => {
      closeMenu();
    });

    const userInitials = computed(() => {
      if (!userStore.email) return ''
      return userStore.email.slice(0, 2).toUpperCase()
    })

    function toggleDropdown() {
      if (userStore.token) {
        dropdownVisible.value = !dropdownVisible.value
      } else {
        router.push('/login')
      }
    }

    function logout() {
      userStore.clearUserData();
      dropdownVisible.value = false;
      router.push('/login');
    }

    return {
      token: userStore.token,
      userInitials,
      dropdownVisible,
      navRef,
      closeMenu,
      openMenu,
      toggleDropdown,
      logout,
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

.nav-links {
  display: flex;
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

.user-button-container {
  position: relative;
  display: flex;
  align-items: center;
}

.user-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;
}

.user-initials {
  background-color: #4b5563;
  color: white;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.dropdown-item {
  background: none;
  border: none;
  padding: 0.75rem 1rem;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 0.95rem;
  color: #1f2937;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
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

  .nav-links {
    flex-direction: column;
    align-items: center;
  }

  .nav-links a {
    display: block;
    margin: 1rem 0;
    font-size: 1.5rem;
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
    cursor: pointer;
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

  .user-button {
    margin-top: 1rem;
  }
}
</style>