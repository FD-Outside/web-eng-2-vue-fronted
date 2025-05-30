import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowUp, faArrowDown, faStar as faStarSolid, faMagnifyingGlass, faBars, faTimes, faMapMarkerAlt, faPhone, faBusinessTime, faBan, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

library.add(faArrowUp, faArrowDown, faStarSolid, faStarRegular, faMagnifyingGlass, faBars, faTimes, faMapMarkerAlt, faPhone, faBusinessTime, faBan, faGlobe);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
