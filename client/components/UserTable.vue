<template>
  <div>
      <b-table striped :items="list" :fields="fields">
        <template slot="username" slot-scope="data">
          <a :href="'#/profile/'+data.value" :style="{color: getUserColor(data.item)}">
            {{data.value}}
          </a>
        </template>
      </b-table>
  </div>
</template>

<script>
import Utils from '../services/utils'
import InfoService from '../services/info'

export default {
  data() {
    return {
      fields: [
        {
          key: 'username',
          sortable: true,
          label: 'Username'
        },
        {
          key: 'posts',
          sortable: true,
          label: 'Posts'
        },
        {
          key: 'reputation',
          sortable: true,
          label: 'Reputation'
        },
        {
          key: 'registered',
          sortable: true,
          label: 'Registered',
          formatter: Utils.formatDate
        },
      ],
      items: []
    }
  },
  props: ['list'],
  methods: {
    getUserColor(item) {
      return InfoService.getGroupColor(item.group);
    }
  }
}
</script>
