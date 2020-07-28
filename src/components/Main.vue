<template>
  <div id="categories">
    <div class="wrapper">
      <div class="card" v-for="category in filterItems(categories)">
        <a @click="switchComponent('tawk-category', category)">
          <i v-bind:class="'fa fa-'+category.icon+''"></i>
          <p class="title">{{category.title}}</p>
          <small class="totalArticle">{{category.totalArticle}} articles</small>
          <small>Updated on {{category.updatedOn}}</small>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Category from './Category.vue';
import { bus } from '../app.js';


export default {
  data: function() {
    return {
      categories: [],
      currentComp: 'tawk-main',
      category: [], 
      showCategory: false,
      id: "",
      title: "",
      description: "",
      updatedOn: "",
      enabled: "",
      order: "",
      icon: "",
      totalArticle: ""

    };
  },
  mounted() {
    axios.get("http://localhost:9000/api/categories").then(response => {
      //console.log(  response.data);
      this.categories = response.data
    })
  },
  methods:{
    filterItems: function(filteredCategories) {
      return filteredCategories.filter(function(item) {
        return item.enabled == true;
      })
    },
    switchComponent: function(currentComp, category) {
      this.category={
          id: category.id,
          title: category.title,
          description: category.description,
          updatedOn: category.updatedOn,
          enabled: category.enabled,
          order: category.order,
          icon: category.icon,
          totalArticle: category.totalArticle
      };

      bus.$emit('categoryValues', this.category);
      bus.$emit('switchComp', currentComp);
      console.log(this.category);
    }
  },
  computed:{
    filteredCategories: function(){
    return this.categories.filter((category)=>{
      return category.title.match(this.search)
    });
    }
  },
  components:{
    Category
  }
  
}
</script>

<style lang="scss" scoped>
  @import '../scss/main.scss';

  #categories{
    margin: auto;
    width: 60%;
    padding: 5% 20px 20px 20px;
    background-color: #fafafa;
  }
  .wrapper {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }

  .card {
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    width: 30%;
    margin: 12px;
    padding: 10px;
    transition: .15s all ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
   
    a {
      text-decoration: none;
      padding: 12px;
      font-size: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;

      i{
        padding: 20px;
        color: #03a84e;
        font-size: 40px;
      }

      .title{
        font-weight: bold;
        color: #373737;
        font-size: 14px;
        width: 100%;
        text-align: center;
      }
      .totalArticle{
        color: #03a84e;
        font-size: 12px;
      }
      small {
        color: #9c9aa6;
        font-size: 10px;
      }
    }
  }
  
</style>