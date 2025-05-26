<template>
    <div class="login-page">
        <div class="login-container">
            <form class="login-form" @submit.prevent="handleLogin">
                <h2 class="login-title">Anmelden</h2>

                <label for="email">E-Mail</label>
                <input type="email" id="email" v-model="email" required placeholder="E-Mail-Adresse" />

                <label for="password">Passwort</label>
                <input type="password" id="password" v-model="password" required placeholder="●●●●●●●●" />

                <button type="submit" class="login-button">Einloggen</button>

                <router-link to="/register" class="register-link">
                    Noch kein Konto? Jetzt registrieren
                </router-link>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

function handleLogin() {
    // Hier könnte später eine Authentifizierung eingebaut werden
    console.log('Login mit:', email.value, password.value);
    alert('Login-Versuch gestartet!');
}
</script>

<style scoped>
    .login-page {
        background-color: #f9fafb;
        height: 92vh;
    }
    .login-container {
        display: flex;
        justify-content: center;
        padding-top: 7rem;
        height: fit-content;
        background-color: #f9fafb;
    }

    .login-form {
        background: white;
        padding: 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        width: 100%;
        max-width: 600px;
        display: flex;
        flex-direction: column;
    }

    .login-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
        text-align: center;
    }

    label {
        font-weight: 500;
        margin-top: 1rem;
        margin-bottom: 0.25rem;
    }

    input {
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 1rem;
        outline: none;
    }

    input:focus {
        border-color: #2563eb;
    }

    .login-button {
        margin-top: 1.5rem;
        padding: 0.75rem;
        background-color: #2563eb;
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .login-button:hover {
        background-color: #1d4ed8;
    }
    .register-link {
        margin-top: 1rem;
        text-align: center;
        color: #2563eb;
        text-decoration: none;
        font-size: 0.95rem;
        display: block;
    }

    .register-link:hover {
        text-decoration: underline;
        background-color: white;
    }
</style>