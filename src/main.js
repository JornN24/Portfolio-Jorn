import { createApp } from 'vue';
import App from './App.vue';
import router from './Router/index.js';
import './components/main.css';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
