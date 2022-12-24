import { createStore } from 'vuex'
import router from '../router'
export default createStore({
  state: {
    userInfo: null,
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
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
    },
    // 로그인 실패
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    },
    logout(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
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
      if (selectedUser === null || selectedUser.password !== loginObj.password)
        commit('loginError')
      else {
        commit('loginSuccess', selectedUser)
        router.push({ name: 'myPage' })
      }
    },
    logout({ commit }) {
      commit('logout')
      alert('로그아웃 하였습니다.')
      router.push({ name: 'home' })
    }
  },

  modules: {}
})
