<template>
  <div>
    <Editor @editorUpdate='editorUpdate' :initialData='oldRules'></Editor>
    <br>
    <b-button variant="success" size="lg" @click="save()">Save rules</b-button>
    <br>
    <br>
    <b-alert variant="success" :show="ok">
        New rules have been saved.
    </b-alert>
  </div>
</template>

<script>
import Editor from './Editor.vue'
import Session from '../services/session'
import InfoService from '../services/info'

export default {
  data() {
    return {
      rules: '',
      oldRules: InfoService.get().rules,
      ok: false
    }
  },
  methods: {
    save() {
      this.$http.post('/api/private/admin/setRules', {
        token: Session.getToken(),
        rules: this.rules
      }).then(resp => {
        this.ok = true;
      });
    },
    editorUpdate(content) {
      this.rules = content;
    }
  },
  created() {
    this.oldRules = InfoService.get().rules;
  },
  components: {
    Editor
  }
}
</script>
