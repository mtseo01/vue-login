<template>
  <v-container style="max-width: 400px">
    <v-card title="회원가입" class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit"
        ><v-text-field
          clearable
          :rules="[required]"
          v-model="email"
          type="email"
          label="e-mail"
          placeholder="이메일을 입력하세요"
        ></v-text-field>

        <v-text-field
          clearable
          :readonly="loading"
          :rules="[required]"
          v-model="password"
          type="password"
          label="password"
          placeholder="비밀번호를 입력하세요"
        ></v-text-field>

        <v-text-field
          clearable
          :rules="[required]"
          v-model="name"
          type="text"
          label="name"
          placeholder="이름을 입력하세요"
        ></v-text-field>
        <v-alert
          v-if="isSignUp"
          title=""
          type="success"
          variant="text"
          style="font-size: 12px"
        >
          회원가입을 성공하였습니다.
        </v-alert>
        <v-alert
          v-else-if="isSignUpError"
          title=""
          type="error"
          variant="text"
          style="font-size: 12px"
        >
          {{ logMessage }}
        </v-alert>

        <v-btn
          @click="signUp({ email, password, name })"
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          회원가입
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
export default {
  components: {},
  computed: {
    ...mapState(['isLogin', 'isLoginError'])
  },
  data() {
    return {
      ...mapActions(['login']),
      form: false,
      email: null,
      name: null,
      password: null,
      loading: false,
      isSignUp: false,
      isSignUpError: false,
      logMessage: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    onSubmit() {
      if (!this.form) return

      this.loading = true

      setTimeout(() => (this.loading = false), 300)
    },
    required(v) {
      return !!v || '입력이 필요합니다.'
    },
    async signUp() {
      try {
        const userObj = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        const res = await axios.post(
          'http://localhost:3000/user/signup',
          userObj,
          {
            withCredentials: true
          }
        )
        console.log(res)
        this.isSignUp = true
        // router.push({ name: 'home' })
        // this.initForm()
      } catch (error) {
        console.log(error)

        this.logMessage = error.message
        this.isSignUpError = true
      }
    }
    // initForm() {
    //   this.email = ''
    //   this.password = ''
    //   this.name = ''
    // }
  }
}
</script>
