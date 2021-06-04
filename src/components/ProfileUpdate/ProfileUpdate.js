// // import React
// import React, { useEffect } from 'react'
//
// // import form and button from react bootstrap
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
//
// const ProfileEdit = props => {
//   useEffect(() => {
//     // make axios call
//     userProfile(user)
//       .then(res => {
//         setProfile({
//           title: res.data.profile.title,
//           type: res.data.profile.type,
//           text: res.data.profile.text,
//           id: res.data.profile._id
//         })
//       })
//       .catch(error => {
//         setProfile({ title: '', type: '', text: '', id: '' })
//         msgAlert({
//           heading: 'Update Redirect Fail: ' + error.message,
//           message: messages.updateLinkFail,
//           variant: 'danger'
//         })
//       })
//   })
//
//   // handleChange
//   const handleChange = event => {
//     // event persist
//     event.persist()
//   }
//
//   // handleSubmit
//   const handleSubmit = event => {
//     // event preventDefault
//     event.preventDefault()
//     console.log(props)
//   }
//
//   return (
//     <div className="row">
//       <div className="col-sm-10 col-md-8 mx-auto mt-5">
//         <h3>Update Profile</h3>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="type">
//             <Form.Label>Type</Form.Label>
//             <Form.Check
//               required
//               type="radio"
//               // true set for API band set to true
//               value="band"
//               name="type"
//               label="Band"
//               onChange={handleChange}
//             />
//             <Form.Check
//               required
//               type="radio"
//               // false set for API band set to false
//               value="planner"
//               name="type"
//               label="Event Planner"
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="name">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               value={5}
//               name="title"
//               placeholder="Enter name"
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="description">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               as="textarea"
//               value={5}
//               name="text"
//               placeholder="Enter description"
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Button
//             variant="primary"
//             type="submit"
//           >
//             Submit
//           </Button>
//         </Form>
//       </div>
//     </div>
//   )
// }
//
// export default ProfileEdit
//
// // import React, { useState, useEffect } from 'react'
// // import { Redirect } from 'react-router-dom'
// // import axios from 'axios'
// //
// // import apiUrl from '../../apiConfig'
// // import BookForm from '../shared/BookForm'
// // import Layout from '../shared/Layout'
// //
// // const BookEdit = props => {
// //   const [book, setBook] = useState({ title: '', author: '' })
// //   const [updated, setUpdated] = useState(false)
// //
// //   useEffect(() => {
// //     axios(`${apiUrl}/books/${props.match.params.id}`)
// //       .then(res => setBook(res.data.book))
// //       .catch(console.error)
// //   }, [])
// //
// //   const handleChange = event => {
// //     event.persist()
// //
// //     setBook(prevBook => {
// //       const updatedField = { [event.target.name]: event.target.value }
// //
// //       const bookToUpdate = Object.assign({}, prevBook, updatedField)
// //
// //       return bookToUpdate
// //     })
// //   }
// //
// //   const handleSubmit = event => {
// //     event.preventDefault()
// //
// //     axios({
// //       url: `${apiUrl}/books/${props.match.params.id}`,
// //       method: 'PATCH',
// //       data: { book }
// //     })
// //       .then(() => setUpdated(true))
// //       .catch(console.error)
// //   }
// //
// //   if (updated) {
// //     return <Redirect to={`/books/${props.match.params.id}`} />
// //   }
// //
// //   return (
// //     <Layout>
// //       <BookForm
// //         book={book}
// //         handleChange={handleChange}
// //         handleSubmit={handleSubmit}
// //         cancelPath={`/books/${props.match.params.id}`}
// //       />
// //     </Layout>
// //   )
// // }
// //
// // export default BookEdit
