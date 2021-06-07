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
    // profile

    // make updateMatch axios call (passing profileId)
    updateMatch(event.target.id, user)
      // console log response
      .then(res => {
        // if a match was created
        if (res.status === 201) {
          // reset skipCounter
          setSkipCounter(0)
          const otherProfileId = res.data.match.profileTwo.owner
          // add otherProfileId to user.profileId.sentMatches array
          user.profileId.sentMatches.push(otherProfileId)
          // setUser
          setUser(user)

          // remove profile from profiles state array
          const newProfiles = profiles.filter(profile => profile._id !== otherProfileId)
          // set profiles state
          setProfiles(newProfiles)

          // if a match is updated
        } else if (res.status === 200) {
          // reset skipCounter
          setSkipCounter(0)
          // remove profile from match view
          const otherProfileId = res.data.match.profileOne.owner._id
          // add otherProfileId to user.profileId.acceptedMatches array
          user.profileId.acceptedMatches.push(otherProfileId)
          // setUser
          setUser(user)

          // remove profile from profiles state array
          const newProfiles = profiles.filter(profile => profile._id !== otherProfileId)
          // set profiles state
          setProfiles(newProfiles)

          // send user msg that they matched with this profile to view matches
        } else {
          console.log('something else is wrong')
        }
      })
      .catch(error => console.log(error))
  }

  // if profiles array is populated
  if (profiles.length > 0) {
    // set currentProfile to skipCounter index
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
