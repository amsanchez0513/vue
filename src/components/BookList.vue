<template>
  <div>
    <h1>Library</h1>

    <div class="row">
      <BookCard
        class="col-lg-3 col-md-4 col-sm-6 mb-5"
        v-for="book in books"
        :key="book.id"
        :book="book"
        :admin="true"
      ></BookCard>
      <hr>
      <h1 @click="testhihi" style="display: none;">test</h1>
    </div>
    <div class="row">
      <!-- <BaseIcon name="times" color="#ff4c4c" cursor="pointer" /> -->
    </div>
  </div>
</template>

<script>
import BookService from '../services/BookService.js'
import BookCard from '../components/BookCard.vue'
import { EventBus } from '../event-bus.js'

export default {
  components: {
    BookCard
  },
  data() {
    return {
      books: [],
      buttonModal1: {
        name: 'Show Modal #1'
      },
      buttonModal2: {
        name: 'Show Modal #2'
      },
      payload1: {
        name : '-new- content!-'
      }
    }
  },
  methods: {
    checkVal() {
      // console.clear();
      // console.log(this.$root.modalShow);
    },
    testhihi(){
      EventBus.$emit('lezgo', this.payload1);
      console.log("From booklist.vue: " + this.payload1.name)
    }
  },
  created() {
    // console.log("From - BookList.vue: " + this.$parent.modal);
    BookService.getBooks()
      .then(response => {
        this.books = response.data
      })
      .catch(errors => {
        console.log('Wops!', errors.response)
      })
  }
}
</script>

<style lang="scss" scoped></style>
