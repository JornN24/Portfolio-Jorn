import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '../views/WelcomePage.vue';
import HomePage from '../views/HomePage.vue';
import AboutMePage from '../views/AboutMePage.vue';
import ProjectsPage from '../views/ProjectsPage.vue';

const routes = [
    { path: '/', component: WelcomePage },
    { path: '/home', component: HomePage },
    { path: '/about', component: AboutMePage },
    { path: '/projects', component: ProjectsPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
