import { onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

import { collection, addDoc ,  getDocs , doc, deleteDoc , updateDoc,Timestamp, query, where , orderBy, } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 
import { db } from "./config.js";

const todoForm = document.querySelector('.form-todo')
const todoInput = document.querySelector('.todo-input')
const ul = document.querySelector('ul')
const select = document.querySelector('#select')
const reset = document.querySelector('.allCate')


const cateBtn = document.querySelectorAll('.caties-Btn')



// global arr 


let arr = []


cateBtn.forEach((btn)=>{
  btn.addEventListener('click', async (e)=>{
    arr = []
    const category = e.target.innerHTML
    

   try {
    const citiesRef = collection(db, "todos"); 
    const q = query(citiesRef, where("categories", "==", category),
    orderBy("time", "desc")
  );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push({...doc.data() , id:doc.id})
    });
    
    rendersTodo()
   } catch (error) {
    console.error("Error getting documents: ", error);
    
   }
    
  })
})


reset.addEventListener("click", getData);

// data get krne k lie 

async function getData(){
  arr = []
  const q =  query(collection(db, "todos"),orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  console.log(doc.data());
  arr.push({...doc.data() , id :doc.id})
});
    
    rendersTodo()
}

getData()

// screen pr data render krne ky liye 


function rendersTodo(){
  ul.innerHTML = ""
  arr.map((item) => {
    ul.innerHTML += `
    <li>${item.todo}, categories : ${item.categories}</li>
    <p>${item.time ? item.time.toDate() : "no time"}</p>
    <button class="delete-Btn">Delete</button>
    <button class="edit-Btn">Edit</button>
    `
  })

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