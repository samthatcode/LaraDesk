// Import styles
import './assets/main.css';
import 'vuetify/styles';
import 'vue-toastification/dist/index.css';
import '@mdi/font/css/materialdesignicons.css'; // Import MDI icons

// Import Vue and related packages
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import router from './router';
import Toast, { POSITION } from 'vue-toastification';

// Create Vuetify instance with MDI icons configuration
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Ensure MDI is set as the default icon set
  },
});

// Create Vue application
const app = createApp(App);

// Use plugins and mount the application
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
});

app.mount('#app');
