<template>
  <div>
    <h2>Forum Staff</h2>
    <hr>
    <b-alert variant="danger" :show="err">
        Error: {{ errorMsg }}
    </b-alert>
    <b>Legend:</b>
    <ul>
      <li v-for="it in groups" :style="{color: it.color}">{{ it.title }}</li>
    </ul>
    <br>
    <UserTable :list="users"></UserTable>
    <h2 align="center" v-if="busy">Loading...</h2>
  </div>
</template>

<script>
import UserTable from '../components/UserTable.vue'
import InfoService from '../services/info'

export default {
  data () {
    return {
      page_title: 'Forum Staff',
      errorMsg: '',
      err: false,
      users: [],
      groups: [],
      busy: false
    }
  },
  created() {
    this.busy = true;
    this.groups = InfoService.getGroups();

    this.$http.get('/api/users/staff').then(resp => {
      if (!resp.body.success) {
        this.err = true;
        this.errorMsg = resp.body.message;
        return;
      }

      this.users = resp.body.users;
      this.busy = false;
    });
  },
  components: {
    UserTable
  }
}
</script>
