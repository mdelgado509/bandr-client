// import apiUrls and axios
import apiUrl from '../apiConfig'
import axios from 'axios'

// updateMatch passing user and id
export const updateMatch = (id, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/profiles/${id}/match`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
