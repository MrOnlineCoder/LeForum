<template>
  <div>
      <!--If BootstrapVue has enough functionality to implement this table, updating this raw table is welcomed-->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Color</th>
            <th scope="col">Is Staff</th>
            <th scope="col">Permissions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v,k in groups">
            <th>{{ k }}</th>
            <td><input type="text" class="form-control" v-model="groups[k].title"></td>
            <td><p :style="{'color': groups[k].color}">Preview</p><input type="text" class="form-control" v-model="groups[k].color"></td>
            <td><input type="checkbox" v-model="groups[k].staff"></td>
            <td><b-button variant="primary" @click="openPermsModal(k)">Manage</b-button></td>
            <!--<td><b-button variant="danger" @click="removeGroup(k)">Remove</b-button></td>-->
          </tr>
        </tbody>
      </table>

      <b-modal ref="permModal" title="Manage group permissions" :ok-only="true">
        <div class="">
            <p>{{editGroup}} can:</p>
            <b v-if="groups[editGroup].permission.includes('*')">Do everything and anything</b>
            <li v-if="!groups[editGroup].permission.includes('*')" v-for="v,k in actions">
              <label v-b-popover.hover='v' title="Raw permission">
                <input type="checkbox" :value="v" v-model="groups[editGroup].permission">
                {{ permDescription(k) }}
              </label>
            </li>
          </ul>
          <br>
          <p>Read and write levels determine what categories users in this group will be able to read and write (post) in.</p>
          <br>
          <label>
              Read level:
              <input type="number" class="form-control" v-model="groups[editGroup].readLevel">
          </label>
          <br>
          <label>
              Write level:
              <input type="number" class="form-control" v-model="groups[editGroup].writeLevel">
          </label>
        </div>
      </b-modal>
      <b-button variant="success" size="lg" @click="save()">Save permissions</b-button>
      <br>
      <br>
      <b-alert variant="success" :show="ok">
          New settings applied.
      </b-alert>
  </div>
</template>

<script>
import Utils from '../services/utils'
import InfoService from '../services/info'
import Session from '../services/session'

export default {
  data() {
    return {
      groups: [],
      editGroup: 'user',
      actions: {},
      hints: {},
      ok: false
    }
  },
  methods: {
    openPermsModal(id) {
      this.editGroup = id;
      this.$refs.permModal.show();
    },
    removeGroup(id) {
      delete this.groups[id];
    },
    permDescription(k) {
      return this.hints[k] || 'none';
    },
    save() {
      this.$http.post('/api/private/admin/setPermissions', {
        token: Session.getToken(),
        groups: this.groups
      }).then(response => {
        this.ok = true;
      });
    }
  },
  created() {
    this.$http.get('/api/info/userGroups').then(response => {
      this.groups = response.body;
      this.$http.get('/api/info/permissions').then(response => {
        this.actions = response.body.actions;
        this.hints = response.body.hints;
      });
    });
  }
}
</script>
