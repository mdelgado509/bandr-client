// import react
import React, { useState, useEffect } from 'react'
import { showPotentialMatches, updateMatch } from '../../api/matches'
// import messaging
import messages from '../AutoDismissAlert/messages'

// import Card from react bootstrap
import Card from 'react-bootstrap/Card'

// define Profiles function component
const Match = props => {
  const [profiles, setProfiles] = useState([])
  const [skipCounter, setSkipCounter] = useState(0)

  // deconstruct user from props
  const { user, msgAlert, setUser } = props

  // useEffect to set profile type state
  useEffect(() => {
    // make indexProfiles axios call
    showPotentialMatches(user)
      // set res.data.profiles to profiles state
      .then(res => {
        const unfilteredProfiles = res.data.profiles

        const userSentMatches = user.profileId.sentMatches

        const userAcceptedMatches = user.profileId.acceptedMatches

        const filteredProfiles = unfilteredProfiles.filter(profile => !userSentMatches.includes(profile._id) && !userAcceptedMatches.includes(profile._id))
        console.log(filteredProfiles)
        setProfiles(filteredProfiles)
      })
      // add success messaging
      .then(() => msgAlert({
        heading: 'Profiles loaded successfully!',
        message: messages.indexProfilesSuccess,
        variant: 'success'
      }))
      // send back user error messaging
      .catch(error => {
        msgAlert({
          heading: 'Profiles error: ' + error.message,
          message: messages.indexProfilesFailure,
          variant: 'danger'
        })
      })
  }, [])

  // skip profile function
  const skipProfile = () => {
    // // otherwise prevent default refresh page
    // event.preventDefault()

    // if skipCounter is equal to the last index (length of the profiles array - 1) reset the counter
    if (skipCounter === (profiles.length - 1)) {
      setSkipCounter(0)
    } else {
      // increase skip counter
      setSkipCounter(skipCounter + 1)
    }
  }

  // matchProfile function
  const matchProfile = event => {
    // prevent default refresh
    event.preventDefault()

    // make updateMatch axios call (passing profileId)
    updateMatch(event.target.id, user)
      .then(res => {
        // the program looks at res.status
        // holds otherProfileId
        let otherProfileId
        if (res.status === 201) { // if created adds profileTwo to sentMatches
          otherProfileId = res.data.match.profileTwo.owner
          user.profileId.sentMatches.push(otherProfileId)
        } else if (res.status === 200) { // else if updated adds profileOne to acceptedMatches
          otherProfileId = res.data.match.profileOne.owner._id
          user.profileId.acceptedMatches.push(otherProfileId)
          // send user msg that they matched with this profile to view matches
          msgAlert({
            heading: 'Match made!',
            message: messages.updateMatchSuccess,
            variant: 'success'
          })
        }
        // sets user
        setUser(user)
        // return otherProfileId
        return otherProfileId
      })
      .then(otherProfileId => {
        // remove profile from profiles state array and skipProfile
        const filteredProfiles = profiles.filter(profile => profile._id !== otherProfileId)

        // if skipCounter === filteredProfiles.length reset skipCounter
        if (skipCounter === filteredProfiles.length) {
          setSkipCounter(0)
        } // else the skipCounter will choose next index after array filter
        // set new profiles state
        setProfiles(filteredProfiles)
      })
      .catch(() => console.error)
  }

  // if profiles array is populated
  if (profiles.length > 0) {
    // set currentProfile to skipCounter index
    console.log(skipCounter)
    const currentProfile = profiles[skipCounter]
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{currentProfile.title}</Card.Title>
              <Card.Subtitle style={{ textTransform: 'capitalize' }} className="mb-2 text-muted">{currentProfile.type}</Card.Subtitle>
              <Card.Text>
                {currentProfile.text}
              </Card.Text>
              <Card.Link href="#" onClick={event => {
                // because calling skipProfile within matchProfile caused
                // synthetic event warnings
                // (related to event.preventDefault() vs event.persist())
                event.preventDefault()
                // call skipProfile
                skipProfile()
              }}>
              Skip
              </Card.Link>
              <Card.Link href="#" id={currentProfile._id} onClick={matchProfile}>Match</Card.Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>No one to match with! Check your matches to see if you have any matches.</h3>
      </div>
    </div>
  )
}

export default Match
