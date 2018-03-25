<template>
  <div>
    <hr>
    <div v-html="rules">

    </div>
  </div>
</template>

<script>
import InfoService from '../services/info'

export default {
    data() {
      return {
        rules: ''
      }
    },
    created() {
      this.rules = InfoService.get().rules;
    }
}
</script>
