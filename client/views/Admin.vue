<template>
<div>
  <h1>LeForum Control Panel</h1>
  <hr>
  <div v-if="!busy">
    <b-alert variant="danger" :show="err">
      Error: {{ errorMsg }}
    </b-alert>
    <div>
      <b-tabs>
        <b-tab title="General forum configuration" active>
          <label>Forum name:</label>
          <b-form-input size="sm" v-model="general.name"></b-form-input>
          <br>
          <label>Forum description:</label>
          <b-form-input size="sm" v-model="general.description"></b-form-input>
          <br>
          <label>Forum brand image URL:</label>
          <b-form-input size="sm" v-model="general.brandURL"></b-form-input>
          <br>
          <p v-if="general.brandURL">
            Preview:
            <img :src="general.brandURL" width="100" height="100">
          </p>

          <b-button variant="success" size="lg" @click="saveConfig()">Save configuration</b-button>
          <br>
          <br>
          <b-alert variant="success" :show="ok">
            New configuration applied.
          </b-alert>
        </b-tab>
        <b-tab title="Permissions manager">
          <PermissionsManager></PermissionsManager>
        </b-tab>
        <b-tab title="Rules editor">
          <RuleEditor></RuleEditor>
        </b-tab>
        <b-tab title="Categories">
          <CategoryEditor></CategoryEditor>
        </b-tab>
        <b-tab title="Posting options">
          <PostingOptions></PostingOptions>
        </b-tab>
      </b-tabs>
    </div>
  </div>
  <hr>
  <h2 v-if="busy">Please wait...</h2>

  <div>
    <h2>About LeForum</h2>
    <b>version 1.0.0</b>
    <br>
    <code>
        Copyright (c) 2018 Nikita Kogut (MrOnlineCoder)
      </code>
    <br>
    <code>
      All Rights Reserved.
      </code>
    <br>
    <code>
        Licnesed under Apache License 2.0.
      </code>
    <br> Authors:
    <ul>
      <li> <a href="https://github.com/MrOnlineCoder">MrOnlineCoder</a> - creator, main developer</li>
    </ul>
    Used NPM packages (explicitly):
    <ul>
      <li>express</li>
      <li>bootstrap-vue</li>
      <li>camelcase</li>
      <li>country-list</li>
      <li>js-cookie</li>
      <li>jsonwebtoken</li>
      <li>marked</li>
      <li>moment</li>
      <li>morgan</li>
      <li>sha.js</li>
      <li>uuid</li>
      <li>vue</li>
      <li>vue-password</li>
      <li>vue-quill-editor</li>
      <li>vue-resource</li>
      <li>vue-router</li>
      <li>winston</li>
    </ul>
    I thank each author of these packages for their work.
    <br>
    <br>
  </div>
</div>
</template>

<script>
import Session from '../services/session'
import InfoService from '../services/info'

import PermissionsManager from '../components/PermissionsManager.vue'
import RuleEditor from '../components/RuleEditor.vue'
import CategoryEditor from '../components/CategoryEditor.vue'
import PostingOptions from '../components/PostingOptions.vue'

export default {
  data() {
    return {
      busy: true,
      general: {},
      groups: {},
      err: false,
      errorMsg: '',
      ok: false
    }
  },
  methods: {
    saveConfig() {
      this.$http.post('/api/private/admin/setGeneral', {
        token: Session.getToken(),
        general: this.general
      }).then(response => {
        this.ok = true;
      });
    },
    load() {
      this.general = InfoService.get();
    }
  },
  created() {
    if (!Session.isLoggedIn()) {
      this.$router.push('/login');
      return;
    }

    this.$http.get('/api/private/admin/canAccess?token=' + Session.getToken()).then(resp => {
      if (!resp.body.success) {
        this.$router.push('/home');
        return;
      }

      this.busy = false;
      this.load();
    });
  },
  mounted() {
    this.$on('groupsUpdate', (val) => {
      console.log('got update: ' + val);
      this.groups = val;
    });
  },
  components: {
    PermissionsManager,
    RuleEditor,
    CategoryEditor,
    PostingOptions
  }
}
</script>
