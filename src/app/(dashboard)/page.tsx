'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>
      <Card>
        <CardHeader><CardTitle>Bienvenue sur le MDT</CardTitle></CardHeader>
        <CardContent>
          <p>Connecté en tant que : {user?.email}</p>
          <p className="text-sm text-gray-400">Ceci est la version simplifiée. Ajoutez vos composants personnalisés ici.</p>
        </CardContent>
      </Card>
    </div>
  )
}
