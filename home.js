import { onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

import { collection, addDoc ,  getDocs , doc, deleteDoc , updateDoc,Timestamp, query, where , orderBy, } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 
import { db } from "./config.js";

const todoForm = document.querySelector('.form-todo')
const todoInput = document.querySelector('.todo-input')
const ul = document.querySelector('ul')
const select = document.querySelector('#select')
const citiesBtn = document.querySelectorAll('.cities-btn')
const reset = document.querySelector(".reset");



// global arr 


let arr = []


citiesBtn.forEach((btn)=>{
  btn.addEventListener('click', async (e)=>{
    arr = []
    const todoRef = collection(db, "todos");
    const q = query(
      todoRef,
      where("categories", "==", e.target.innerHTML),orderBy("time", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });

    
    rendersTodo()
  })
})


reset.addEventListener("click", getData);

// data get krne k lie 

async function getData(){
  
  arr = []
  const q = query(collection(db, "todos"), orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
   console.log(doc.data());
   
   arr.push({...doc.data() , id:doc.id})
   
   
   
});

rendersTodo()

}
getData()

// screen pr data render krne ky liye 


function rendersTodo(){
  if (arr.length === 0) {
    ul.innerHTML = "no data found";
    return;
  }
  ul.innerHTML = ""
  arr.map((item) => {
    ul.innerHTML += `
    <li>${item.todo}, categories : ${item.categories}</li>
    <p>${item.time ? item.time.toDate() : "no time"}</p>
    <button class="delete-Btn">Delete</button>
    <button class="edit-Btn">Edit</button>
    `
  })

  renderDeleteAndEdit()

}

function renderDeleteAndEdit(){

  const deleteBtn = document.querySelectorAll('.delete-Btn')
  const editItem = document.querySelectorAll('.edit-Btn')


  // data delete screen and firestore 


  deleteBtn.forEach((btn,index)=>{
    btn.addEventListener('click' , async ()=>{
      await deleteDoc(doc(db, "todos", arr[index].id));
      arr.splice(index,1)
      rendersTodo()
    })
    
  })


// data edit screen and firestore


  editItem.forEach((btn,index)=>{

    btn.addEventListener('click', async ()=>{

      const newValue = prompt('enter new value')
      const cityRef = doc(db, 'todos', arr[index].id);
      await updateDoc(cityRef, {
        todo: newValue
    });
    if(newValue === '' || newValue === null){
      alert('Please enter value')
      return;
    }
    arr[index].todo = newValue
    rendersTodo()
    })
  })
}



// taken form value 

todoForm.addEventListener('submit' , async (e)=>{
  e.preventDefault();
 
  if(todoInput === ''){
    alert('Please enter a valid todo')
    return;
  }
 

  try {
    const docRef = await addDoc(collection(db, "todos"), {
      todo : todoInput.value,
      categories : select.value,
      time: Timestamp.fromDate(new Date()),
    });
    
    console.log("Document written with ID: ", docRef.id);
    arr.push({
      todo : todoInput.value,
      categories : select.value,
      id : docRef.id
    })
    rendersTodo()
    todoInput.value = "";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
   
})


// bina sign up or login kary baghair dosri side pr jane sy rokta ha 

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
        window.location = 'index.html'
    }
  });


  // logout krne ky liye use ho raha ha


  const logoutBtn = document.querySelector('.logout')

  logoutBtn.addEventListener('click' , ()=>{
    signOut(auth).then(() => {
      alert('logout successfully')
      window.location = 'index.html'
    }).catch((error) => {
      console.log(error);
    });
  })