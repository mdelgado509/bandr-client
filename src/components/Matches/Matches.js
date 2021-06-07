import React, { useState, useEffect } from 'react'
import { indexMatches } from '../../api/matches'
import Card from 'react-bootstrap/Card'

const Matches = props => {
  const [matches, setmatches] = useState([])

  const { user } = props

  useEffect(() => {
    indexMatches(user)
      .then(res => setmatches(res.data.matches))
      .catch(console.error)
  }, [])

  const matchesJsx = matches.map(match => (
    <Card key={match._id} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{match.profileOne.owner._id === user.profileId._id ? match.profileTwo.owner.title : match.profileOne.owner.title}</Card.Title>
        <Card.Subtitle style={{ textTransform: 'capitalize' }} className="mb-2 text-muted">{match.profileOne.owner._id === user.profileId._id ? match.profileTwo.owner.type : match.profileOne.owner.type}</Card.Subtitle>
        <Card.Text>
          {match.profileOne.owner._id === user.profileId._id ? match.profileTwo.owner.text : match.profileOne.owner.text}
        </Card.Text>
      </Card.Body>
    </Card>
  ))

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        {matchesJsx}
      </div>
    </div>
  )
}

export default Matches
