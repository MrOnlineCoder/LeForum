<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col" v-b-tooltip.hover title="Read level determines which user groups will be able to read that category. Set to 0 to make it visible for everyone (including guests)">Read Level</th>
          <th scope="col" v-b-tooltip.hover title="Write level determines which user groups will be able to post to that category">Write Level</th>
          <th scope="col">Remove</th>
          <th><b-button variant="success" @click="add()">
            <font-awesome-icon icon="plus" />
          </b-button></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="v,k in categories">
          <td>{{k}}</td>
          <td><input type="text" class="form-control" v-model="categories[k].title"></td>
          <td><input type="text" class="form-control" v-model="categories[k].description"></td>
          <td><input type="number" class="form-control" v-model="categories[k].readLevel"></td>
          <td><input type="number" class="form-control" v-model="categories[k].writeLevel"></td>
          <td><b-button variant="danger" @click="remove(k)">
            <font-awesome-icon icon="times" />
          </b-button></td>
        </tr>
      </tbody>
    </table>
    <h3 v-if="Object.keys(categories).length == 0">Nothing to show. Click `Add` to add a new category</h3>
    <br>
    <b-button variant="success" size="lg" @click="save()">
      <font-awesome-icon icon="save" />
      Save categories
    </b-button>
    <br>
    <br>
    <b-alert variant="success" :show="ok">
        New categories have been saved.
    </b-alert>
  </div>
</template>

<script>
import camelcase from 'camelcase'
import Session from '../services/session'
import InfoService from '../services/info'

export default {
  data() {
    return {
      categories: InfoService.get().categories,
      ok: false
    }
  },
  methods: {
    save() {
      this.$http.post('/api/private/admin/setCategories', {
        token: Session.getToken(),
        categories: this.categories
      }).then(resp => {
        this.ok = true;
      });
    },
    remove(k) {
      this.$delete(this.categories, k);
    },
    add() {
      let res = prompt('Enter new category ID:');
      if (!res) return;

      this.$set(this.categories, camelcase(res), {
        title: res+' title',
        description: res+' description',
        readLevel: 0,
        writeLevel: 0
      });
    }
  }
}
</script>
