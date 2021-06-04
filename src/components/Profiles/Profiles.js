// import react
import React, { useState, useEffect } from 'react'
import { userProfile } from '../../api/profiles'

// define Profiles function component
const Profiles = props => {
  const [type, setType] = useState(null)
  // const [profiles, setProfiles] = useState([])

  // deconstruct user from props
  const { user } = props

  // useEffect to set profile type state ***only on first render***
  useEffect(() => {
    userProfile(user)
      .then(res => {
        console.log(res)
        setType(res.data.profile.type)
      })
      .catch(() => console.log('fail'))
  }, [])
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Profiles</h3>
        <p>{type}</p>
      </div>
    </div>
  )
}

export default Profiles
// export Profiles function component

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
