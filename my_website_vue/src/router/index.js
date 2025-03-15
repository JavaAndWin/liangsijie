import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import WorksView from '../views/WorksView.vue'
import BlogView from '../views/BlogView.vue'
import SkillsView from '../views/SkillsView.vue'
import SkillVue from '../views/Skills/SkillVue.vue'

const routes = [
    { 
        path: '/', 
        name: 'homeview',
        component: HomeView 
    },
    { 
        path: '/worksview', 
        name:'worksview',
        component: WorksView 
    },
    { 
        path: '/skillsview', 
        name:'skillsview',
        component: SkillsView 
    },
    { 
        path: '/BlogView',
        name:'BlogView',
        component: BlogView
    },
    { 
        path: '/skillvue', 
        name:'skillvue',
        component: SkillVue 
    },
    {
        path: '/blog/:id',
        name: 'BlogDetail',
        component: () => import('../components/BlogDetail.vue'),
    },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router