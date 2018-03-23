<template>
  <div>
    <h1>Login</h1>
    <p>
      Enter your login details such as email and password.
    </p>
    <b-form v-on:submit.prevent>
      <b-form-group label="Email:">
        <b-form-input type="text"
                      v-model="form.email"
                      required
                      placeholder="Enter your email">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Password:">
        <b-form-input type="password"
                      v-model="form.password"
                      required
                      placeholder="Password">
        </b-form-input>
      <br>
      <b-alert variant="danger" :show="err">Error: {{ errMsg }}</b-alert>
      <br>
      <b-button type="submit" variant="success" @click="login()">Login</b-button>
    </b-form-group>
    </b-form>
    <br>
  </div>
</template>

<script>

export default {
  data () {
    return {
      form: {
        email: "",
        password: ""
      },
      score: 0,
      errMsg: "",
      err: false,
      page_title: 'Login'
    }
  },
  methods: {
    error(msg) { 
      this.err = true;
      this.errMsg = msg;
      return false;
    },
    login() {
      if (!this.form.email || !this.form.password) {
        return this.error('Please, fill in all fields!');
      }

      this.$http.post('/api/auth/login', {
        email: this.form.email,
        password: this.form.password
      }).then(response => {
        let body = response.body;

        if (!body.success) {
          return this.error(body.message);
        }

        alert(body.token);
      });
    }
  },
}
</script>
