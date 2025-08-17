import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
export default function Admin(){
  const r=useRouter(); const [me,setMe]=useState(null); const [items,setItems]=useState([])
  const [form,setForm]=useState({_id:null,name:'',price:'',image:'',tag:''})
  useEffect(()=>{ fetch('/api/auth/me').then(async res=>{ if(!res.ok){ r.replace('/admin/login'); return } const data=await res.json(); setMe(data.user); load() }) },[])
  const load=()=> fetch('/api/products').then(r=>r.json()).then(setItems)
  const submit=async(e)=>{ e.preventDefault(); const payload={name:form.name,price:Number(form.price||0),image:form.image,tag:form.tag}; if(form._id){ const res=await fetch('/api/products/'+form._id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); if(!res.ok) return alert('Update failed')} else { const res=await fetch('/api/products',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); if(!res.ok) return alert('Create failed')} setForm({_id:null,name:'',price:'',image:'',tag:''}); load() }
  const edit=(p)=> setForm({_id:p._id,name:p.name,price:String(p.price),image:p.image||'',tag:p.tag||''})
  const del=async(id)=>{ if(!confirm('Delete this product?')) return; const res=await fetch('/api/products/'+id,{method:'DELETE'}); if(!res.ok) return alert('Delete failed'); load() }
  const logout=async()=>{ await fetch('/api/auth/logout',{method:'POST'}); r.push('/admin/login') }
  return (<main className="max-w-6xl mx-auto px-4 py-8"><div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold">Admin Dashboard</h1><div className="flex items-center gap-3"><span className="opacity-80 text-sm">{me?.email}</span><button className="btn-ghost" onClick={logout}>Logout</button></div></div>
    <form onSubmit={submit} className="card p-4 grid md:grid-cols-5 gap-3 mb-6">
      <input placeholder="Name" className="px-3 py-2 rounded-xl border md:col-span-2" style={{borderColor:'var(--line)',background:'#0b120f'}} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
      <input placeholder="Price" className="px-3 py-2 rounded-xl border" style={{borderColor:'var(--line)',background:'#0b120f'}} value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required/>
      <input placeholder="Image URL" className="px-3 py-2 rounded-xl border md:col-span-2" style={{borderColor:'var(--line)',background:'#0b120f'}} value={form.image} onChange={e=>setForm({...form,image:e.target.value})}/>
      <input placeholder="Tag" className="px-3 py-2 rounded-xl border" style={{borderColor:'var(--line)',background:'#0b120f'}} value={form.tag} onChange={e=>setForm({...form,tag:e.target.value})}/>
      <div className="md:col-span-5 flex gap-2"><button className="neon-btn">{form._id?'Update Product':'Add Product'}</button>{form._id?<button type='button' className='btn-ghost' onClick={()=>setForm({_id:null,name:'',price:'',image:'',tag:''})}>Cancel</button>:null}<a href='/' className='btn-ghost'>View Store</a></div>
    </form>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{items.map(p=>(<div key={p._id} className="card overflow-hidden"><img src={p.image||'/images/placeholder.jpg'} className="w-full h-40 object-cover bg-[#070b09]"/><div className="p-3"><div className="text-xs inline-flex px-2 py-1 rounded-full border mb-2" style={{borderColor:'var(--line)'}}>{p.tag||'Digital'}</div><div className="font-medium">{p.name}</div><div className="opacity-90">${Number(p.price).toFixed(2)}</div><div className="flex gap-2 mt-3"><button className="btn-ghost" onClick={()=>edit(p)}>Edit</button><button className="danger px-3 py-1 rounded-xl" onClick={()=>del(p._id)}>Delete</button></div></div></div>))}</div>
  </main>)
}