// import apiUrls and axios
import apiUrl from '../apiConfig'
import axios from 'axios'

export const showPotentialMatches = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/match/' + user.profileId.type,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

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
