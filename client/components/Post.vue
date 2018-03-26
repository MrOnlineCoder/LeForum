<template>
  <div>
    <div class="row">
      <div class="col-md-3 col-sm-3 col-xs-3">
        <UserCard :user="user"></UserCard>
      </div>
      <div class="col-md-9 col-sm-9 col-xs-9">
        <b-card :header="post.date | formatDateTime" border-variant="secondary">
           <p class="card-text" v-html="post.content"></p>
         </b-card>
      </div>
    </div>
    <!--<div class="media">
      <img class="align-self-start mr-3" src="http://placehold.it/30x30">
      <div class="media-body">
        <h5 class="mt-0">{{ post.author }}</h5>
        <div v-html="post.con"></div>
      </div>
    </div>-->
  </div>
</template>

<script>
import UserCard from './UserCard.vue'

export default {
  props: ['post', 'user'],
  components: {
    UserCard
  }
}
</script>
