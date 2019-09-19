// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "******************************",
  authDomain: "**********************",
  databaseURL: "************************",
  projectId: "adnan-ahmed",
  storageBucket: "**************************",
  messagingSenderId: "*******************",
  appId: "*****************************"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();


window.addEventListener('load', async () => {
  // await getUser()
  await getUser()
})

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    document.getElementById('userLogin').innerHTML = user.email
    // console.log(user)
  } else {
    // No user is signed in.
  }
});





function register() {
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      var userId = firebase.auth().currentUser.uid
      database.ref('users/' + userId).set({
        email: email,
        password: password
      }).then(() => {
        console.log(res)
      })

    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(`Error Message: ${errorMessage}`)
      // ...
    });
}


function login() {
  // var toastHTML = '<span>User Edit SuccessFully</span>';
  // M.toast({ html: toastHTML });
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((e) => {
      var toastHTML = `<span>Login SuccessFully</span>`;
      M.toast({ html: toastHTML })
      // alert('Login SuccessFully')

      setTimeout(function () { location.href = './pages/home.html' }, 1500);
      // location.reload()

    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      var toastHTML = `<span>${errorMessage}</span>`;
      M.toast({ html: toastHTML });
      // alert(`Error Message: ${errorMessage}`)
      // ...
    });
}


function logout() {
  firebase.auth().signOut().then(function () {
    var toastHTML = `<span>Signout SuccessFully</span>`;
    M.toast({ html: toastHTML })
    // alert('Login SuccessFully')

    setTimeout(function () { location.replace('../index.html') }, 1500);
    // alert('signout SuccessFully')
    // location.replace('../index.html')
    // Sign-out successful.
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    var toastHTML = `<span>${errorMessage}</span>`;
    M.toast({ html: toastHTML });
    // alert(`Error Message: ${errorMessage}`)
    // ...
  });
}

function addUser() {
  var toastHTML = '<span>Add User SuccessFully</span>';
  M.toast({ html: toastHTML });
  // <button class="btn-flat toast-action">Undo</button>
  var title = document.getElementById('title').value
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  var userId = firebase.auth().currentUser.uid
  var key = database.ref().child("Data" + key).push().key;
  var obj = {
    title,
    email,
    password,
    createAt: new Date().toLocaleString()

  }
  database.ref("Data").push(
    obj
  ).then((res) => {
    setTimeout(function () { location.reload() }, 1500);

  })

  document.getElementById('title').value = ""
  document.getElementById('email').value = ""
  document.getElementById('password').value = ""
}

var arr = [];
function getUser() {
  var arr = [];
  var renderData = document.getElementById('tab')
  firebase.database().ref('Data')
    .once('value', (data) => {
      let userData = data.val()
      // console.log(userData)

      for (var key in userData) {
        userData[key].keyId = key
        arr.push(userData[key])
        console.log(arr)
        // console.log(userData[key].address)
        // console.log(keyId)
        renderData.innerHTML = ''
        arr.map(e => {
          renderData.innerHTML += `
            <tr style="display: table-row;" id=${e.keyId}>
                  <td>${e.title}</td>
                  <td>${e.email}</td>
                  <td>${e.createAt}</td>
                  <td colspan="3"> 
                  <a class="waves-effect waves-light btn"><i class="material-icons right">error_outline</i></a>
                  <a class="modal-close waves-effect waves-light btn modal-trigger" href="#modal2" id=${e.keyId} onclick="edit(id)" style="margin-left: 10px">
                  <i class="material-icons right">error_outline</i></a>
                  <a class="waves-effect waves-light red btn" onclick="deleteUser(this.parentNode.parentNode.id)" style="margin-left: 10px">
                  <i class="material-icons right">delete</i></a></td>
            </tr>	
          `
        })
      }
    })
}


console.log(arr)

var footer = document.getElementById("footer");
var upBtn = document.createElement("button");
var upText = document.createTextNode("Update");
upBtn.className = "waves-effect waves-light btn"
upBtn.appendChild(upText);
footer.appendChild(upBtn);

// modal-trigger" href="#modal1"
// Edit Ke button pe click hone per jo functionality chale ge 
function edit(eId) {
  upBtn.setAttribute("onclick", "update('" + eId + "')");
  // var title = document.getElementById('title2').value
  // var email = document.getElementById('email2').value
  // var password = document.getElementById('password2').value
  // const itemRef = firebase.database().ref(`/Data/${eId}`)
  // // var el = document.getElementById("foo"); 
  // // console.log(e)
  // itemRef.update({
  //   title,
  //   email, 
  //   password,
  //   createAt: new Date().toLocaleString()
  // })

}
// update Ke button pe click hone per jo functionality chale ge jis se data Update hoga
function update(eId) {
  var toastHTML = '<span>User Edit SuccessFully</span>';
  M.toast({ html: toastHTML });
  var title = document.getElementById('title2').value
  var email = document.getElementById('email2').value
  var password = document.getElementById('password2').value
  const itemRef = firebase.database().ref(`/Data/${eId}`)

  itemRef.update({
    title,
    email,
    password,
    createAt: new Date().toLocaleString()
  })
    .then((res) => {
      setTimeout(function () { location.reload() }, 1500);

    });
}






function deleteUser(e) {
  var toastHTML = '<span>User Remove SuccessFully</span>';
  M.toast({ html: toastHTML });
  const itemRef = firebase.database().ref(`/Data/${e}`);
  itemRef.remove()
    .then((res) => {
      setTimeout(function () { location.reload() }, 1500);
      // location.reload()
    });
  // location.reload()
}

