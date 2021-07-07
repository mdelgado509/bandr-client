import React, { useState, useEffect } from 'react'
import { indexMatches } from '../../api/matches'
import Card from 'react-bootstrap/Card'

const Matches = props => {
  const [matches, setmatches] = useState([])

  const { user } = props

  useEffect(() => {
    indexMatches(user)
      .then(res => {
        const matches = res.data.matches.filter(match => match.profileOne.owner && match.profileTwo.owner)
        setmatches(matches)
      })
      .catch(console.error)
  }, [])

  const matchesJsx = matches.map(match => (
    <Card key={match._id} className="text-center mb-2">
      <Card.Body>
        <Card.Title>{match.profileOne.owner._id === user.profileId._id ? match.profileTwo.owner.title : match.profileOne.owner.title}</Card.Title>
        <Card.Subtitle style={{ textTransform: 'capitalize' }} className="mb-2 text-muted">{match.profileOne.owner._id === user.profileId._id ? match.profileTwo.owner.type : match.profileOne.owner.type}</Card.Subtitle>
        <Card.Text className="text-justify">
          {match.profileOne.owner._id === user.profileId._id ? match.profileTwo.owner.text : match.profileOne.owner.text}
        </Card.Text>
      </Card.Body>
    </Card>
  ))

  return (
    <div className="row">
      <div className="col-8 col-md-6 col-lg-5 col-xl-4 mx-auto mt-5">
        <h3 className="text-white text-center">My Matches</h3>
        {matchesJsx}
      </div>
    </div>
  )
}

export default Matches
