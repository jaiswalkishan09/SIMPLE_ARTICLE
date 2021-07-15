export default class APIUserService {
    static UpdateUser(user_id, body, token) {
      return fetch(`http://127.0.0.1:8000/api/users/${user_id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(body),
      }).then((resp) => resp.json());
    }
  
    static InsertUser(body, token) {
      return fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(body),
      }).then((resp) => resp.json());
    }
  
    static DeleteUser(user_id, token) {
      return fetch(`http://127.0.0.1:8000/api/users/${user_id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
    }
  
    
  
    static RegisterUser(body) {
      return fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((resp) => {
        if (resp.status === 201) {
          return resp.json();
        } else {
          
          alert("Username Already Exits if you Have account please Login");
        }
      });
    }
  }
  