import { onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

import { collection, addDoc ,  getDocs , doc, deleteDoc , updateDoc, } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 
import { db } from "./config.js";

const todoForm = document.querySelector('.form-todo')
const todoInput = document.querySelector('.todo-input')
const ul = document.querySelector('ul')

let arr = []

async function getData(){
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach((doc) => {
  console.log(doc.data());
  arr.push({...doc.data() , id :doc.id})
});
    rendersTodo()
}
getData()

function rendersTodo(){
  ul.innerHTML = ""
  arr.map((item) => {
    ul.innerHTML += `
    <li>${item.todo}</li>
    <button class="delete-Btn">Delete</button>
    <button class="edit-Btn">Edit</button>
    `
  })
  const deleteBtn = document.querySelectorAll('.delete-Btn')
const editItem = document.querySelectorAll('.edit-Btn')

deleteBtn.forEach((btn ,index)=>{
  btn.addEventListener('click' , async ()=>{
    await deleteDoc(doc(db, "todos", arr[index].id));
    arr.splice(index,1)
    rendersTodo()
  })
})


editItem.forEach((btn, index) => {
  btn.addEventListener("click", async () => {
    const updatedNewValue = prompt("enter new value");
    const todoUpdate = doc(db, "todos", arr[index].id);
    await updateDoc(todoUpdate, {
      todo: updatedNewValue,
    });
    console.log("Data updated");
    arr[index].todo = updatedNewValue;
    rendersTodo()
  });
});

}






todoForm.addEventListener('submit' , async (e)=>{
  e.preventDefault();
 

  if(todoInput === ''){
    alert('Please enter a valid todo')
    return;
  }
 







  try {
    const docRef = await addDoc(collection(db, "todos"), {
      todo : todoInput.value,
    });
    
    console.log("Document written with ID: ", docRef.id);
    arr.push({
      todo : todoInput.value,
      id : docRef.id
    })
    rendersTodo()
    todoInput.value = "";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
   
})



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
      alert('logout successfully')
      window.location = 'index.html'
    }).catch((error) => {
      console.log(error);
    });
  })