<template>
  <div>
    <br>
    <div class="text-center">
      <b-button variant="success" @click="newGroup()">Add new usergroup</b-button>
    </div>
    <br>

      <!--If BootstrapVue has enough functionality to implement this table, updating this raw table is welcomed-->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Color</th>
            <th scope="col">Is Staff</th>
            <th scope="col">Permissions</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v,k in groups">
            <th>{{ k }}</th>
            <td><input type="text" class="form-control" v-model="groups[k].title"></td>
            <td><p :style="{'color': groups[k].color}">Preview</p><input type="text" class="form-control" v-model="groups[k].color"></td>
            <td><input type="checkbox" v-model="groups[k].staff"></td>
            <td><b-button variant="primary" @click="openPermsModal(k)">Manage</b-button></td>
            <td>
              <b-button variant="danger" @click="removeGroup(k)">
              <font-awesome-icon icon="times" />
            </b-button>
          </td>
            <!--<td><b-button variant="danger" @click="removeGroup(k)">Remove</b-button></td>-->
          </tr>
        </tbody>
      </table>

      <b-modal ref="permModal" title="Manage group permissions" :ok-only="true">
        <div class="" v-if="editGroup">
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


      <b-modal ref="removeModal" variant="danger" title="Remove user group" :ok-only="true">
        <p>
          Do you really want to remove <b>{{ removeGroup }}</b> group?

          This action cannot be undone.
        </p>

        <p>
          All users from this group must be moved to another. Please choose target one:

          <select v-model="removeMigrateGroup">
            <option v-for="o,g in groups" v-if="g != removeGroup">{{ g }}</option>
          </select>
        </p>
      </b-modal>
      <b-button variant="success" size="lg" @click="save()">
        <font-awesome-icon icon="save" />
        Save permissions
      </b-button>
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
      editGroup: '',
      actions: {},
      hints: {},
      removeGroup: '',
      ok: false
    }
  },
  methods: {
    openPermsModal(id) {
      this.editGroup = id;
      this.$refs.permModal.show();
    },
    newGroup() {
      let str = prompt('Enter group ID (please, use only lower case letters, numbers, underscores and dashes):');
      if (!str) return;

      this.groups[Utils.toCamelCase(str)] = {
        title: 'NewGroup Title',
        color: '#000000',
        staff: false,
        permission: [],
        readLevel: 0,
        writeLevel: 0
      };
      this.$forceUpdate();
    },
    removeGroup(id) {
      this.$delete(this.groups, id);
      this.$forceUpdate();
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
