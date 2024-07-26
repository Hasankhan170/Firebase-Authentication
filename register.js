import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const form = document.querySelector('#loginForm')
const email = document.querySelector('#email')
const password = document.querySelector('#password')

form.addEventListener('submit' ,(e)=>{
    e.preventDefault();


    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);

    email.value = "";
    password.value = "";

    // window.location = 'index.html'

    form.reset()
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });

})