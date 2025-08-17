import db from '../../../lib/mongodb'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end()
  await db()
  const count = await User.countDocuments()
  if(count>0) return res.status(403).json({error:'Registration disabled'})
  const {email,password}=req.body||{}
  if(!email||!password) return res.status(400).json({error:'email & password required'})
  const hash = await bcrypt.hash(password,10)
  const u = await User.create({email,password:hash,role:'admin'})
  res.json({ok:true,id:u._id})
}