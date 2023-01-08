<template>
  <div>
    <h1>My Page</h1>
  </div>
  <div>
    <h3>{{ userInfo.name }}님, 환영합니다.</h3>
  </div>
  <div>
    <h4>{{ userInfo }}</h4>
    <h4>로그인 상태 : {{ isLogin }}</h4>
    <h4>로그인 에러 : {{ isLoginError }}</h4>
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
    ...mapState(['userInfo', 'isLogin', 'isLoginError'])
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
