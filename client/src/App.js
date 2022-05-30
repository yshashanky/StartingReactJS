import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registartion';
import Login from './pages/Login';

function App() {

  return (
    <div className="App">
      <Router>
      <div className="navbar">
          <Link to="/"> Home Page</Link>
          <Link to="/createpost"> Create A Post</Link>
          {!localStorage.getItem("accessToken") && (
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
    </div>
  );
}

export default App;