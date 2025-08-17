import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
const COOKIE='token'
export function sign(payload){ const token=jwt.sign(payload, process.env.JWT_SECRET||'dev', {expiresIn:'7d'}); return serialize(COOKIE, token, {httpOnly:true,path:'/',sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:60*60*24*7}) }
export function clear(){ return serialize(COOKIE,'',{httpOnly:true,path:'/',expires:new Date(0)}) }
export function getUser(req){ try{ const ck=(req.headers.cookie||'').split('; ').find(c=>c.startsWith('token=')); if(!ck) return null; const t=ck.split('=')[1]; return jwt.verify(t, process.env.JWT_SECRET||'dev') }catch(e){ return null } }
