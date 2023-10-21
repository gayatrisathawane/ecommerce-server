
import  {Schema,model} from 'mongoose'

const productsSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    productImage: String,
    brand: String
})

// model created

const Product = model('Product', productsSchema)

export default Product
