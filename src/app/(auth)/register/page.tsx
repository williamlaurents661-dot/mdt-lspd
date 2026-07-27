'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '', badgeNumber: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { firstName: form.firstName, lastName: form.lastName, badgeNumber: form.badgeNumber } }
      })
      if (error) throw error
      await supabase.from('profiles').insert({
        id: data.user?.id,
        firstName: form.firstName,
        lastName: form.lastName,
        badgeNumber: form.badgeNumber,
        status: 'PENDING',
        role: 'CADET'
      })
      await supabase.auth.signOut()
      router.push('/login?registered=true')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B192C] p-4">
      <Card className="w-full max-w-md border-[#1E3E62]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Inscription MDT</CardTitle>
          <CardDescription>Créez votre compte agent</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Prénom</Label><Input value={form.firstName} onChange={(e) => setForm({...form, firstName: e.target.value})} required /></div>
              <div className="space-y-2"><Label>Nom</Label><Input value={form.lastName} onChange={(e) => setForm({...form, lastName: e.target.value})} required /></div>
            </div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required /></div>
            <div className="space-y-2"><Label>Mot de passe</Label><Input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required /></div>
            <div className="space-y-2"><Label>Matricule</Label><Input value={form.badgeNumber} onChange={(e) => setForm({...form, badgeNumber: e.target.value})} required /></div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Inscription...' : 'S\'inscrire'}</Button>
            <p className="text-sm">Déjà un compte ? <Link href="/login" className="text-blue-500">Se connecter</Link></p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
