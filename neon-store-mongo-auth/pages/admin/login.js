import { useRouter } from 'next/router'
import { useState } from 'react'
export default function Login(){
  const r=useRouter(); const [email,setEmail]=useState(''); const [password,setPassword]=useState('')
  async function submit(e){ e.preventDefault(); const res=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}); if(res.ok) r.push('/admin'); else alert('Invalid email/password') }
  return (<main className="min-h-screen grid place-items-center px-4"><form onSubmit={submit} className="card w-full max-w-md p-6"><h1 className="text-xl font-bold text-center mb-4">Admin Login</h1>
    <input className="w-full px-3 py-2 rounded-xl border mb-2" style={{borderColor:'var(--line)',background:'#0b120f'}} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
    <input type="password" className="w-full px-3 py-2 rounded-xl border mb-3" style={{borderColor:'var(--line)',background:'#0b120f'}} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/>
    <button className="neon-btn w-full">Sign in</button><div className="text-center mt-3"><a href="/" className="opacity-80 hover:opacity-100">← Back to Home</a></div>
    <p className="text-xs opacity-70 mt-3">Create first admin via POST /api/auth/register</p></form></main>) }