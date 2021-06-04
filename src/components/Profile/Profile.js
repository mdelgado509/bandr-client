// import REact useState useEffect
import React, { useState, useEffect } from 'react'

// import userProfile axios call
import { userProfile } from '../../api/profiles'
// import messaging
// import messages from '../AutoDismissAlert/messages'

// import Card from react bootstrap
import Card from 'react-bootstrap/Card'

// define function component Profile
const Profile = props => {
  // deconstruct props *** add msgAlert
  const { user } = props

  const [profile, setProfile] = useState({ title: '', type: '', text: '', id: '' })

  useEffect(() => {
    userProfile(user)
      .then(res => {
        setProfile({
          title: res.data.profile.title,
          type: res.data.profile.type,
          text: res.data.profile.text,
          id: res.data.profile._id
        })
      })
      .catch(console.error)
  })

  if (!profile) {
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>You haven&apos;t created a profile yet!</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{profile.title}</Card.Title>
            <Card.Subtitle style={{ textTransform: 'capitalize' }} className="mb-2 text-muted">{profile.type}</Card.Subtitle>
            <Card.Text>
              {profile.text}
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Profile

// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
//
// import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'
//
// const Books = props => {
//   const [books, setBooks] = useState([])
//
//   useEffect(() => {
//     axios(`${apiUrl}/books`)
//       .then(res => setBooks(res.data.books))
//       .catch(console.error)
//   })
//
//   const booksJsx = books.map(book => (
//     <li key={book._id}>
//       <Link to={`/books/${book._id}`}>{book.title}</Link>
//     </li>
//   ))
//
//   return (
//     <Layout>
//       <h4>Books</h4>
//       <ul>
//         {booksJsx}
//       </ul>
//     </Layout>
//   )
// }
//
// export default Books
