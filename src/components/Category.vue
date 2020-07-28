<template id="cat">
  
  <div id="category">
     <ul class="breadcrumb">
      <li><a href="#" @click="switchComponent('tawk-main')">All categories</a></li>
      <li ></li>
     </ul>
    <div id="body-container">
      <div id="body-left">
        <div class="card">
          <div id="top">
            <i v-bind:class="'fa fa-'+icon+''"></i>
            <p class="title">{{title}}</p>
            <small>Updated {{updatedOn}}</small>
          </div>
          <div id="bottom">
            <i class="fa fa-info-circle"></i>
            <p class="description"> {{description}}</p>
          </div>
        </div>
      </div>
      <div id="body-right">
        <div id="articles" v-for="article in filterItems(articles)">
          <div id="article">
              <i v-bind:class="'fa fa-'+article.icon+''"></i>
              <div class="title">
                <i class="fa fa-chevron-right"></i>
                <p>{{article.title}}</p>
                <small >Updated {{article.updatedOn}}</small>
              </div>
          </div>
        </div>
      </div>
    </div>
     
  </div>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Main from './Main.vue'
import { bus } from '../app.js';

Vue.use(VueAxios, axios)
export default {
  name:'Category',
  data: function() {
    return {
      articles: [],
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
  created(){
    let self = this

     bus.$on('categoryValues', (category) => {
      this.id = category.id;
      this.title = category.title;
      this.description = category.description;
      this.updatedOn = category.updatedOn;
      this.enabled = category.enabled;
      this.order = category.order;
      this.icon = category.icon;
      this.totalArticle = category.totalArticle;

      console.log("title: "+this.title);
    })
  },
  methods: {
    filterItems: function(filteredArticles) {
      return filteredArticles.filter(function(item) {
        return item.status == 'published';
      })
    },
    switchComponent: function(currentComp) {
       bus.$emit('switchComp', currentComp);
    }
  },
  mounted() {
    axios.get("http://localhost:9000/api/category/"+this.id).then(response => {
      this.articles = response.data
    })
    
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/main.scss';

  #category{
    background-color: #666;
    padding: 10px;
    text-align: center;
    width: 100%;
    background-color: #fafafa;
  }
  #body-container{
    float: left;
    width: 100%;
    background: #fafafa;
  }
  #body-left{
    padding: 0;
    float: left;
  }
  #body-right{
    padding: 20px;
    width: 70%;
    float: right;
    background-color: #fafafa;
  }

  #body-right:after {
    content: "";
    display: table;
    clear: both;
  }

  #articles{
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    width: 100%;
    margin: 12px;
    padding: 10px; 
    text-decoration: none;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background-color: #ffffff;
    transition: .15s all ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }

  #article{
      text-decoration: none;
      font-size: 14px;
      width: 90%;
      padding: 10px;
      i{
        float: left;
        color: #03a84e;
        font-size: 30px;
        width: 10%;      
        }
      .title{
        color: #373737;
        font-size: 16px;
        float: right;
        width: 90%;   

        i{
          padding: 10px;
          float: right;
        } 
      }
      p{
          margin-bottom: 0;
      }
      small {
        color: #9c9aa6;
        font-size: 10px;
        margin:0;
      }
  }

  .card {
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    margin: 12px;
    padding: 10px; 
    text-decoration: none;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;

    #bottom{
      width: 100%;
      border-top: 1px solid #dfdfdf;
      padding: 10px; 
      text-decoration: none;
      font-size: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      i{
        padding: 20px;
        color: #03a84e;
        font-size: 20px;
      }
    }
    #top{
      padding: 10px; 
      text-decoration: none;
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
        font-size: 20px;
        width: 100%;
        text-align: center;
      }
      small {
        color: #9c9aa6;
        font-size: 10px;
      }
    }
  }

    ul.breadcrumb {
    padding: 10px 16px;
    list-style: none;
    background-color: #fafafa;
  }

  /* Display list items side by side */
  ul.breadcrumb li {
    display: inline;
    font-size: 14px;
    color: #9c9aa6;
  }

  /* Add a slash symbol (>) before/behind each list item */
  ul.breadcrumb li+li:before {
    padding: 8px;
    color: #d8d8d8;
    content: ">";
  }

  /* Add a color to all links inside the list */
  ul.breadcrumb li a {
    color: #03a84e;
    text-decoration: none;
  }

  /* Add a color on mouse-over */
  ul.breadcrumb li a:hover {
    color: #03a84e;
    text-decoration: underline;
  }
  
</style>