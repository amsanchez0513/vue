<template>
	<div id="main-div">
		<div id="top-div">
			<tawk-header></tawk-header>
			<tawk-search></tawk-search>
		</div>
		<br>
		<div id="bottom-div">
			<component :is="currentComp" :category="currentProps"></component>
		</div>
	</div>
</template>

<script>
import Header from './components/Header.vue'
import Search from './components/Search.vue';
import Main from './components/Main.vue';
import Category from './components/Category.vue';
import { bus } from './app.js';

import axios from "axios";
export default {
  	data() {
    	return {
			currentComp: 'tawk-main',
			currentProps : ''
    	};
  	},
  	created() {
      	bus.$on('switchComp', (comp) => {
			this.currentComp = comp.component;
			if (this.currentComp === 'tawk-category') {
				this.currentProps = comp.category 
			}		
		})	
	},
	components:{
		'tawk-header': Header,
		'tawk-search': Search,
		'tawk-main': Main,
		'tawk-category': Category
	}
	
}
</script>
<style lang="scss" scoped>
#main-div{
	background-color: #ffffff;
	width: 100%;
}

#top-div{
	background-color: #ffffff;
	height: 50%;
	margin: auto;
	width: 60%;
	padding: 40px;
}

#bottom-div{
	background-color: #fafafa;
	width: 100%;
}
</style>