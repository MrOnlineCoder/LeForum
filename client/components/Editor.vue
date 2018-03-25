<template>
  <div>
    <quill-editor v-model="content"
                ref="editor"
                @change="update()"
                @ready="load()">
    </quill-editor>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'


export default {
  data() {
    return {
      content: ''
    }
  },
  props: ['initialData'],
  methods: {
    update(obj) {
      this.$emit('editorUpdate', this.content);
    },
    load() {
      this.content = this.initialData;
    }
  },
  created() {
    this.content = this.initialData;
  },
  components: {
    quillEditor
  }
}
</script>
