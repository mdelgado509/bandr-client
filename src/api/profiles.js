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
    data: { profile }
  })
}

// export index user profile (user as arg)
export const userProfile = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/profile',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

// export delete user profile (user as arg)
export const deleteProfile = user => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/profile/destroy',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

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
