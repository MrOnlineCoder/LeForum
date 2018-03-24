<template>
  <div>
    <b-card :title="user.username"
             :img-src="user.avatarURL ? user.avatarURL : undefined"
             img-alt="User Avatar"
             img-top
             class="mb-6">
       <p class="card-text">
         <span :style="{color: InfoService.getGroupColor(user.group), 'text-decoration': 'underline'}">{{ user.group | formatGroupTitle }}</span>
         <br>
         Posts: <b>{{ user.posts }}</b>
         <br>
         Reputation: <b>{{ user.reputation }}</b>
         <br>
         Register date: <b>{{ user.registered | formatDate }}</b>
         <br>
         Location: <b>{{ user.country }}</b>
         <br>
       </p>
     </b-card>
  </div>
</template>

<script>
import InfoService from '../services/info'

export default {
  props: ['user'],
  data() {
    return {
      InfoService
    }
  }
}
</script>
