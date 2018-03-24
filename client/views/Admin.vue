<template>
  <div>
    <h1>LeForum Control Panel</h1>
    <hr>
    <div v-if="!busy">
      <b-alert variant="danger" :show="err">
          Error: {{ errorMsg }}
      </b-alert>
      <div>
        <b-btn v-b-toggle.collapse1 variant="primary">General forum configuration</b-btn>
        <b-collapse id="collapse1" class="mt-2">
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
        </b-collapse>
      </div>
      <br>
      <div>
        <b-btn v-b-toggle.collapse2 variant="primary">User groups and permissions manager</b-btn>
        <b-collapse id="collapse2" class="mt-2">
          <PermissionsManager></PermissionsManager>
        </b-collapse>
      </div>

      <br>
      <hr>
    </div>

    <h2 v-if="busy">Please wait...</h2>
  </div>
</template>

<script>
import Session from '../services/session'
import InfoService from '../services/info'

import PermissionsManager from '../components/PermissionsManager.vue'

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
    load() {
      this.general = InfoService.get();
    },
    save() {
      this.$http.post('/api/private/admin/update', {
        token: Session.getToken(),
        general: this.general,
        permissions: this.groups
      }).then(resp => {
        if (!resp.body.success) {
          this.err = true;
          this.errorMsg = 'Failed to save changes: '+resp.body.message;
          return;
        }

        this.ok = true;
        this.err = false;
      });
    }
  },
  created() {
    if (!Session.isLoggedIn()) {
      this.$router.push('/login');
      return;
    }

    this.$http.get('/api/private/admin/canAccess?token='+Session.getToken()).then(resp => {
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
      console.log('got update: '+val);
      this.groups = val;
    });
  },
  components: {
    PermissionsManager
  }
}
</script>
