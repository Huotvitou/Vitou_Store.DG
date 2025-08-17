import { getUser } from '../../../lib/auth'
export default async function handler(req,res){ const u=getUser(req); if(!u) return res.status(401).json({error:'Unauthorized'}); res.json({user:u}) }