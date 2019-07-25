## IH-smartshelf-project3
This project was deployed in Heroku: https://ih-smart-shelf.herokuapp.com/


## Brief Description

Users are able to create and/or join libraries where they can upload their available books to share them with other members. Once the User joins a library, he is able to add new books, leave reviews with ratings and borrow books, that will be displayed in the profile page, together with all the libraries that he is a member of. 

Nearby libraries are displayed in a map, where you can see the available books and ask to join it. It is also possible to send invitation trough e-mail so that anyone can join.

The goal is to help organize and create a book sharing enviroment in, for example, a workplace, commercial stabilisment or even for personal use. Keeping track of how long someone has been with a book and due dates do return it 

This was a project developed in Ironhack Lisbon's web development Bootcamp. It was built by a team of three students: Guilherme Carmona, Natasha Silva e Carla Mendes.

It was built in order to incorporate the learning of module 3 of the curriculum, using the following technologies and tools:

React
Reactstrap + Bootstrap
Node.Js;
Mapbox;
Nodemailer;
MongoDB;
Express.Js;
Google Books API -> Which was used to find books in to create a better user experience for user when adding their books to the database.

This project was made with love, team work and friendship and we are incredibly proud of it.

## Guideline of errors

### Send the write status code

Your backend API sends some status code at every request. By default, it will send `200`, which means `OK`, everything went fine.

If something bad happened, you should a send a different status code:
- **`400` Bad Request**: Something is missing in wrong in the request (eg: missing data).
- **`401` Unauthorized**: For missing or bad authentication.
- **`403` Forbidden**: When the user is authenticated but isn’t authorized to perform the requested operation on the given resource.
- **`404` Not Found**: The resources/route doesn't exist.
- **`409` Conflict**: The request couldn't be completed because of a conflict (eg for signup: email already taken).
- **`500` Internal Server Error**: The server encountered an unexpected condition which prevented it from fulfilling the request.

By sending the write status code, you will catch more easily your error on the client side.

**Example on the server side**
```js
// If the user is not connected for a protected resource, we can send him this
res.status(401).json({ message: "You must be connected" })
```
**Example on the client side**
```js
// Call to api.getSecret()
//   In case of success, state.secret is saved
//   In case of error (status code 4xx or 5xx), state.message contains the message from the error
api.getSecret()
  .then(data => this.setState({ secret: data.secret }))
  .catch(err => this.setState({ message: err.toString() }))
```



<!-- TODO: find a way to check if we are still loggedIn when we load the application -->
