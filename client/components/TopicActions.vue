<template>
  <div v-if="ok">
    <hr>
    <b-button-group>
        <b-button variant="warning" v-if="topic.open && canLock" @click="toggleLock(false)">
          <font-awesome-icon icon="lock" />
          Close Topic
        </b-button>
        <b-button variant="info" v-if="!topic.open  && canLock" @click="toggleLock(true)">
          <font-awesome-icon icon="lock-open" />
          Open Topic
        </b-button>
        <b-button variant="danger" v-if="canDelete" @click="askRemove()">
          <font-awesome-icon icon="trash" />
          Delete Topic
        </b-button>
        <b-button variant="info" class="shareButton" :data-clipboard-text='link' v-b-tooltip.click title="Topic share link has been copied to clipboard.">
          <font-awesome-icon icon="share-alt" /> Share
        </b-button>
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
      canDelete: false,
      link: ''
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

    this.link = window.location.href;
  }
}
</script>
