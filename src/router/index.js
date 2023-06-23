import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieList from '../views/MovieList.vue'
import MovieDetails from '../views/MovieDetails.vue'
import SearchForm from '../views/SearchForm.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MovieList',
      component: MovieList
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      component: SearchForm
    },
    {
      path: '/movies/:id',
      name: 'moviesId',
      component: MovieDetails
    },
    
  ]
})

export default router
