<template>
  <div class="container">
    <div v-if="!isInstallRoute">
      <Header></Header>
      <Navbar></Navbar>
    </div>
    <br>
    <router-view></router-view>
    <div class="text-center">
      <hr>
      <p>Powered by <a href="https://github.com/MrOnlineCoder/LeForum">LeForum</a> </p>
    </div>
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
