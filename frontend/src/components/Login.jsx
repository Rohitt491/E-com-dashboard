
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login-page.css'

function Login() {
    const [Mail, Setmail] = useState('');
    const [Pass, Setpass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    useEffect(() =>{
        const auth= localStorage.getItem('user')
        if(auth)
        {
            navigate('/')
        } 
    }) 
    const handlelogin = async (e) => {
        e.preventDefault();

        var requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email": Mail,
                "password": Pass
            })
        };
        let api = await fetch("http://localhost:5000/login", requestOptions)
        // .then(response => response.json())
        // .then(result => {Setresult(result[0].name)})
        // .catch(error => console.log('error', error));

        api = await api.json();
        console.log(api)
        if (api.auth) {
            localStorage.setItem('user', JSON.stringify(api.users))
            localStorage.setItem('token', JSON.stringify(api.auth))
            navigate('/')
        } else {
            alert('incorrect')
        }
    }
    return (
        <div className="container-logreg">
            <div className="wrapper">
                <div className="title"><span>Login Form</span></div>
                <form >
                    <div className="row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                        <input type="email" placeholder="Email" value={Mail} onChange={(e) => Setmail(e.target.value)}></input>
                    </div>
                    <div className="row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        <input type="password" placeholder="Password" value={Pass} onChange={(e) => Setpass(e.target.value)}></input>
                    </div>
                    <div className="row button">
                        <input onClick={handlelogin} type="submit" value="Login"></input>
                    </div>
                    <div className="signup-link">Not Registered? <Link to="/signup">Signup now</Link></div>
                </form>
            </div>
        </div>
    );
}

export default Login