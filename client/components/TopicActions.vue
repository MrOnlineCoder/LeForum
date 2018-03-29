<template>
  <div v-if="ok">
    <hr>
    <b-button-group>
        <b-button variant="warning" v-if="topic.open && canLock" @click="toggleLock(false)">Close Topic</b-button>
        <b-button variant="info" v-if="!topic.open  && canLock" @click="toggleLock(true)">Open Topic</b-button>
        <b-button variant="danger" v-if="canDelete" @click="askRemove()">Delete Topic</b-button>
      </b-button-group>

    <b-modal ref="removeModal" title="Confirm" header-bg-variant="danger" @ok="removeTopic()">
      This will delete topic and all posts related to it. Are you sure?
      <br>
      This action cannot be undone.
    </b-modal>
  </div>
</template>

<script>
import Session from '../services/session'
import InfoService from '../services/info'

export default {
  data() {
    return {
      ok: false,
      canLock: false,
      canDelete: false
    }
  },
  methods: {
    removeTopic() {
      this.$http.post('/api/private/topics/delete', {
        token: Session.getToken(),
        id: this.topic._id
      }).then(resp => {
        if (!resp.body.success) {
          alert(resp.body.message); //TODO: fancy error message
          return;
        }

        this.$router.push('/category/'+this.topic.category);
      });
    },
    toggleLock(mode) {
      this.$http.post('/api/private/topics/lock', {
        token: Session.getToken(),
        id: this.topic._id,
        mode: mode
      }).then(resp => {
        if (!resp.body.success) {
          alert(resp.body.message); //TODO: fancy error message
          return;
        }

        this.topic.open = mode;
      });
    },
    askRemove() {
      this.$refs.removeModal.show();
    }
  },
  props: ['topic'],
  created() {
    if (Session.isLoggedIn()) {
      //WARNING: this is cached value and may NOT correspond to server. Server check is required anyway.
      this.canLock = InfoService.hasPermission(Session.getUser(), 'close_threads');
      this.canDelete = InfoService.hasPermission(Session.getUser(), 'delete_threads');
      this.ok = true;
    }
  }
}
</script>
