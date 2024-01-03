import React, { useState } from "react";
import { Dropzone, FileMosaic, FullScreen, ImagePreview } from "@files-ui/react";

export default function Addproduct() {

  const [extFiles, setExtFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const [Name, Setname] = useState("");
  const [Brand, Setbrand] = useState("");
  const [Color, Setcolor] = useState("");
  const [Price, Setprice] = useState("");
  const [Image, Setimage] = useState([]);
  const [Error, setError] = useState(false);
  const updateFiles = (incommingFiles) => {
    // console.log("incomming files", incommingFiles);
    setExtFiles(incommingFiles);
    Setimage(incommingFiles.map(file => file.file));
  };
  console.log(Image)
  const addproduct = async(e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);
    
    // myHeaders.append({"Content-Type": "multipart/form-data"});

    var formdata = new FormData();
    
    for (let index = 0; index < Image.length; index++) {
      const file = Image[index];
      formdata.append('image', file);
      console.log(file, "ghbjn");
    }
    formdata.append("name", Name);
    formdata.append("Color", Color);
    formdata.append("price", Price);
    formdata.append("Brand", Brand);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    if (!Name || !Price || !Brand || !Color || !Image) {
      setError(true)
      return false
    }
    let api = await fetch("http://localhost:5000/add-product", requestOptions)
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




  const onDelete = (id) => {
    setExtFiles(extFiles.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  const handleStart = (filesToUpload) => {
    console.log("advanced demo start upload", filesToUpload);
  };
  const handleFinish = (uploadedFiles) => {
    console.log("advanced demo finish upload", uploadedFiles);
  };
  const handleAbort = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: "aborted" };
        } else return { ...ef };
      })
    );
  };
  const handleCancel = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined };
        } else return { ...ef };
      })
    );
  };

  return (
    <div>
      <form onSubmit={addproduct} className='addproduct' >
        <input value={Name} onChange={(e) => Setname(e.target.value)} type="text" placeholder='enter product name' />
        {Error && !Name && <span className='invalid-input'>Enter correct Name</span>}
        <input value={Brand} onChange={(e) => Setbrand(e.target.value)} type="text" placeholder='enter product brand' />
        {Error && !Brand && <span className='invalid-input'>Enter correct Brand</span>}
        <input value={Color} onChange={(e) => Setcolor(e.target.value)} type="text" placeholder='enter product color' />
        {Error && !Color && <span className='invalid-input'>Enter correct Color</span>}
        <input value={Price} onChange={(e) => Setprice(e.target.value)} type="text" name='image' placeholder='enter product price' />
        {Error && !Price && <span className='invalid-input'>Enter correct Price</span>}
        {/* <input onChange={(e) => Setimage(e.target.files[0])} type="file" placeholder='upload your product images' /> */}
        {/* <div className='input-img-div' onClick={() => document.getElementById("fileInput").click()}>
          <span>upload your images</span>
          <input id="fileInput" multiple name='image' className='input-field' onChange={(e) => Setimage(e.target.files)} type="file" placeholder='upload your product images' style={{ display: 'none' }} />
        </div> */}
        <Dropzone style={{ width: "370px", height: "20px", fontSize: "10px" }}
          onChange={updateFiles}
          minHeight="195px"
          value={extFiles}
          accept="image/*"
          maxFiles={5}
          maxFileSize={2 * 1024 * 1024}
          label="Drag'n drop files here or click to browse"
          onUploadStart={handleStart}
          onUploadFinish={handleFinish}
          fakeUpload
          actionButtons={{
            position: "after",
            abortButton: {}
          }}
        >
          {extFiles.map((file) => (
            <FileMosaic
              {...file}
              key={file.id}
              onDelete={onDelete}
              onSee={handleSee}
              onAbort={handleAbort}
              onCancel={handleCancel}
              resultOnTooltip
              alwaysActive
              preview
              info
            />
          ))}
        </Dropzone>
        <FullScreen
          open={imageSrc !== undefined}
          onClose={() => setImageSrc(undefined)}
        >
          <ImagePreview src={imageSrc} />
        </FullScreen>

        {Error && !Image && <span className='invalid-input'>Enter correct images</span>}
        <button type='submit' >Add Product</button>
      </form >
    </div >
  );
}