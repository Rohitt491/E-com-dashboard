import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login-page.css'

const Signup = () => {
    const [User, Setuser] = useState('');
    const [Pass, Setpass] = useState('');
    const [Mail, Setmail] = useState('');
    const Navigate = useNavigate()
    useEffect(() =>{
        const auth= localStorage.getItem('user')
        if(auth)
        {
            Navigate('/')
        } 
    },[]) 
    const collectdata = async (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": User,
            "email": Mail,
            "password": Pass
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let api = await fetch("http://localhost:5000/signup", requestOptions)
            api = await api.json()
          
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify(api.result))
        localStorage.setItem("token", JSON.stringify(api.auth))
        if (api) {
            Navigate('/')
        }
    }
    return (
        <div className="container-logreg">
            <div className="wrapper">
                <div className="title"><span>Registration Form</span></div>
                <form >
                    <div className="row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        <input type="text" placeholder="Username" value={User} onChange={(e) => Setuser(e.target.value)}></input>
                    </div>
                    <div className="row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                        <input type="email" placeholder="Email" value={Mail} onChange={(e) => Setmail(e.target.value)}></input>
                    </div>
                    <div className="row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        <input type="password" placeholder="Password" value={Pass} onChange={(e) => Setpass(e.target.value)}></input>
                    </div>
                    {/* <div className="row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                        <input type="file" placeholder="Profile Picture" required></input>
                    </div> */}
                    <div className="row button">
                        <input onClick={collectdata} type="submit" value="Register"></input>
                        {/* <button onClick={collectdata}>Register</button> */}
                    </div>
                    <div className="signup-link">Already Signed Up? <Link to="/login">Login Now</Link></div>
                </form>
            </div>
        </div>
    );
}
export default Signup;