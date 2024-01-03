import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import user from '../img/user.png';
import logout from '../img/logout.png';
import logo from '../img/logo.png';
const Nav = () => {
    const Navigate = useNavigate()
    const auth = localStorage.getItem('user')
    const logoutbtn = () => {
        localStorage.clear('user')
        Navigate('/signup')
    }
    return (
        <div className="main">
            {
                (auth) ?
                    <ul className="nav-ul">
                        <li>
                            <img className="logo" src={logo}/>
                            <li><Link to='/'>Products</Link></li>
                            <li><Link to='/add-product'>Add Product</Link></li>
                            <li><Link to='/profile'>Profile</Link></li>
                        </li>
                        <span>
                            <li><Link onClick={logoutbtn} to="/login"><img className="logo" src={logout}></img> </Link></li>
                             <span>
                             <img src={user}></img> {JSON.parse(auth).name}
                             </span>
                        </span>
                    </ul>
                    : <ul className="nav-ul-login"  style={{textAlign:"right"}}>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup'>Signup</Link></li>
                    </ul>
            }
        </div>
    );
}

export default Nav;