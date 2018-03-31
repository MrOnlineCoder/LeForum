<template>
  <div>
    <p>Categories:</p>

    <div v-for="v,k in categories">
      <div class="card">
        <div class="card-body">
          <div class="card-title row">
            <div class="col-md-10 col-xs-10 col-sm-10">
              <h2><a :href="'#/category/'+k">{{ v.title }}</a></h2>
            </div>
            <div class="col-md-2 col-xs-2 col-sm-2">
              <b-btn-group class="float-right">
                <b-button variant="info" v-if="loggedIn" @click="newTopic(k)">
                  <font-awesome-icon icon="pencil-alt" />
                 New Topic
                </b-button>
              </b-btn-group>
            </div>
          </div>
          <p class="card-text">
            {{ v.description }}
          </p>
        </div>
      </div>
      <br>
    </div>

  </div>
</template>


<script>
import InfoService from '../services/info'
import Session from '../services/session'

export default {
  data () {
    return {
      loggedIn: Session.isLoggedIn(),
      categories: InfoService.get().categories,
      page_title: 'Main Page'
    }
  },
  methods: {
    newTopic(k) {
      this.$router.push({
        path: '/category/'+k+'/new'
      });
    }
  }
}
</script>
