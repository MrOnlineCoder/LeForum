<template>
  <div>
    <div class="card-title row">
      <div class="col-md-10 col-xs-10 col-sm-10">
        <h2>{{ name }}</h2>
      </div>
      <div class="col-md-2 col-xs-2 col-sm-2">
        <b-btn-group class="float-right">
          <b-button variant="info" v-if="loggedIn" @click="newTopic">
            <font-awesome-icon icon="pencil-alt" />
            New Topic
           </b-button>
        </b-btn-group>
      </div>
    </div>
    <hr>
    <h3 v-if="busy">
      <font-awesome-icon icon="spinner" spin/>
      Loading ...
    </h3>
    <b-alert variant="danger" :show="err">
      Error: {{ errMsg }}
    </b-alert>

    <div v-if="!busy && !err">
      <b-alert variant="info" :show="topics.length == 0">
        No topics are present is this category. Be the first to create one!
      </b-alert>

      <div v-if="topics.length > 0">
        <div v-for="item in topics">
          <TopicLine :data="item"></TopicLine>
          <br>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import InfoService from '../services/info'
import Session from '../services/session'

import TopicLine from '../components/TopicLine.vue'

export default {
  data() {
    return {
      topics: [],
      name: '',
      err: false,
      errMsg: '',
      busy: true,
      loggedIn: false
    }
  },
  methods: {
    error(msg) {
      this.err = true;
      this.errMsg = msg;
      this.busy = false;
      return false;
    },
    fetchData() {

      //Add token if we are logged in, so server knows how to handle permissions
      let tokenStr = '';

      if (this.loggedIn) {
        tokenStr = '?token='+Session.getToken();
      }

      this.$http.get('/api/topics/category/'+this.$route.params.c+tokenStr).then((resp) => {
        if (!resp.body.success) {
          return this.error(resp.body.message);
        }

        this.topics = resp.body.topics;
        this.busy = false;
      });
    },
    newTopic() {
      this.$router.push({
        path: '/category/'+this.$route.params.c+'/new'
      });
    }
  },
  created() {
    let cats = InfoService.get().categories;

    if (!cats[this.$route.params.c]) {
      return this.error('This category does not exist!');
    }

    this.name = cats[this.$route.params.c].title;
    this.loggedIn = Session.isLoggedIn();

    this.fetchData();
  },
  components: {
    TopicLine
  }
}
</script>
