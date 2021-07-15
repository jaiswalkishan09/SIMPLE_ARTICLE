
import './App.css';
import {useState, useEffect} from 'react'
import ArticleList from './components/ArticleList';
// import Admin from './components/Admin';
import Form from './components/Form';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import React  from 'react';

export const mycontext=React.createContext()
function App() {
  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticle] = useState(null)
  //eslint-disable-next-line 
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  let is_staff = JSON.parse(sessionStorage?.getItem("is_staff"));
  const [insertArticle,setInsertArticle] = useState(false);
  
  

  let history = useHistory()

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles/', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Token ${token['mytoken']}` 
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp.reverse()))
    .catch(error => console.log(error))

  }, [articles.length,token])

 
  useEffect(() => {
    if(!token['mytoken']) {
        history.push('/')
        
       
    }
}, [token,history])

  const editBtn = (article) => {
    setInsertArticle(true)
    setEditArticle(article)

  }

  const updatedInformation = (article) => {
    const new_article = articles.map(myarticle => {
      if(myarticle.id === article.id) {
        return article;
      }
      else {
        return myarticle;
      }
    })

    setArticles(new_article)

  }

  const articleForm = () => {
    setInsertArticle(true);
    setEditArticle({title:'', description:''})

  }

  const handleUsers = () =>{ 
    history.push("/users");
  }

  const insertedInformation = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)

  }


  const deleteBtn = (article) => {
    const new_articles = articles.filter(myarticle => {
      if(myarticle.id === article.id) {
        return false
      }
      return true;
    })

    setArticles(new_articles)

  }

  const logoutBtn = () => {
    removeToken(['mytoken'])
    sessionStorage.clear();

  }

  return (
    <div className="App">

      <div className = "row">
      <div className = "col">
    
        <h2>Article</h2>
        <br/>
        </div>
        
        {is_staff && <div className = "col">
        <button onClick = {articleForm} className = "btn btn-primary">Insert Article</button>
        </div>}
        
        {is_staff && <div className = "col">
        <button onClick = {handleUsers} className = "btn btn-primary">Users</button>
        </div>}
        
        <div className = "col">
        <button onClick = {logoutBtn} className = "btn btn-primary">Logout</button>
        </div>

      </div>


       

        {!insertArticle && <ArticleList articles = {articles} editBtn = {editBtn} deleteBtn = {deleteBtn}/>}
        
        {insertArticle && (editArticle ? <Form article = {editArticle} setInsertArticle={setInsertArticle} updatedInformation = {updatedInformation} insertedInformation = {insertedInformation}/> : null)}

        


      
    </div>
  );
}

export default App;
