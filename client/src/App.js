import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registartion';
import Login from './pages/Login';
import { AuthContext } from './helpers/AuthContext'
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    loggedin: false,
  });

  useEffect (() => {
    axios.get('http://localhost:3001/auth/verify', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
    .then((response) => {
      if(response.data.error) {
        setAuthState({...authState, loggedin: false});
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          loggedin: true,
        });
      }
    })
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      loggedin: false,
    });
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
      <div className="navbar">
          <Link to="/"> Home Page</Link>
          <Link to="/createpost"> Create A Post</Link>
          {!authState.loggedin ? (
            <>
              <Link to="/login"> Login </Link>
              <Link to="/registration"> Registration </Link>
            </>
          ) : (
            <>
              <Link onClick={logout} to="/"> Logout </Link>
              <h1> {authState.username} </h1>
            </>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createpost" element={<CreatePost/>} />
          <Route path='/post/byId/:id' element={<Post/>} />
          <Route path="/registration" element={<Registration/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;