// import React and useState from `react`
import React, { useState } from 'react'
// import redirect
import { Redirect } from 'react-router-dom'
// import createProfile axios call
import { createProfile } from '../../api/profiles'
// import messaging
import messages from '../AutoDismissAlert/messages'

// import bootstrap form and button
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import InputGroup from 'react-bootstrap/InputGroup'

// define function component ProfileCreate
const ProfileCreate = props => {
  // deconstruct props
  const { user, msgAlert, setUser } = props

  // define hook states
  const [profile, setProfile] = useState({ type: '', title: '', text: '' })
  const [profileCreated, setProfileCreated] = useState(false)

  const handleChange = event => {
    event.persist()

    setProfile(prevProfile => {
      const updatedField = { [event.target.name]: event.target.value }

      const profileToCreate = Object.assign({}, prevProfile, updatedField)

      return profileToCreate
    })
  }

  const handleSubmit = event => {
    // prevent refresh page
    event.preventDefault()

    // create profile axios call
    createProfile(profile, user)
      // set user profileId to change user state
      .then(res => {
        // set user profileId to profile id just created
        user.profileId = res.data.profile._id
        // create temp object\
        const tempObj = { ...user, profileId: res.data.profile._id }
        setUser(tempObj)
      })
      // set state to profile created
      .then(() => setProfileCreated(true))
      // add success messaging
      .then(() => msgAlert({
        heading: 'Profile Created Succesfully',
        message: messages.createProfileSuccess,
        variant: 'success'
      }))
      .catch(error => {
        setProfile({ type: '', title: '', text: '' })
        msgAlert({
          heading: 'Profile Create Error: ' + error.message,
          message: messages.createProfileFailure,
          variant: 'danger'
        })
      })
  }

  if (profileCreated) {
    return <Redirect to="/profile" />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Create Profile</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Check
              required
              type="radio"
              // true set for API band set to true
              value="band"
              name="type"
              label="Band"
              onChange={handleChange}
            />
            <Form.Check
              required
              type="radio"
              // false set for API band set to false
              value="planner"
              name="type"
              label="Event Planner"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={profile.title}
              name="title"
              placeholder="Enter name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type="text"
              as="textarea"
              value={profile.text}
              name="text"
              placeholder="Enter description"
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default ProfileCreate
