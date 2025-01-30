import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { useUserStore } from '../stores/user';
// import { useRouter } from 'vue-router';

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'withCredentials': true
  },
});

api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
       // const userStore = useUserStore();
      // const router = useRouter();

       // userStore.logout();
       //router.push('/login');
      // window.location.href = '/login'

      localStorage.removeItem('jwt')
    }
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
