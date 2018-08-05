<template>
  <b-navbar toggleable="md" type="light" variant="light">
    <b-navbar-brand href="#">
     <img :src="brandURL" class="d-inline-block align-top" alt="BV">

   </b-navbar-brand>

   {{ name }}

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item><router-link class="nav-link" to="/home">Home</router-link></b-nav-item>
        <b-nav-item><router-link class="nav-link" to="/rules">Rules</router-link></b-nav-item>
        <b-nav-item><router-link class="nav-link" to="/staff">Staff</router-link></b-nav-item>
        <b-nav-item><router-link class="nav-link" to="/profile">Profile</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right v-if="isLoggedIn">
          <!-- Using button-content slot -->
          <template slot="button-content">
            <b>{{ username }} <b-badge v-if="notifications > 0" variant="warning">{{ notifications }}</b-badge></b>
          </template>
          <b-dropdown-item href="#/notifications">
            <font-awesome-icon icon="bell" />
            Notifications <b-badge>{{ notifications }}</b-badge>
          </b-dropdown-item>
          <b-dropdown-item href="#">
            <font-awesome-icon icon="cog" />
            Settings
          </b-dropdown-item>
          <b-dropdown-item href="https://github.com/MrOnlineCoder/LeForum/issues">
            <font-awesome-icon icon="bug" />
            Report a bug
          </b-dropdown-item>
          <b-dropdown-item href="#" @click='logout()'>
            <font-awesome-icon icon="sign-out-alt" />
            Logout
          </b-dropdown-item>
        </b-nav-item-dropdown>

        &nbsp;

        <b-nav-form v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
          &nbsp;
          or
          &nbsp;
          <router-link to="/register">Register</router-link>
        </b-nav-form>
    </b-navbar-nav>


    </b-collapse>
  </b-navbar>
</template>

<script>

import InfoService from '../services/info'
import Session from '../services/session'

export default {
  data() {
    return {
      name: "",
      brandURL: "",
      username: "",
      notifications: 0,
      isLoggedIn: false
    }
  },
  methods: {
    logout() {
      Session.logout();
      this.isLoggedIn = false;

      this.$router.push('/login');
    },
    sessionCallback() {
      this.isLoggedIn = Session.isLoggedIn();

      this.username = Session.getUser().username;
    },
    fetchNotifications() {
      this.$http.get('/api/private/user/notifications?token='+Session.getToken()).then(resp => {
        if (!resp.body.success) {
          return;
        }

        this.notifications = resp.body.docs.length;
      });
    }
  },
  created() {
    Session.setCallback(this.sessionCallback);
    this.name = InfoService.get().name;
    this.brandURL = InfoService.get().brandURL;

    if (Session.isLoggedIn()) {
      this.username = Session.getUser().username;
      this.isLoggedIn = true;
      this.fetchNotifications();
    }
  }
}
</script>
