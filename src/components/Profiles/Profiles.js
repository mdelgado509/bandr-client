// import react
import React, { useState, useEffect } from 'react'
import { userProfile, indexProfiles } from '../../api/profiles'
// import messaging
import messages from '../AutoDismissAlert/messages'

// import Card from react bootstrap
import Card from 'react-bootstrap/Card'

// define Profiles function component
const Profiles = props => {
  const [type, setType] = useState(null)
  const [profiles, setProfiles] = useState([])
  const [skipCounter, setSkipCounter] = useState(0)

  // deconstruct user from props
  const { user, msgAlert } = props

  // useEffect to set profile type state ***only on first render***
  useEffect(() => {
    userProfile(user)
      .then(res => {
        // set the state type to the user profiles type
        setType(res.data.profile.type)
        // make indexProfiles axios call
        indexProfiles(user)
          // use filter array iteration method to map profiles that aren't the same
          // type as the user
          .then(res => {
            // defined array of profiles
            const profiles = res.data.profiles
            // filter an array of profiles not the same type as the user
            return profiles.filter(profile => profile.type !== type)
          })
          // set profiles to profiles state
          .then(profiles => setProfiles(profiles))
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
      })
      // if user profile isn't found throw an error
      .catch(error => {
        msgAlert({
          heading: 'Profile Error: ' + error.message,
          message: messages.profileDeleted,
          variant: 'danger'
        })
      })
  }, [type])

  // skip profile function
  const skipProfile = event => {
    // prevent default refresh page
    event.preventDefault()
    // if skipCounter is equal to the last index (length of the profiles array - 1) reset the counter
    if (skipCounter === (profiles.length - 1)) {
      setSkipCounter(0)
    } else {
      // increase skip counter
      setSkipCounter(skipCounter + 1)
    }
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
              <Card.Link href="#" onClick={skipProfile}>Skip</Card.Link>
              <Card.Link href="#">Match</Card.Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Loading...</h3>
      </div>
    </div>
  )
}

export default Profiles
