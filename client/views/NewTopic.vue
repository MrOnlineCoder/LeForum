<template>
  <div>
    <h2><small>Creating new topic in</small> {{ category }}</h2>
    <hr>
    <b-form v-on:submit.prevent @submit="submit()">
      <b-form-group label="Title:">
        <b-form-input type="text"
                      v-model="title"
                      required
                      placeholder="Enter topic title">
        </b-form-input>

      </b-form-group>

      <b-form-group label="Content:">
        <Editor @editorUpdate='editorUpdate'></Editor>
      </b-form-group>
      <p v-if="content.length > 0">Preview:
        <div v-html="content"></div>
      </p>

      <b-button type="submit" variant="primary">Create new topic</b-button>
    </b-form>
    <b-alert variant="danger" :show="err">
      Error: {{ errMsg }}
    </b-alert>
  </div>
</template>

<script>
import InfoService from '../services/info'
import Session from '../services/session'
import Editor from '../components/Editor.vue'

export default {
  data() {
    return {
      categoryID: '',
      category: '',
      title: '',
      content: '',
      err: false,
      errMsg: ''
    }
  },
  methods: {
    error(msg) {
      this.err = true;
      this.errMsg = msg;
      return false;
    },
    submit() {
      if (!this.content) {
        return this.error('Please, enter your post contents.');
      }

      if (this.content.length < 4) {
        return this.error('Please, enter at least 3 characters.');
      }

      this.$http.post('/api/topics/new', {
        title: this.title,
        content: this.content,
        category: this.categoryID,
        token: Session.getToken()
      }).then(resp => {
        if (!resp.body.success) {
          return this.error(resp.body.message);
        }

        this.$router.push('/topic/'+resp.body.topicID);
      });
    },
    editorUpdate(content) {
      this.content = content;
    }
  },
  created() {
    if (!Session.isLoggedIn()) {
      this.$router.push('/home');
      return;
    }

    this.categoryID = this.$route.params.c;
    this.category = InfoService.get().categories[this.categoryID].title;
  },
  components: {
    Editor
  }
}
</script>
