<template>
  <div>
    <h1>My Page</h1>
  </div>
  <div>
    <h3>{{ userInfo.name }}님, 환영합니다.</h3>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data() {
    return {
      sampleData: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
<style scoped>
div {
  text-align: center;
}
</style>
