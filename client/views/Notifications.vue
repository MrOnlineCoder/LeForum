<template>
  <div>
    <div class="row">
      <div class="col-md-10 col-xs-10 col-sm-10">
        <h2>Notifications</h2>
      </div>
      <div class="col-md-2 col-xs-2 col-sm-2" v-if="list.length > 0">
        <b-btn-group class="float-right">
          <b-button variant="warning" @click="clear()">
            <font-awesome-icon icon="trash" />
            Clear all notifications
           </b-button>
        </b-btn-group>
      </div>
    </div>
    <hr>

    <div v-if="busy">
      <h3>
        <font-awesome-icon icon="spinner" spin/>
        Loading your notifications...
      </h3>
    </div>

    <b-alert :show="list.length == 0" variant="info">
      You do not have any notifications.
    </b-alert>

    <div>
      <div class="card" v-for="item in list">
        <div class="card-body">
          <h5 class="card-title">
            <font-awesome-icon :icon="getIcon(item.type)"/>
            {{ item.date | formatDateTime }}
          </h5>
          <p class="card-text">
            <div v-if="item.type == 'mention'">
              <b>{{ item.issuer }}</b> replied to your post in
              <a :href="'#/topic/'+item.topic._id">{{ item.topic.title }}</a>
            </div>

            <div v-if="item.type == 'delete'">
              <b>{{ item.issuer }}</b> has deleted your post
              <p class="lead" v-html="item.data"></p></a>
            </div>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Session from '../services/session'

export default {
  data() {
    return {
      list: [],
      busy: true
    }
  },
  methods: {
    clear() {
      this.$http.post('/api/private/user/notifications/clear', {
        token: Session.getToken()
      }).then(resp => {
        if (!resp.body.success) {
          return;
        }

        this.list = [];
      });
    },
    getIcon(type) {
      if (type == 'mention') return 'quote-right';
      if (type == 'like') return 'heart';
      if (type == 'delete') return 'times-circle';
      return '';
    }
  },
  created() {
    if (!Session.isLoggedIn()) {
      this.$router.push('/home');
      return;
    }

    this.$http.get('/api/private/user/notifications?token='+Session.getToken()).then(resp => {
      if (!resp.body.success) {
        return;
      }

      this.list = resp.body.docs;
      this.busy = false;
    });
  }
}
</script>
