import axios from 'axios'

function createInstance() {
  return axios.create({
    baseURL: 'http://localhost:3000/'
  })
}

export const instance = createInstance()
