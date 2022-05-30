import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registartion';
import Login from './pages/Login';
import { AuthContext } from './helpers/AuthContext'
import { useEffect, useState } from "react";

function App() {

  const [authState, setAuthState] = useState(false);

  useEffect (() => {
    if (localStorage.getItem("accessToken")){
      setAuthState(true)
    }
  })

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
      <div className="navbar">
          <Link to="/"> Home Page</Link>
          <Link to="/createpost"> Create A Post</Link>
          {!authState && (
            <>
              <Link to="/login"> Login </Link>
              <Link to="/registration"> Registration </Link>
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