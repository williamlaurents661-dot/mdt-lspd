'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '', badgeNumber: '' })
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { firstName: form.firstName, lastName: form.lastName, badgeNumber: form.badgeNumber } }
    })
    if (error) setError(error.message)
    else {
      // Insert profile
      await supabase.from('profiles').insert({ id: data.user?.id, ...form, status: 'PENDING' })
      await supabase.auth.signOut()
      router.push('/login?registered=true')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="bg-[#1E3E62] p-8 rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Inscription MDT</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input className="w-full p-2 mb-3 bg-[#0B192C] border border-[#3B82F6] rounded" placeholder="Prénom" value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})} required />
        <input className="w-full p-2 mb-3 bg-[#0B192C] border border-[#3B82F6] rounded" placeholder="Nom" value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})} required />
        <input className="w-full p-2 mb-3 bg-[#0B192C] border border-[#3B82F6] rounded" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <input className="w-full p-2 mb-3 bg-[#0B192C] border border-[#3B82F6] rounded" placeholder="Mot de passe" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        <input className="w-full p-2 mb-3 bg-[#0B192C] border border-[#3B82F6] rounded" placeholder="Matricule" value={form.badgeNumber} onChange={e=>setForm({...form, badgeNumber:e.target.value})} required />
        <button type="submit" className="w-full bg-[#3B82F6] py-2 rounded hover:bg-blue-700">S'inscrire</button>
        <p className="text-sm mt-4 text-center">Déjà un compte ? <a href="/login" className="text-blue-400">Se connecter</a></p>
      </form>
    </div>
  )
}
