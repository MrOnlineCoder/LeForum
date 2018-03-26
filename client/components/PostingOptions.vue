<template>
  <div>
    <b-form-group label="Maximum post length (including HTML tags):">
      <b-form-input type="number"
                    v-model="maxlength"
                    required
                    placeholder="Enter topic title">
      </b-form-input>
    </b-form-group>
    <br>
    <b-button variant="success" size="lg" @click="save()">Save options</b-button>
    <br>
    <br>
    <b-alert variant="success" :show="ok">
        New posting options have been saved.
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
      options: {
        maxlength: 0
      },
      ok: false
    }
  },
  methods: {
    save() {
      this.$http.post('/api/private/admin/setPostOptions', {
        token: Session.getToken(),
        options: this.options
      }).then(resp => {
        this.ok = true;
      });
    }
  },
  created() {
    this.options = InfoService.get().postOptions;
  },
  components: {
    Editor
  }
}
</script>
