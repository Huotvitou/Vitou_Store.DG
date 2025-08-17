import db from '../../../lib/mongodb'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import { sign } from '../../../lib/auth'
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end()
  await db()
  const {email,password}=req.body||{}
  const u = await User.findOne({email})
  if(!u) return res.status(401).json({error:'Invalid credentials'})
  const ok = await bcrypt.compare(password,u.password)
  if(!ok) return res.status(401).json({error:'Invalid credentials'})
  res.setHeader('Set-Cookie', sign({id:u._id,role:u.role,email:u.email}))
  res.json({ok:true})
}