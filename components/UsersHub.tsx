'use client'

import { useSession } from 'next-auth/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StudentsManagement } from '@/components/StudentsManagement'
import { AdminsManagement } from '@/components/AdminsManagement'
import { GraduationCap, Shield } from 'lucide-react'

export function UsersHub() {
  const { data: session } = useSession()
  const isPlatformAdmin = session?.user?.role === 'teacher_admin'

  if (!isPlatformAdmin) {
    return <StudentsManagement />
  }

  return (
    <Tabs defaultValue="students" className="space-y-6">
      <TabsList>
        <TabsTrigger value="students" className="gap-2">
          <GraduationCap className="h-4 w-4" />
          Estudiantes
        </TabsTrigger>
        <TabsTrigger value="admins" className="gap-2">
          <Shield className="h-4 w-4" />
          Administradores
        </TabsTrigger>
      </TabsList>
      <TabsContent value="students">
        <StudentsManagement />
      </TabsContent>
      <TabsContent value="admins">
        <AdminsManagement />
      </TabsContent>
    </Tabs>
  )
}
