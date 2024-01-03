import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Product() {
    const [Data, setData] = useState([]);
    const [Image, setImage] = useState([]);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);
    var requestOptions = {
        headers: myHeaders
      };
    var searchoptions = {
        method: "GET",
        headers: myHeaders
      };

    const getproduct = async () => {
        let api = await fetch("http://localhost:5000/getproduct", requestOptions)
            .then(response => response.json())
            .then(result => { setData(result) })
        // .catch(error => console.log('error', error));
    }
    useEffect(() => {
        getproduct()
    }, [])
    // delete api
    const deleteproduct = async (id) => {
        var delmethod = {
            method: 'DELETE',
            headers: myHeaders
        };

        let api = await fetch(`http://localhost:5000/product/${id}`, delmethod)
        api = await api.json()
        if (api) {
            alert('product is deleted')
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            alert('something went wrong, cant delete product')
        }
        console.log(id)
    }

    const searchproduct = async (e) => {
        let key = e.target.value;
        if (key) {
            let api = await fetch(`http://localhost:5000/search/${key}`, searchoptions)
                .then(response => response.json())
                .then(result => { console.log(result); setData(result) })
                .catch(error => console.log('error', error));
        } else {
            getproduct()
        }
    }




    return (
        <div className='maincont'>
            <input type="text" placeholder='search' onChange={searchproduct} />
            {
                <table className='productlist'>
                    <tbody>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Images</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Color</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {Data.map((e, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div>
                                        {e.image.map((m, idx) => (
                                            <img key={idx} width={100} height={100} src={`http://localhost:5000/useruploads/${m.filename}`} alt="alt" />
                                        ))}
                                    </div>
                                </td>
                                <td>{e.name}</td>
                                <td>{e.Brand}</td>
                                <td>
                                    <div>
                                        {
                                            e.Color.map((c, idx) => (
                                                // <p key={idx}>{c}</p>
                                                <span style={{ backgroundColor: c.Color, borderRadius: "5px", width: "20px", height: "20px" }}>

                                                </span>
                                            ))
                                        }
                                    </div>
                                </td>
                                <td>
                                <div>
                                    {
                                    e.price.map((p, idx) => (
                                            <p key={idx}>
                                                {
                                                    p.price
                                                }
                                            </p>
                                    ))
                                }
                                </div>
                                </td>
                                <td className='productbtn'>
                                    <button onClick={() => deleteproduct(e._id)}>Delete</button>
                                    <Link to={`/update/${e._id}`}>Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            }
        </div >
    )
}
