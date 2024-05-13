import express, { json } from 'express'
import cors from 'cors'
const app = express()
const port = 3000
app.use(json())
import mongoose from 'mongoose';
app.use(cors())
// let data=[{
//     "id": 2,
//     "description": "Sweet and savory sauces relishes spreads and seasonings",
//     "name": "Condiments"
//   },
//   {
//     "id": 1,
//     "description": "Soft drinks coffees teas beers and ales",
//     "name": "Beverages"
//   },
//   {
//     "id": 3,
//     "description": "Desserts candies and sweet breads",
//     "name": "Confections"
//   },
//   {
//     "id": 4,
//     "description": "Cheeses",
//     "name": "Dairy Products"
//   },
//   {
//     "id": 5,
//     "description": "Breads crackers pasta and cereal",
//     "name": "Grains/Cereals"
//   },
//   {
//     "id": 6,
//     "description": "Prepared meats",
//     "name": "Meat/Poultry"
//   },
//   {
//     "id": 7,
//     "description": "Dried fruit and bean curd",
//     "name": "Produce"
//   },
//   {
//     "id": 8,
//     "description": "Seaweed and fish",
//     "name": "Seafood"
//   },
//   {
//     "id": 9
//   },
//   {
//     "name": "DesertFood",
//     "des": "DEZERT",
//     "id": 10
//   }]
// let count=100
// app.get('/products/:id', (req, res) => {
//    const {id}=req.params
//    const item =data.find(x=>x.id===+id)
//    res.send(item)
// })
// app.get('/products',(req,res)=>{
//     res.send(data)
// })
// app.post('/products',(req,res)=>{
//    const obj=req.body
//    count++
//    data.push({...obj,id:count})
//    res.send(data)
// })
// app.delete('/products/:id',(req,res)=>{
//     const {id}=req.params
//      data=data.filter(x=>x.id!==+id)
//     res.send(data)
// })
// app.put('/products/:id',(req,res)=>{
//     const {id}=req.params
//     const obj=req.body
//     const index=data.findIndex(x=>x.id===+id)
//     if (index===-1) {
//         res.send({message:"bu deyisen yoxdu"})
//     }
//     data[index]={...obj,id:data[index].id}
//     res.send(data)
// })
const productsSchema=new mongoose.Schema({
  name:String,
  price:Number,
  desc:String
})
const ProductsModel = mongoose.model('products', productsSchema);
app.get('/products', async(req,res)=>{
  const products= await ProductsModel.find()
  res.send(products)
})
app.get('/products/:id', async(req,res)=>{
  const{id}=req.params
  const products= await ProductsModel.findById(id)
  res.send(products)
})
app.post('/products', async(req,res)=>{
 const body=req.body
 const products=new ProductsModel(body)
 products.save()
  res.send(products)
})
app.delete('/products/:id',async(req,res)=>{
  const {id}=req.params
  const DeleteProducts=await ProductsModel.findByIdAndDelete(id)
  // res.send(DeleteProducts)
  res.send({message:"mehsul silindi"})
})
app.put('/products/:id', async (req,res)=>{
  const {id}=req.params
  const body=req.body
  const  UpdateProducts= await ProductsModel.findByIdAndUpdate(id,body)
  res.send({message:"update olundu"})
})
mongoose.connect('mongodb+srv://NiyazovAsad:Niyazovesed2004@ourdb.n1ga79r.mongodb.net/')
  .then(() => console.log('Connected!'))
  .catch((err)=>console.log('Not connected')+err.message)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})