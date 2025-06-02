import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token'));
  const email = ref(localStorage.getItem('userEmail'));

  const updateUserData = (newToken: string, newEmail: string) => {
    token.value = newToken;
    email.value = newEmail;
    localStorage.setItem('token', newToken);
    localStorage.setItem('userEmail', newEmail);
  };

  const clearUserData = () => {
    token.value = null;
    email.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  };

  return {
    token,
    email,
    updateUserData,
    clearUserData,
  };
});