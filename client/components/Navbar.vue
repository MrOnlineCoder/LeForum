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
        <b-nav-item><router-link class="nav-link" to="/profile">Profile</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right v-if="loggedIn">
          <!-- Using button-content slot -->
          <template slot="button-content">
            <b>Username</b>
          </template>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
          <b-dropdown-item href="#">Report a bug</b-dropdown-item>
          <b-dropdown-item href="#">Logout</b-dropdown-item>
        </b-nav-item-dropdown>

        &nbsp;

        <b-nav-form v-if="!loggedIn">
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

export default {
  data() {
    return {
      loggedIn: false,
      name: "",
      brandURL: "",
    }
  },
  created() {
    this.name = InfoService.get().name;
    this.brandURL = InfoService.get().brandURL;
  }
}
</script>
