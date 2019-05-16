import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,
  // Begining of AUTH methods ------------ DONT CHANGE ANYTHING -----------------------
  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post("/login", {
        email,
        password
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem("user");
    return service.get("/logout");
  },
  // End of AUTH methods ------------------------------------------------------

  // This is an example on how to use this method in a different file
  // api.getCountries().then(countries => { /* ... */ })
  // getCountries() {
  //   return service
  //     .get('/countries')
  //     .then(res => res.data)
  //     .catch(errHandler)
  // },


// --------------------  Library methods -------------------------

getLibrary(libraryId) {
  return service
  .get(`/libraries/${libraryId}`)
  .then(response => response.data)
  .catch(errHandler)
},

updateLibrary(libraryId, body) {
  return service
  .put(`/libraries/${libraryId}`, body)
  .then(response => response.data)
  .catch(errHandler)
},

deleteLibrary(libraryId) {
  return service
  .delete(`/libraries/${libraryId}`)
  .then(response => response.data)
  .catch(errHandler)
},

createLibrary(body) {
  return service
  .post("/libraries", body)
  .then(res => res.data)
  .catch(errHandler)
  },

  // getLibraries() {
  //   return service
  //     .get('/libraries')
  //     .then(res => res.data)
  //     .catch(errHandler)
  // },

// -------------------- End of Library methods -------------------------

// --------------------  START OF PROFILE METHODS -------------------------

showProfile() {
  return service
  .get("/profile")
  .then(response => response.data)
  .catch(errHandler)
},

editProfile(body) {
  return service
  .put("/profile", body)
  .then(response => response.data)
  .catch(errHandler)
},



// --------------------  END OF PROFILE METHODS -------------------------

  // -------------------- START OF BOOK METHODS -------------------------

  getBook(bookId) {
    return service
      .get(`/books/${bookId}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  updateBook(bookId, body) {
    return service
      .put(`/books/${bookId}`, body)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteBook(bookId) {
    return service
      .delete(`/books/${bookId}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  addBook(body) {
    return service
      .post(`/books`, body)
      .then(res => res.data)
      .catch(errHandler);
  },

  addBookWithForm(body) {
    return service
      .post(`/form`, body)
      .then(res => res.data)
      .catch(errHandler);
  },

  // -------------------- END OF BOOK METHODS -------------------------
  getMember(id) {
    return service
    .get(`/member/${id}`)
    .then(response => response.data)
    .catch(errHandler)
  },
  createMember(body) {
    return service
    .post(`/member/`, body)
    .then(response => response.data)
    .catch(errHandler)
  },
  deleteMember(id) {
    return service
    .delete(`/member/${id}`)
    .then(response => response.data)
    .catch(errHandler)
  },

  // ------------------- START OF MEMBER METHODS------------------- 

    // ------------------- END OF MEMBER METHODS------------------- 

  // --------------------  START OF PICTURE UPLOAD METHOD --------------------

  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file);
    return service
      .post("/endpoint/to/add/a/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(errHandler);
  }
};
// -------------------- END OF Upload method ----------------------------------
