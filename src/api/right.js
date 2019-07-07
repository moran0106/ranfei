import axios from '../api/comment.js'

export const getright = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
