import { createStore } from 'vuex'
import router from '../router'
import axios from 'axios'
export default createStore({
  state: {
    userInfo: null,
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
    login({ commit }, loginObj) {
      axios
        .post('http://localhost:3000/api/login', loginObj, {
          withCredentials: true
        })
        .then((res) => {
          // console.log(res)
          if (res.data.success) {
            commit('loginSuccess', res.data.selectedUser)
            router.push({ name: 'myPage' })
          } else {
            commit('loginError')
          }
        })
        .catch((err) => console.log(err))
    },
    logout({ commit }) {
      commit('logout')
      alert('로그아웃 하였습니다.')
      router.push({ name: 'home' })
    }
  },

  modules: {}
})
