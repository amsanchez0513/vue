<template id="cat">
  
  <div id="category">
    <div id="body-container">
    <ul class="breadcrumb">
      <li><a href="#" @click="changeComponent('tawk-main')">All categories</a></li>
      <li>{{title}}</li>
     </ul>
     <br>
      <div id="body-left">
        <div class="card">
          <i class="fa fa-file-alt">&nbsp;{{totalArticle}}</i>
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
    <div id="other">
      <h5>Other Categories</h5>
      <div class="wrapper2">

      <button @click="page--" v-if="page != 1"> < </button>
      <div class="card2" v-for="cat in paginate(categories)">
        <a @click="changeComponent('tawk-category', category)">
          <i v-bind:class="'fa fa-'+cat.icon+''"></i>
          <p class="title">{{cat.title}}</p>
          <small class="totalArticle">{{cat.totalArticle}} articles</small>
          <small>Updated on {{cat.updatedOn}}</small>
        </a>
      </div>
      <button @click="page++"  v-if="page != 2"> > </button>
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
  props: {
    category: {
      type: Object,
      default: null
    }
  },
  name:'Category',
  data: function() {
    return {
      categories: [],
      articles: [],
      cat: [],
      id: "",
      title: "",
      description: "",
      updatedOn: "",
      enabled: "",
      order: "",
      icon: "",
      totalArticle: "",
      currentCategory: "",
      page: 1,
      perPage: 3,
      pages: []
    };
  },
  created(){
    this.id = this.category.id
    this.id = this.category.id;
    this.title = this.category.title;
    this.description = this.category.description;
    this.updatedOn = this.category.updatedOn;
    this.enabled = this.category.enabled;
    this.order = this.category.order;
    this.icon = this.category.icon;
    this.totalArticle = this.category.totalArticle;
  },
  methods: {
    filterItems: function(filteredArticles) {
      return filteredArticles.filter(function(item) {
        return item.status == 'published';
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

      bus.$emit('switchComp', {"component" : currentComp, "category" : this.category } );
    },
    changeComponent: function(currentComp) {
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

      bus.$emit('switchComp', {"component" : currentComp, "category" : this.category } );
    },
    filterCategories: function(filteredCategories) {
      return filteredCategories.filter(function(item) {
        return item.enabled == true;

      })
    },
    setPages () {
      let numberOfPages = Math.ceil(this.categories.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
      
    },
    paginate (categories) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);


      for (let i = 0; i < categories.length; i++) {
        if(categories[i].enabled == false){
          categories.splice(i, 1);
        }if(categories[i].title == this.title){
          categories.splice(i, 1);
        }
      }
      return categories.slice(from, to);
    }
  },
  mounted() {
    axios.get("http://localhost:9000/api/category/"+this.id).then(response => {
      this.articles = response.data
    }),

     axios.get("http://localhost:9000/api/categories").then(response => {
      //console.log(  response.data);
      this.categories = response.data
    })
    
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/main.scss';

  #category{
    padding: 10px;
    width: 100%;
    background-color: #fafafa;
    height: 920px;
  }
  #body-container{
    height: 900px;
    width: 80%;
    background: #fafafa;
    margin-left: 20%;
  }
  #body-left{
    width: 25%;
    float: left;
  }
  #body-right{
    width: 70%;
    float: right;
  }
  #body-right:after {
    content: "";
    display: table;
    clear: both;
  }
  #other{
    padding: 0;
    margin: 0;
    border-top: 2px solid #ededed;
    align-items: center;
    text-align: center;
    background-color: #fafafa;
    h5{
      padding: 30px;
      color: #9c9aa6;
    }
  }

  #articles{
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    width: 80%;
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
      width: 100%;
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

  button {
      float: left;
      width: 50px;
      padding: 10px;
      background: #fafafa;
      color: #a5a4ae;
      font-size: 20px;
      border: 1px solid #eeeeee;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-left: none; /* Prevent double borders */
      cursor: pointer;
    }

  .card {
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    margin: 12px;
    padding: 10px; 
    text-decoration: none;
    font-size: 24px;
    display: flex;

    i{
      float: right;
      color: #03a84e;
      font-size: 15px;
    }
    #bottom{
      width: 100%;
      border-top: 1px solid #dfdfdf;
      padding: 10px; 
      text-decoration: none;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align:center;
      i{
        padding: 10px;
        color: #03a84e;
        font-size: 20px;
      }

    }
    #top{
      padding: 10px; 
      text-decoration: none;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      i{
        padding: 20px;
        color: #03a84e;
        font-size: 30px;
      }

      .title{
        font-weight: bold;
        color: #373737;
        font-size: 14px;
        width: 100%;
        text-align: center;
      }
      small {
        color: #9c9aa6;
        font-size: 10px;
      }
    }
  }

  .wrapper2 {
    display: flex;
    margin-left: 10%;
    flex-wrap: wrap;
    align-items: center;
  }

  .card2 {
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    width: 25%;
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