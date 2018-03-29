<template>
  <div>
    <div class="row">
      <div class="col-md-10 col-xs-10 col-sm-10">
        <h1>User Profile</h1>
      </div>
      <div class="col-md-2 col-xs-2 col-sm-2">
        <b-btn-group class="float-right">
          <b-button variant="info" v-if="loggedIn && self" @click="editProfile()">Edit Profile</b-button>
        </b-btn-group>
      </div>
    </div>
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

    <b-modal ref="editModal" header-bg-variant="warning" title="Edit Profile" @ok="save()">
      <p>Username: <b>{{ editUser.username }}</b></p>
      <b-form-group label="Location:">
        <b-form-select v-model="editUser.country" class="mb-3">
          <option v-for="item in countries" :value="item">{{ item }}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Bio:">
        <b-form-textarea
                     v-model="editUser.bio"
                     placeholder="Enter some information about yourself."
                     :rows="3"
                     :max-rows="6"
                     maxlength="255">
        </b-form-textarea>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import UserCard from '../components/UserCard.vue'
import Session from '../services/session'

import countryList from 'country-list'

export default {
  data() {
    return {
      user: {},
      editUser: {},
      busy: true,
      err: false,
      errorMsg: '',
      loggedIn: Session.isLoggedIn(),
      self: false,
      countries: countryList().getNames()
    }
  },
  components: {
    UserCard
  },
  methods: {
    save() {

    },
    editProfile() {
      this.editUser = Object.assign({}, this.user);
      this.$refs.editModal.show();
    }
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
      this.self = true;
      if (!Session.isLoggedIn()) {
        this.$router.push('/login');
      }
      this.user = Session.getUser();
      this.busy = false;
    }
  }
}
</script>
