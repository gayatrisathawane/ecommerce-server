import express, { query } from 'express'
import mongoose, { Schema, model } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const PORT = 5000

app.use(express.json())

const MONGODB_URL = '';
const connectMongoDb = async () => {

    const conne = await mongoose.connect(process.env.MONGODB_URL)
    if (conne) {
        console.log("connet mongo Db")
    }
}
connectMongoDb()

// schema created
const productsSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    productImage: String,
    brand: String
})

// model created

const Product = mongoose.model('Product', productsSchema)


app.get('/products', async (req, res) => {

    const findProduct = await Product.find()

    res.json({
        data: findProduct,
        message: "succesfully get data"
    })
})

app.post('/addproduct', async (req, res) => {

    const {name, description, price, productImage, brand } = req.body

    const newProduct = new Product({
        name: name,
        description: description,
        price: price,
        productImage: productImage,
        brand: brand

    })

    const savedata = await  newProduct.save()

    res.json({
        data: savedata,
        message: "succesfully added data"
    })
})


//find product on the basis of name 

app.get('/product',async (req,res)=>{

    const {name} = req.query

    const findOneData = await Product.findOne({name:name})

    if(findOneData==null)
    {
        return res.json({
            message: "product not found"
        })
    }

    res.json(
        {
            data:findOneData,
            message:"get data"
        }
    )
})

 // delete data by id 

 app.delete('/product/:_id', async(req,res)=>{

    const { _id } = req.params

    await Product.deleteOne({ _id  :_id })

    res.json({
        message:"delete data successfully "
    })
 })


 //update with put method 

 app.put('/product/:_id' , async (req,res)=>{

    const { _id } = req.params
    
    const {name, description, price, productImage, brand } = req.body

    await Product.updateOne(({ _id :_id }), ({ $set:{

        name: name,
        description: description,
        price: price,
        productImage: productImage,
        brand: brand

    }}))

    const updatedProduct = await Product.findOne({ _id :_id })
     res.json({
        messsage:"updated",
        data :updatedProduct
     })

 })

app.listen(PORT, () => {
    console.log(`Port running on ${PORT}`)
})