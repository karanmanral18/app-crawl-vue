import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './style.css'

const app = createApp(App)
app.use(router)
app.use(LoadingPlugin);
app.use(VueToast, {
    duration: 6000,
    position: "top-right",
});
app.use(router)

app.mount('#app')
