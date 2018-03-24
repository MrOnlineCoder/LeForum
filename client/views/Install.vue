<template>
  <div class="container">
    <h1>LeForum Installation</h1>
    <hr>

    <b-alert variant="info" show>
        Welcome to LeForum! Please, complete LeForum setup on this page.
    </b-alert>
    <br>

    <div class="card">
      <div class="card-header">
        Step 1
      </div>
      <div class="card-body">
        <h5 class="card-title">Basic forum information</h5>
        Please, enter basic information about forum like it's name, description, etc.
        <input class="form-control" placeholder="Enter forum name" v-model="config.name">
        <br>
        <input class="form-control" type="text" placeholder="Forum's brand image URL" v-model="config.brandURL">
        <p v-if="config.brandURL">
          Preview:
          <img :src="config.brandURL" width="50" height="50">
        </p>
        <br>
        <textarea class="form-control" rows="8" cols="30" placeholder="Forum description" v-model="config.description"></textarea>
      </div>
    </div>
    <br>
    <div class="card">
      <div class="card-header">
        Step 2
      </div>
      <div class="card-body">
        <h5 class="card-title">Administrator's account</h5>
        This will create first user on your forum - main Administrator's account.
        <input class="form-control" placeholder="Administrator's username" v-model="adminName">
        <br>
        <input class="form-control" type="email" placeholder="Administrator's Email" v-model="adminEmail">
        <br>
        <input type="password" class="form-control" placeholder="Administrator's password" v-model="adminPass">
        <br>
        <input type="password" class="form-control" placeholder="Repeat administrator's password" v-model="adminPass2">
      </div>
    </div>
    <br>
    <div class="card">
      <div class="card-header">
        Step 3
      </div>
      <div class="card-body">
        <h5 class="card-title">Security settings</h5>
        This is JWT token secret. It is used to sign JWT tokens, which are used for login and registration at your forum.
        It was generated randomly and you can leave it as-is, it is OK.
        <br>
        <br>
        If you want to change it, <b>use LONG and RANDOM string</b>
         <br>
        <input type="text" class="form-control" placeholder="JWT secret key" v-model="config.tokenSecret">
      </div>
    </div>
    <br>
    <div class="card" style="text-align: center;">
      <div class="card-body">
        <b-alert variant="danger" :show="err">
          Error: {{ errorMsg }}
        </b-alert>
        <b-button size="lg" variant="success" @click="install()">Finish and go to my forum!</b-button>
      </div>
    </div>

    <br>
  </div>
</template>

<script>

import uuid_v4 from 'uuid/v4'

export default {
  data () {
    return {
      config: {
        name: '',
        description: '',
        tokenSecret: '',
        brandURL: ''
      },

      adminName: '',
      adminPass: '',
      adminPass2: '',

      err: false,
      errorMsg: '',
      page_title: 'Setup'
    }
  },
  methods: {
    error(msg) {
      this.err = true;
      this.errorMsg = msg;
      return false;
    },
    install() {
      if (!this.config.name) {
        return this.error('Please, enter forum name');
      }

      if (!this.config.description) {
        return this.error('Please, enter forum description');
      }

      if (!this.adminName) {
        return this.error('Please, enter forum administrator username');
      }

      if (!this.adminEmail) {
        return this.error('Please, enter forum administrator email');
      }

      if (!this.adminPass || !this.adminPass2) {
        return this.error('Please, enter administrator password');
      }

      if (this.adminPass.length < 8) {
        return this.error('Admin password must be at least 8 characters in length');
      }

      if (this.adminPass !== this.adminPass2) {
        return this.error('Admin passwords do not match!');
      }

      this.$http.post('/api/install/', {
        config: this.config,
        adminName: this.adminName,
        adminPass: this.adminPass,
        adminEmail: this.adminEmail
      }).then(response => {
        if (!response.body.success) {
          this.error(response.body.message);
          return;
        }

        this.$router.push('home');
      });

    }
  },
  created() {
    const tokenSecret = uuid_v4();

    this.config.tokenSecret = tokenSecret;
  }
}
</script>
