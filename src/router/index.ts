import { createRouter, createWebHistory } from 'vue-router';
import Store from '../components/Store.vue';
import AdminPanel from '../components/AdminPanel.vue';

const routes = [
  {
    path: '/',
    name: 'Store',
    component: Store
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
