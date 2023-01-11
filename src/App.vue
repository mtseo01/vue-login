<template>
  <v-app id="inspire">
    <AppHeader></AppHeader>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue'
// import store from '@/store/store'
// import axios from 'axios'
export default {
  components: {
    AppHeader
  },
  name: 'App',
  data: () => {
    return {}
  },
  setup() {},
  created() {},

  methods: {
    // ...mapActions(['logout'])
  }
}
</script>
