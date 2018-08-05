<template>
  <div id="replyBox">
    <b-card header="Reply" v-if="ok">
      <Editor @editorUpdate='editorUpdate'></Editor>
      <br>
      <h5 v-if="reply">Reply: <small>{{ reply }}</small></h5>
      <b-button variant="success" @click="post()">
        <font-awesome-icon icon="envelope" />
        Post
      </b-button>
      <br>
      <br>
      <b-alert variant="warning" :show="!!warn">
        {{ warn }}
      </b-alert>
    </b-card>
    <b-alert variant="danger" :show="!ok">
      {{ msg }}
    </b-alert>
  </div>
</template>

<script>
import Session from '../services/session'
import Editor from '../components/Editor.vue'

export default {
  data() {
    return {
      content: '',
      ok: false,
      warn: '',
      msg: 'Loading...'
    }
  },
  props: ['topic', 'reply'],
  methods: {
    post() {
      if (!this.content || this.content.length < 3) {
        this.warn = 'Your post must be at least 3 characters in length!';
        return;
      }

      this.$http.post('/api/posts/add', {
        topic: this.topic._id,
        content: this.content,
        reply: this.reply,
        token: Session.getToken()
      }).then(resp => {
        if (!resp.body.success) {
          this.ok = false;
          this.msg = resp.body.message;
          return;
        }

        this.content = '';
        this.$emit('replyPosted', {});
      });
    },
    editorUpdate(c) {
      this.content = c;
    },
    checkPerms() {
      if (!Session.isLoggedIn()) {
        this.ok = false;
        this.msg = 'Log in to post replies.';
        return;
      }

      this.ok = true;
      //this.$http.get('/api/user/canPost/'+this.category+'?token='+Session.getToken(),);
    }
  },
  created() {
    this.checkPerms();
  },
  components: {
    Editor
  }
}
</script>
