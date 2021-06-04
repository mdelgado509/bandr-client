// import apiUrls and axios
import apiUrl from '../apiConfig'
import axios from 'axios'

// export profile (profile and user as args)
export const createProfile = (profile, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/profile/create',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      profile: profile
    }
  })
}

// export const indexPosts = (user) => {
//   return axios({
//     method: 'GET',
//     url: apiUrl + '/posts',
//     headers: {
//       'Authorization': `Bearer ${user.token}`
//     }
//   })
// }
//
// export const deletePost = (user, id) => {
//   return axios({
//     method: 'DELETE',
//     url: apiUrl + '/posts/' + id,
//     headers: {
//       'Authorization': `Bearer ${user.token}`
//     }
//   })
// }
//
// export const indexAllPosts = user => {
//   return axios({
//     method: 'GET',
//     url: apiUrl + '/posts/all',
//     headers: {
//       'Authorization': `Bearer ${user.token}`
//     }
//   })
// }
//
// export const updatePost = (user, id, body) => {
//   return axios({
//     method: 'PATCH',
//     url: apiUrl + '/posts/' + id,
//     headers: {
//       'Authorization': `Bearer ${user.token}`
//     },
//     data: {
//       post: {
//         body: body
//       }
//     }
//   })
// }
