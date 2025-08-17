import db from '../../../lib/mongodb'
import Product from '../../../models/Product'
import { getUser } from '../../../lib/auth'
export default async function handler(req,res){
  await db()
  const {id}=req.query
  if(req.method==='PUT'){
    const u=getUser(req); if(!u) return res.status(401).json({error:'Unauthorized'})
    const {name,price,image,tag}=req.body||{}
    const it=await Product.findByIdAndUpdate(id,{name,price,image,tag},{new:true})
    return res.json(it)
  }
  if(req.method==='DELETE'){
    const u=getUser(req); if(!u) return res.status(401).json({error:'Unauthorized'})
    await Product.findByIdAndDelete(id); return res.json({ok:true})
  }
  res.status(405).end()
}