import { createStore } from 'vuex'

export default createStore({
  state: {
    allUsers: [
      { id: 1, name: 'kim', email: 'kim@gmail.com', password: '123456' },
      { id: 2, name: 'choi', email: 'choi@gmail.com', password: '123456' }
    ],
    isLogin: false,
    isLoginError: false
  },
  getters: {},
  mutations: {
    // state 값을 변경하는 로직
    // 로그인 성공
    loginSuccess(state) {
      state.isLogin = true
      state.isLoginError = false
    },
    // 로그인 실패
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    }
  },
  actions: {
    // 비지니스 로직
    // 로그인 시도
    login({ state, commit }, loginObj) {
      let selectedUser = null
      state.allUsers.forEach((user) => {
        if (user.email === loginObj.email) selectedUser = user
      })
      selectedUser === null
        ? commit('loginError')
        : selectedUser.password !== loginObj.password
        ? commit('loginError')
        : commit('loginSuccess')
    }
  },
  modules: {}
})
