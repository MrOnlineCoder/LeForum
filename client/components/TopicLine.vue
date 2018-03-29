<template>
  <div>
     <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <a :href="'#/topic/'+data._id"> {{ data.title }} </a>
          <small> by <a :href="'#/profile/'+data.author"> {{ data.author }} </a></small>
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">created {{ data.date | formatDateTime }}</h6>
        <h6 class="text-danger" v-if="!data.open">closed</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>
