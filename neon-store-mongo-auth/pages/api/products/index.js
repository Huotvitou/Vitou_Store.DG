import db from '../../../lib/mongodb'
import Product from '../../../models/Product'
import { getUser } from '../../../lib/auth'
import seed from '../../../products.json'
export default async function handler(req,res){
  await db()
  if(req.method==='GET'){
    if(await Product.countDocuments()===0){ await Product.insertMany(seed) }
    const items = await Product.find().sort({createdAt:-1})
    return res.json(items)
  }
  if(req.method==='POST'){
    const u=getUser(req); if(!u) return res.status(401).json({error:'Unauthorized'})
    const {name,price,image,tag}=req.body||{}
    if(!name||price==null) return res.status(400).json({error:'name & price required'})
    const it = await Product.create({name,price,image,tag})
    return res.json(it)
  }
  res.status(405).end()
}