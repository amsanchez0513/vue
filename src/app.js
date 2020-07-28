import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Main from './components/Main.vue'
import Category from './components/Category.vue';
 
export const bus = new Vue();

Vue.use(VueAxios, axios)

// Vue.use(VueRouter)
// Vue.config.productionTip = false;

// const routes= [
//     { path: '/main', component: Main },
//     { path: '/cat', component: Category }
//   ]

// const router = new VueRouter({
//   routes,
//   mode:'history'
// })


new Vue({
	el: '#app',
	render: h => h(App)
});