<template>
  <div>
    <h1>User Profile</h1>
    <hr>
    <b-alert variant="danger" :show="err">
        Error: {{ errorMsg }}
    </b-alert>
    <h2 align="center" v-if="busy">Loading...</h2>
    <div class="row">
      <div class="col-md-3 col-sm-3 col-xs-3">
        <UserCard :user="user"></UserCard>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from '../components/UserCard.vue'
import Session from '../services/session'

export default {
  data() {
    return {
      user: {},
      busy: true,
      err: false,
      errorMsg: ''
    }
  },
  components: {
    UserCard
  },
  created() {
    if (this.$route.params.id) {
      this.$http.get('/api/users/profile/'+this.$route.params.id).then(resp => {
        if (!resp.body.success) {
          this.err = true;
          this.errorMsg = resp.body.message;
          this.busy = false;
          return;
        }

        this.busy = false;
        this.user = resp.body.user;
      });
    } else {
      if (!Session.isLoggedIn()) {
        this.$router.push('/login');
      }
      this.user = Session.getUser();
      this.busy = false;
    }
  }
}
</script>
