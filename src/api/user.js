import { instance } from '@/api/index'

// 회원가입 API
function userSignup(userObj) {
  return instance.post('user/signup', userObj)
}

// 로그인 API
function userLogin(userObj) {
  return instance.post('user/login', userObj)
}

export { userSignup, userLogin }
