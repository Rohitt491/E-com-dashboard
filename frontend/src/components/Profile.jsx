import React, { useState, useEffect } from 'react';

export default function Profile() {
    const [curData, setcurData] = useState('');
    const [Data, setData] = useState([]);
    const [Showpassword, setShowpassword] = useState(false);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);
        fetch("http://localhost:5000/profiledetails", { headers: myHeaders })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => setData(result))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    useEffect(() => {
        setcurData(JSON.parse(localStorage.getItem('user')))
    }, [])
    const filteredData = Data.filter(user => user._id == curData._id);
    const maskPassword = (password) => {
        return password.replace(/./g, '*');
    };
    function passwordvisible() {
        setShowpassword(!Showpassword);
    }

   
    return (
        <div>
            {
                filteredData.map((e, index) => (
                    <div>
                        <p>Name: {e.name}</p>
                        <p>Email: {e.email}</p>
                        <p>
                            Password:
                            {Showpassword ? e.password : maskPassword(e.password)}
                            <button style={{backgroundColor:"transparent", border:'none', outline:'none'}} onClick={passwordvisible}>
                                {Showpassword ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>}
                            </button>
                        </p>
                    </div>
                ))
            }
        </div>
    );
}
