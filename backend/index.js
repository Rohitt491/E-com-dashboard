const express = require('express');
require('./db/config.js');
const multer = require('multer')
const cors = require('cors')
const user = require('./db/users.js')
const product = require('./db/products.js')
const mongoose = require('mongoose');
const users = require('./db/users.js');
const products = require('./db/products.js');
const token = require('jsonwebtoken');
const jwtkey = 'rohit12';
// const {MongoClient} =require('mongodb');
// const url = "mongodb://127.0.0.1:27017/"
// const client = new MongoClient(url);
// const database = 'E-com';
const app = express();

// const connectdb =async () =>{
//         const url = "mongodb://localhost:27017/E-com"
//         mongoose.connect(url)
//         const productSchema = new mongoose.Schema({});
//         const product = mongoose.model('product', productSchema)
//         const data= await product.find({});
//         console.log(data)
//         let result = await client.connect();
//         let db = result.db(database);
//         let collection = db.collection('products');
//         let response = await collection.find({}).toArray();
//         console.log(response);
// }
// connectdb();
// storage and file name settings

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './useruploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
})

app.use('/useruploads', express.static('useruploads'));

const isImage = (req, res, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('only img is allowed'))
    }
}

const upload = multer({ storage: storage, fileFliter: isImage })



app.use(express.json())
app.use(cors());
app.post('/signup', async (req, res) => {
    let users = new user(req.body);
    let result = await users.save();
    delete result.password;
    token.sign({result},jwtkey,{expiresIn: "2h"}, (err,jwt) =>{
        if(err){
          res.send({ result: 'Authentication failed'})
        }  else{
          res.send({result,auth:jwt})
      }
      }) 
})

app.post('/login', async (req, res) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let users = await user.findOne(req.body).select('-password')
        if (users) {
            token.sign({users},jwtkey,{expiresIn: "2h"}, (err,jwt) =>{
              if(err){
                res.send({ result: 'Authentication failed'})
              }  else{
                res.send({users,auth:jwt})
            }
            }) 
        } else {
            res.send({ result: "User not found" })
        }
    } else {
        res.send({ result: 'user not Found' })
    }
})


app.get('/profiledetails',verifytoken, async (req, res) => {  
    let details = await user.find()
    res.send(details);
})

app.post('/add-product', verifytoken, upload.array("image", 12), async (req, res) => {
    try {
        const { name } = req.body;
        const { Brand } = req.body;
        const { price } = req.body;
        const priceArray = price.split(',').map(price => price.trim());
        const priceObjects = priceArray.map(price => ({ price }));
        const { Color } = req.body;
        const colorsArray = Color.split(',').map(Color => Color.trim());
        const colorObjects = colorsArray.map(Color => ({ Color }));
        const { userId } = req.body;
        const path = req.files;
        // const filename = req.files.map(file => file.filename);
        const productdata = new product({
            image: path,
            name: name,
            Brand: Brand,
            price: priceObjects,
            Color: colorObjects,
            userId: userId
        })
        let result = await productdata.save();
        res.status(401).json({ status: 201, result });
    } catch (err) { console.log(err) }
})

app.get('/getproduct', verifytoken, async (req, res) => {
    let result = await product.find()
    res.send(result)
})

app.delete('/product/:id', verifytoken, async (req, res) => {
    let result = await products.deleteOne({ _id: req.params.id })
    res.send(result)
})

app.get('/updateproduct/:id', verifytoken,  async (req, res) => {
    let result = await products.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send('No Record found')
    }
})

app.put('/updateproduct/:id', verifytoken, async (req, res) => {
    let result = await products.updateOne(
        { _id: req.params.id },
        { $set: req.body })
    if (result) {
        res.send(result)
    } else {
        res.send('Updation failed')
    }
})

app.get('/search/:key', verifytoken, async (req, res) => {
    let result = await products.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { Brand: { $regex: req.params.key } },
            { Color: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
        ]
    });
    res.send(result)
})

function verifytoken(req,res,next) {
    let vertoken = req.headers['authorization'];
    if(vertoken) {
        vertoken = vertoken.split(' ')[1];
        token.verify(vertoken, jwtkey, (err, valid) =>{
            if(err){
                res.send("enter valid authorization token")
            }else{
                next();
            }
        })
    }else{
        res.send('please provide an authorization token')
    }
}

app.listen(5000, () => {
    console.log("running")
});
