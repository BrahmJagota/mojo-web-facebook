import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { LoginAccessProvider } from './context/LoginAccess';
import Home from './pages/Home';
import PageInfo from './pages/PageInfo';
function App() {
  useEffect(()=> {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId      : process.env.REACT_APP_FACEBOOK_DEVELOPER_API_ID,
        cookie     : true,  
        xfbml      : true,  
        version    : 'v20.0' 
      });
    }
  },[])
  return (
    <LoginAccessProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/:pageId' element={<PageInfo />} />
      </Routes>
    </BrowserRouter>
    </LoginAccessProvider>
  );
}

export default App;