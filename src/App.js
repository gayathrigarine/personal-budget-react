import './App.css';
import React from 'react';
import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';


// import { Routes, Route } from 'react-router-dom'; new version
// import { Switch, Route } from 'react-router-dom'; old version
function App() {
  return (
    <Router className="App">
     <Menu></Menu>
     <Hero></Hero>
     <div className='mainContainer'>

<Routes>    
        <Route path='/'
        element={<HomePage />}>
        </Route>
        <Route path='/about'
        element={<AboutPage />}>
        </Route>
    
        <Route path='/Login'
        element={<LoginPage />}>
        </Route>
        </Routes>  
     </div>
     <Footer></Footer>
    </Router>
  );
}

export default App;
