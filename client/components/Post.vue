<template>
  <div>
    <div class="row">
      <div class="col-md-3 col-sm-3 col-xs-3">
        <UserCard :user="user"></UserCard>
      </div>
      <div class="col-md-9 col-sm-9 col-xs-9">
        <b-card :header="post.date | formatDateTime" border-variant="secondary">
           <p class="card-text" v-html="post.content"></p>

           <div v-if="canDeletePost">
             <hr>
             <b-button-group>
               <b-button variant="danger" size="sm" @click="askPostRemove()">Delete</b-button>
             </b-button-group>
           </div>
         </b-card>
      </div>
    </div>

    <b-modal ref="removeModal" title="Confirm" header-bg-variant="danger" @ok="removePost()">
      This will delete post #{{post._id}} by <b>{{post.author}}</b>. Are you sure?
      <br>
      This action cannot be undone.
    </b-modal>
  </div>
</template>

<script>
import UserCard from './UserCard.vue'
import InfoService from '../services/info'
import Session from '../services/session'

export default {
  props: ['post', 'user'],
  data() {
    return {
      canDeletePost: false,
      canModifyPost: false
    }
  },
  created() {
    if (Session.isLoggedIn()) {
      this.canDeletePost = InfoService.hasPermission(Session.getUser(), 'delete_posts');

      //if (this.post.username == InfoService.get)
    }
  },
  methods: {
    removePost() {
      this.$http.post('/api/private/posts/delete', {
        token: Session.getToken(),
        id: this.post._id
      }).then(resp => {
        if (!resp.body.success) {
          alert(resp.body.message); //TODO: fancy error message
          return;
        }

        this.$emit('topicUpdated', {});
      });
    },
    askPostRemove() {
      this.$refs.removeModal.show();
    },
  },
  components: {
    UserCard
  }
}
</script>
