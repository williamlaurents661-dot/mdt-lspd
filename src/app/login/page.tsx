'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-[#1E3E62] p-8 rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Connexion MDT</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input className="w-full p-2 mb-3 bg-[#0B192C] border border-[#3B82F6] rounded" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="w-full p-2 mb-3 bg-[#0B192C] border border-[#3B82F6] rounded" placeholder="Mot de passe" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-[#3B82F6] py-2 rounded hover:bg-blue-700">Se connecter</button>
        <p className="text-sm mt-4 text-center">Pas de compte ? <a href="/register" className="text-blue-400">S'inscrire</a></p>
      </form>
    </div>
  )
}
