<template>
  <div>
    <b-alert :show="err" variant="danger">
      Error: {{errMsg}}
    </b-alert>
    <div v-if="!busy && !err">
      <h2><b-badge>{{ category }}</b-badge> {{ topic.title }}</h2>
      <p>Topic is <span :class="getStatusColor">{{ getStatusText }}</span></p>
      <small>Topic has been started {{ topic.date | formatDateTime }} by <b>{{ topic.author }}</b></small>
      <br>
      <div v-for="item in posts">
        <hr>
        <Post
          :post="item"
          :user="userCache[item.author]"
          @topicUpdated="fetchData()"
          @replyTo="setReply">
        </Post>
      </div>
    </div>
    <br>
    <p>Topic is <span :class="getStatusColor">{{ getStatusText }}</span></p>
    <Reply :topic="topic" :reply="reply" v-if="topic.open" @replyPosted="fetchData()"></Reply>
    <TopicActions :topic="topic"></TopicActions>
    <br>

    <h2 v-if="busy">Loading...</h2>
  </div>
</template>

<script>
import Post from '../components/Post.vue'
import Reply from '../components/Reply.vue'
import InfoService from '../services/info'
import TopicActions from '../components/TopicActions.vue'

export default {
  data() {
    return {
      topic: {},
      category: '',
      posts: [],
      postersList: {},
      userCache: {},
      err: false,
      errMsg: '',
      tid: '',
      reply: '',
      busy: true
    }
  },
  methods: {
    error(msg) {
      this.err = true;
      this.errMsg = msg;
      this.busy = false;
      return false;
    },
    setReply(u) {
      console.log(u);
      this.reply = u;
    },
    createUsersCache() {
      //1.Iterate through all objects and determine what user profiles we need to load
      //2. Load profiles
      //3. Display data!

      // (1)
      for (let i=0;i<this.posts.length;i++) {
        let name = this.posts[i].author;
        if (!this.postersList[name]) this.postersList[name] = true;
      }

      // (2)
      this.$http.post('/api/users/fromList', {
        list: Object.keys(this.postersList)
      }).then(resp => {
        if (!resp.body.success) {
          return this.error('Failed to load user profiles for that topic!');
        }

        for (let i =0;i<resp.body.users.length;i++) {
          let user = resp.body.users[i];
          this.userCache[user.username] = user;
        }

        // (3)
        this.busy = false;
      });
    },
    fetchData() {
      this.busy = true;
      this.$http.get('/api/posts/forTopic/'+this.tid).then(resp => {
        if (!resp.body.success) {
          return this.error(resp.body.message);
        }

        this.topic = resp.body.topic;
        this.category = InfoService.get().categories[this.topic.category].title;
        this.posts = resp.body.posts;
        this.createUsersCache();
      });
    }
  },
  computed: {
    getStatusText() {
      return this.topic.open ? 'open' : 'closed';
    },
    getStatusColor() {
      return this.topic.open ? 'text-primary' : 'text-danger';
    }
  },
  created() {
    this.tid = this.$route.params.id;
    this.fetchData();
  },
  components: {
    Post,
    Reply,
    TopicActions
  }
}
</script>
