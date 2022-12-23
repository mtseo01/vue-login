<template>
  <div>
    <v-container style="max-width: 400px">
      <v-card title="ID 로그인" class="mx-auto px-6 py-8" max-width="344">
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

          <v-alert
            v-if="failAlert"
            title=""
            type="error"
            variant="text"
            style="font-size: 12px"
          >
            이메일 또는 비밀번호를 잘못 입력했습니다.
          </v-alert>
          <v-btn
            @click="login"
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            로그인
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      form: false,
      email: null,
      password: null,
      loading: false,
      failAlert: false,
      allUsers: [
        { id: 1, name: 'kim', email: 'kim@gmail.com', password: '123456' },
        { id: 2, name: 'choi', email: 'choi@gmail.com', password: '123456' }
      ]
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    login() {
      let selectedUser = null
      this.allUsers.forEach((user) => {
        if (user.email === this.email) selectedUser = user
      })
      selectedUser === null
        ? (this.failAlert = true)
        : selectedUser.password !== this.password
        ? (this.failAlert = true)
        : alert('로그인 되었습니다.')
    },
    onSubmit() {
      if (!this.form) return

      this.loading = true

      setTimeout(() => (this.loading = false), 300)
    },
    required(v) {
      return !!v || '입력이 필요합니다.'
    }
  }
}
</script>
<style scoped></style>
