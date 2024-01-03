import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Addproduct from './components/Addproduct.jsx';
import Product from './components/Product.jsx';
import Updateproduct from './components/Updateproduct.jsx';
import Profile from './components/Profile.jsx';
import './App.css';
import Privatecomponent from './components/Privatecomponent.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<Privatecomponent />}>
            <Route path='/' element={<Product />} />
            <Route path='/add-product' element={<Addproduct />} />
            <Route path='/update/:id' element={<Updateproduct />} />
            <Route path='/logout' element={<h1>Logout Page</h1>} />
            <Route path='/profile' element={<Profile/>} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
