import { onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseconfig.js";



onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
        window.location = 'index.html'
    }
  });


  const logoutBtn = document.querySelector('.logout')

  logoutBtn.addEventListener('click' , ()=>{
    signOut(auth).then(() => {
      window.location = 'index.html'
    }).catch((error) => {
      console.log(error);
    });
  })