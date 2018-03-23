<template>
  <div>
    <div class="row">
      <div class="col-md-9 col-lg-9 col-sm-9">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      description: ''
    }
  },
  created() {
    this.$http.get('/api/info/general').then(response => {
      this.name = response.body.name;
      this.description = response.body.description;
    });
  }
}
</script>
