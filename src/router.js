import { createRouter, createWebHistory } from 'vue-router';
import BlogList from './components/BlogList.vue';
import BlogEditor from './components/BlogEditor.vue';

const routes = [
    {
        path: '/',
        name: 'BlogList',
        component: BlogList
    },
    {
        path: '/create',
        name: 'CreateBlog',
        component: BlogEditor
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;