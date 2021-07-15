
import '../App.css';
import {useState, useEffect} from 'react'
import UserList from './UserList';
import UserForm from './UserForm';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import React  from 'react';

export const mycontext=React.createContext()
function Admin() {
 
  const [users, setUsers] = useState([])
  const [editUser, setEditUser] = useState(null)
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  const [showUser, setShowArticle] = useState(false);
  let is_staff = JSON.parse(sessionStorage?.getItem("is_staff"));
  const [insertUser,setInsertUser] = useState(false);
  
  

  let history = useHistory()

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/users/', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Token ${token['mytoken']}` 
      }
    })
    .then(resp => resp.json())
    .then(resp => setUsers(resp.reverse()))
    .catch(error => console.log(error))

  }, [users.length])

 
  useEffect(() => {
    if(!token['mytoken']) {
        history.push('/')
        //window.location.href = '/'
       
    }
}, [token])

  const editBtn = (user) => {
    setInsertUser(true)
    setEditUser(user)

  }

  const updatedInformation = (user) => {
    const new_user = users.map(myuser => {
      if(myuser.id === user.id) {
        return user;
      }
      else {
        return myuser;
      }
    })

    setUsers(new_user)

  }

  const userForm = () => {
    setInsertUser(true);
    setEditUser({username:'', description:''})

  }


  const insertedInformation = (user) => {
    const new_users = [...users, user]
    setUsers(new_users)

  }


  const deleteBtn = (user) => {
      console.log("adfadadfafda",users)
    const new_users = users.filter(myuser => {
      if(myuser.id === user.id) {
        return false
      }
      return true;
    })

    setUsers(new_users)

  }

  const logoutBtn = () => {
    removeToken(['mytoken'])
    sessionStorage.clear();

  }

  return (
    <div className="App">

      <div className = "row">
      <div className = "col">
    
        <h2>Django And ReactJS Course</h2>
        <br/>
        </div>
        
        {is_staff && <div className = "col">
        <button onClick = {userForm} className = "btn btn-primary">Insert User</button>
        </div>}
        
        <div className = "col">
        <button onClick = {logoutBtn} className = "btn btn-primary">Logout</button>
        </div>

      </div>


       

        {!insertUser && <UserList users = {users} editBtn = {editBtn} deleteBtn = {deleteBtn}/>}
        
        {insertUser && (editUser ? <UserForm user = {editUser} setInsertUser={setInsertUser} updatedInformation = {updatedInformation} insertedInformation = {insertedInformation}/> : null)}

        


      
    </div>
  );
}

export default Admin;


//   useEffect(() => {
//     fetch("http://localhost:8000/api/users/", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token["mytoken"]}`,
//       },
//     })
//       .then((resp) => resp.json())
//       .then((resp) => {
//         setUsers(resp);
//         console.log(resp);
//       })
//       .catch((error) => console.log(error));
//   }, [users.length]);

