// Файл src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

function page(path) {
  return () => import(`@/${path}`).then(m => m.default || m)
}

const routes = [
  {
    path: "/",
    name: 'roomList',
    component: page('components/roomList.vue'),
  },
  {
    path: "/createRoom",
    name: 'createRoom',
    component: page('components/createRoom.vue'),
  },
  {
    path: "/room/:id",
    name: 'room',
    component: page('components/roomView.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router