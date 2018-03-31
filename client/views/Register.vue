<template>
  <div>
    <h1>Register</h1>
    <p>
      For posting messages and creating threads on forum, please enter your username, password and email address.
    </p>
    <b-form v-on:submit.prevent v-if="!registered">
      <b-form-group label="Username:">
        <b-form-input type="text"
                      v-model="form.username"
                      required
                      placeholder="Enter your username">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Email:">
        <b-form-input type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter your email">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Password:">
        <vue-password v-model="form.password"
                    classes="input form-control"
                    :user-inputs="[form.email, form.username]"
                    :score="score">
      </vue-password>
      </b-form-group>
      <b-form-group label="Repeat password:">
        <b-form-input type="password"
                      v-model="password2"
                      required
                      placeholder="Repeat password">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Location: ">
         <b-form-select v-model="form.country" class="mb-3">
           <option v-for="item in countries" :value="item">{{ item }}</option>
         </b-form-select>
      </b-form-group>
      <b-alert variant="danger" :show="err">Error: {{ errMsg }}</b-alert>

      <b-button type="submit" variant="success" @click="register()">
        <font-awesome-icon icon="user-plus" />
        Register
      </b-button>
    </b-form>
    <b-alert variant="success" :show="registered">
      Congratulations! You have been successfully registered!
    </b-alert>
    <br>
  </div>
</template>

<script>
import VuePassword from 'vue-password'
import countryList from 'country-list'

export default {
  data () {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        country: ""
      },
      password2: "",
      score: 0,
      errMsg: "",
      err: false,
      countries: countryList().getNames(),
      registered: false,
      page_title: 'Register'
    }
  },
  methods: {
    error(msg) {
      this.err = true;
      this.errMsg = msg;
      return false;
    },
    register() {
      if (!this.form.username || !this.form.password || !this.form.email) {
        return this.error('Please, fill all fields!');
      }

      if (this.form.password !== this.password2) {
        return this.error("Passwords do not match!");
      }

      this.$http.post('/api/auth/register', {data: this.form}).then(res => {
        let response = res.body;
        if (!response.success) {
          return this.error(response.message);
        }

        this.registered = true;
        this.err = false;
      });
    }
  },
  components: {
    VuePassword
  }
}
</script>
