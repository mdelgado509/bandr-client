import React, { useState, useEffect } from 'react'
import { indexMatches } from '../../api/matches'

const Matches = props => {
  const [matches, setmatches] = useState([])

  const { user } = props

  useEffect(() => {
    indexMatches(user)
      .then(res => setmatches(res.data.matches))
      .catch(console.error)
  }, [])

  const matchesJsx = matches.map(match => (
    <li key={match._id}>
      <h3>{match.profileOne.owner._id === user.profileId._id ? match.profileTwo.owner.title : match.profileOne.owner.title}</h3>
    </li>
  ))

  return (
    <div>
      <h4>Matches</h4>
      <ul>
        {matchesJsx}
      </ul>
    </div>
  )
}

export default Matches
