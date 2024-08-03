import { signInWithEmailAndPassword ,
         sendPasswordResetEmail ,
         signInWithPopup,
         GoogleAuthProvider,
         GithubAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const form = document.querySelector('#loginForm')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const forgotPassword = document.querySelector('.forgotPassword')
const google = document.querySelector('.google-btn')
const github = document.querySelector('.github-btn')

form.addEventListener('submit' ,(e)=>{
    e.preventDefault();

    if(email.value === '' || password.value === ''){
      alert("email and password are required");
      return;
    }

    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert('login successfully')

       window.location = 'home.html'
      
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });

    


})


// forgotPassword


forgotPassword.addEventListener("click", () => {
  if(email.value === '' || password.value === ''){
    alert("email and password are required");
    return;
  }
  const resetEmail = prompt("enter email");
  sendPasswordResetEmail(auth, resetEmail)
    .then(() => {
      alert("email send");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});


// google authentication 

const provider = new GoogleAuthProvider();

google.addEventListener('click' , ()=>{

  console.log("google login");



  signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    console.log(user);
    alert(' login google successfully')
    setTimeout(()=>{
     window.location = "home.html";
    },2000)
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });


});




// github authentication 

const githubProvider = new GithubAuthProvider();

github.addEventListener('click' , ()=>{

  console.log("github login");

  signInWithPopup(auth, githubProvider)
  .then((result) => {
    const user = result.user;
    console.log(user);
    alert('login github successfully')
    setTimeout(()=>{
      window.location = "home.html";
     },2000)

  }).catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);

  });

});




