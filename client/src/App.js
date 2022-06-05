import './App.css';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registartion';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import PageNotFound from './pages/PageNotFound';
import { AuthContext } from './helpers/AuthContext'
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {

  let navigate = useNavigate();

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
    navigate('/');
    setAuthState({
      username: "",
      id: 0,
      loggedin: false,
    });
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      {/* <Router> */}
      <div className="navbar">
        <div className='links'>
        <Link to="/"> Home Page</Link>
          {!authState.loggedin ? (
            <>
              <Link to="/login"> Login </Link>
              <Link to="/registration"> Registration </Link>
            </>
          ) : (
            <>
              <Link to="/createpost"> Create A Post</Link>
              
            </>
          )}
        </div>
        <div className='loggedInContainer'>
        { authState.loggedin &&
        (<>
          <h1 onClick={() => {navigate(`/profile/${authState.id}`)}}> {authState.username} </h1>
          <button onClick={logout} to="/"> Logout </button>
        </>)}
        </div>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createpost" element={<CreatePost/>} />
          <Route path='/post/byId/:id' element={<Post/>} />
          <Route path="/registration" element={<Registration/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/profile/:id' element={<Profile/>} />
          <Route path='/changePassword' element={<ChangePassword/>} />
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
      {/* </Router> */}
      </AuthContext.Provider>
    </div>
  );
}

export default App;