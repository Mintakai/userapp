import { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Main from './pages/Main';
import Register from './pages/Register';
import Login from './pages/Login';
import Admin from './pages/Admin';

import './style/App.css';

const App = () => {

  useEffect(() => {
    console.log(`frontend: App.js loaded`);
  }, []);

  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <p id="mainlink"><Link to="/">[main]</Link></p>
          <p id="loginlink"><Link to="/login">[login]</Link></p>
          <p id="registerlink"><Link to="/register">[register]</Link></p>
          <p id="adminlink"><Link to="/admin">[admin]</Link></p>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;