'use client'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">MDT LSPD</h1>
      {user ? (
        <p>Connecté en tant que : {user.email}</p>
      ) : (
        <p>Non connecté. <a href="/login" className="text-blue-500">Se connecter</a></p>
      )}
    </div>
  )
}
