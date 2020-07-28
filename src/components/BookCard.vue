<template>
  <div>
    <div class="card my-card">
      <div class="card-body">
        <h4 class="card-title">{{ book.name }}</h4>
        <p class="card-text">
          <small>by</small>
          {{ book.author }}
        </p>
        <div v-if="admin">
          <!-- CREATE EDIT DELETE LINK TO ROUTE -->
          <router-link :to="{ name: 'book-edit' , params : { id : book.id } }">
            <a href="#" class="card-link text-info">Edit</a>
          </router-link>
          <!-- <a href="#" class="card-link text-danger">Delete</a> -->

          <p>{{ temp1 }}</p>
          <BaseModal style="position: absolute; top: 3px; right: 3px;">
            <span slot="modal-button">
              <BaseIcon name="delete" color="#ff4c4c" cursor="pointer"></BaseIcon>
            </span>
            <h1 slot="modal-header" style="color: #2F4F4F;">Oopss!</h1>
            <div slot="modal-body">
              <h4>
                Are you sure you want to delete this book?
                <br />
                <small style="font-size: 0.6em; color: #696969;">- {{ book.name }}</small>
              </h4>
            </div>
          </BaseModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js'

export default {
  props: {
    book: {
      type: Object,
      default: null
    },
    admin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      temp1 : ""
    }
  },
  created() {
    let self = this

    EventBus.$on('lezgo', (payload) => {

      console.log("From card.vue: " + payload.name)

      // this.temp1 = payload.name
      // this.book.name = payload.name

    })
  }

}
</script>

<style lang="scss" scoped>
.my-card {
  min-height: 200px;
}
</style>