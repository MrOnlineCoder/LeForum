<template>
  <div class="container">
    <div v-if="!isInstallRoute">
      <Header></Header>
      <Navbar></Navbar>
      <hr>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue'
import InfoService from './services/info'

export default {
  data () {
    return {

    }
  },
  computed: {
    isInstallRoute() {
      return this.$route.path === '/install';
    }
  },
  created() {
    if (!InfoService.isPresent()) {
      if (!this.isInstallRoute) {
        this.$router.push('/install');
      }
    }
  },
  components: {
    Header,
    Navbar
  }
}
</script>
