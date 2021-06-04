// import React and useState from `react`
import React, { useState } from 'react'
// import createProfile axios call
import { createProfile } from '../../api/profiles'

// import bootstrap form and button
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import InputGroup from 'react-bootstrap/InputGroup'

// define function component ProfileCreate
const ProfileCreate = props => {
  const [profile, setProfile] = useState({ type: '', title: '', text: '' })

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
    console.log(profile)

    // deconstruct props
    const { user } = props

    // create profile axios call
    createProfile(profile, user)
      .then(() => console.log('suc'))
      .catch(() => console.log('fail'))
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
