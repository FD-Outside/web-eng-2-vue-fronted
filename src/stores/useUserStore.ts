import { setToken } from '@/utils/wretch';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token'))
  const email = ref(localStorage.getItem('userEmail'))

  const userInitials = computed(() => email.value?.slice(0, 2) ?? null)

  const updateUserData = (newToken: string, newEmail: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userEmail', newEmail);
    token.value = newToken
    email.value = newEmail
  };

  const clearUserData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    token.value = null
    email.value = null
  };

  watch(token, (newToken, oldToken) => {
    console.log("Set new token")
    setToken(newToken);
  }, {immediate: true})

  return {
    token,
    email,
    userInitials,
    updateUserData,
    clearUserData,
  };
});