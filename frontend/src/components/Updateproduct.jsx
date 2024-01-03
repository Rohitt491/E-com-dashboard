import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export default function Updateproduct() {
  const [Name, Setname] = useState("");
  const [Brand, Setbrand] = useState("");
  const [Color, Setcolor] = useState("");
  const [Price, Setprice] = useState("");
  const [Image, Setimage] = useState("");
  const [Error, setError] = useState(false);
  // it is use to get the id from url 
  const params = useParams()

  const update = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };

    let api = await fetch(`http://localhost:5000/updateproduct/${params.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        Setname(result.name);
        Setbrand(result.Brand);
        const colorNames = result.Color.map(obj => obj.Color);
        const colorsString = colorNames.join(', ');
        Setcolor(colorsString);
        const priceNames = result.price.map(obj => obj.price);
        const priceString = priceNames.join(', ');
        Setprice(priceString);
    })
      .catch(error => console.log('error', error));
  }


  useEffect(() => {
    update()
  }, [])

  const Updateproduct = (e) => {
    e.preventDefault();
    console.log(Name, Brand, Color, Price, Image)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);
    myHeaders.append("Content-Type", "application/json");
    const colorsArray = Color.split(',').map(Color => Color.trim());
    const colorObjects = colorsArray.map(Color => ({ Color }));
    const priceArray = Price.split(',').map(price => price.trim());
    const priceObjects = priceArray.map(price => ({ price }));
    var raw = JSON.stringify({
        "name": Name,
        "Brand": Brand,
        "Color": colorObjects,
        "price": priceObjects
    });
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    if (!Name || !Price || !Brand || !Color) {
      setError(true)
      return false
    }
    let api = fetch(`http://localhost:5000/updateproduct/${params.id}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    // if (api) {
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1000);
    // } else {
    //   alert("Something went wrong")
    // }
  }

  return (
    <div>
      <form onSubmit={Updateproduct} className='addproduct' >
        <input value={Name} onChange={(e) => Setname(e.target.value)} type="text" placeholder='enter product name' />
        {Error && !Name && <span className='invalid-input'>Enter correct Name</span>}
        <input value={Brand} onChange={(e) => Setbrand(e.target.value)} type="text" placeholder='enter product brand' />
        {Error && !Brand && <span className='invalid-input'>Enter correct Brand</span>}
        <input value={Color} onChange={(e) => Setcolor(e.target.value)} type="text" placeholder='enter product color' />
        {Error && !Color && <span className='invalid-input'>Enter correct Color</span>}
        <input value={Price} onChange={(e) => Setprice(e.target.value)} type="text" name='image' placeholder='enter product price' />
        {Error && !Price && <span className='invalid-input'>Enter correct Price</span>}
        {/* <input onChange={(e) => Setimage(e.target.files[0])} type="file" placeholder='upload your product images' /> */}
        <input multiple name='image' onChange={(e) => Setimage(e.target.files)} type="file" placeholder='upload your product images' />
        {Error && !Image && <span className='invalid-input'>Enter correct images</span>}
        <button type='submit' >update Product</button>
      </form>

    </div>
  )
}
