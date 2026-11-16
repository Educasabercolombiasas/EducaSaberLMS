'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { useUsers } from '@/hooks/useUsers'
import { AdminUserForm, type AdminUserFormValues } from '@/components/AdminUserForm'
import { Plus, Search, Pencil, Trash2, Shield, School, UserCog } from 'lucide-react'

function roleLabel(role: string) {
  if (role === 'school_admin') return 'Admin de colegio'
  if (role === 'teacher_admin') return 'Admin de plataforma'
  return role
}

export function AdminsManagement() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const { users, loading, pagination, fetchUsers } = useUsers()
  const [schools, setSchools] = useState<Array<{ id: string; name: string }>>([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<any | null>(null)

  const loadAdmins = async (searchTerm = search) => {
    await fetchUsers({
      page: 1,
      limit: 50,
      roles: 'school_admin,teacher_admin',
      search: searchTerm || undefined,
    })
  }

  useEffect(() => {
    if (session?.user?.role === 'teacher_admin') {
      loadAdmins('')
      fetch('/api/schools?limit=200')
        .then((res) => res.json())
        .then((data) => setSchools(data.schools || []))
        .catch(() => setSchools([]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.role])

  if (session?.user?.role !== 'teacher_admin') {
    return null
  }

  const handleCreate = async (data: AdminUserFormValues) => {
    setSaving(true)
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          password: data.password,
        }),
      })
      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload.error || 'No se pudo crear el administrador')
      }
      setShowForm(false)
      await loadAdmins()
      toast({
        title: 'Administrador creado',
        description: `${data.firstName} ${data.lastName} ya puede iniciar sesión.`,
      })
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async (data: AdminUserFormValues) => {
    if (!editing?.id) return
    setSaving(true)
    try {
      const response = await fetch(`/api/users/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role,
          schoolId: data.schoolId,
          contactPhone: data.contactPhone,
          password: data.password || undefined,
        }),
      })
      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload.error || 'No se pudo actualizar el administrador')
      }
      setEditing(null)
      await loadAdmins()
      toast({
        title: 'Administrador actualizado',
        description: 'Los cambios quedaron guardados.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleting?.id) return
    const response = await fetch(`/api/users/${deleting.id}`, { method: 'DELETE' })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      toast({
        title: 'No se pudo eliminar',
        description: payload.error || 'Inténtalo de nuevo.',
        variant: 'destructive',
      })
      return
    }
    setDeleting(null)
    await loadAdmins()
    toast({
      title: 'Administrador eliminado',
      description: `${deleting.firstName} ${deleting.lastName} ya no puede entrar.`,
    })
  }

  const schoolAdmins = users.filter((u) => u.role === 'school_admin').length
  const platformAdmins = users.filter((u) => u.role === 'teacher_admin').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Administradores</h3>
          <p className="text-sm text-gray-600">
            Crea admins de colegio o de plataforma y asígnales institución.
          </p>
        </div>
        <Button className="bg-[#73A2D3] hover:bg-[#5b8ab8]" onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo administrador
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-[#73A2D3]">{pagination?.total || users.length}</div>
            <div className="text-sm text-gray-600">Total administradores</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <School className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold">{schoolAdmins}</div>
              <div className="text-sm text-gray-600">De colegio</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <UserCog className="h-8 w-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold">{platformAdmins}</div>
              <div className="text-sm text-gray-600">De plataforma</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex max-w-lg gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Buscar por nombre o correo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') loadAdmins(search)
            }}
          />
        </div>
        <Button type="button" variant="outline" onClick={() => loadAdmins(search)}>
          Buscar
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Administrador</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Colegio</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                  Cargando administradores...
                </TableCell>
              </TableRow>
            )}
            {!loading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                  Aún no hay administradores con ese filtro.
                </TableCell>
              </TableRow>
            )}
            {!loading && users.map((admin) => {
              const isSelf = admin.id === session?.user?.id
              return (
                <TableRow key={admin.id}>
                  <TableCell>
                    <div className="font-medium">{admin.firstName} {admin.lastName}</div>
                    <div className="text-xs text-gray-500">{admin.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={admin.role === 'teacher_admin' ? 'border-purple-300 text-purple-700' : 'border-green-300 text-green-700'}>
                      <Shield className="mr-1 h-3 w-3" />
                      {roleLabel(admin.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {admin.role === 'school_admin'
                      ? (admin.school?.name || 'Sin colegio')
                      : 'Toda la plataforma'}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {admin.contactPhone || '—'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setEditing(admin)} title="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isSelf}
                      onClick={() => setDeleting(admin)}
                      title={isSelf ? 'No puedes eliminarte a ti mismo' : 'Eliminar'}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {showForm && (
        <AdminUserForm
          schools={schools}
          loading={saving}
          onCancel={() => setShowForm(false)}
          onSubmit={handleCreate}
        />
      )}

      {editing && (
        <AdminUserForm
          admin={editing}
          schools={schools}
          loading={saving}
          onCancel={() => setEditing(null)}
          onSubmit={handleUpdate}
        />
      )}

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este administrador?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleting
                ? `${deleting.firstName} ${deleting.lastName} dejará de poder entrar. Los estudiantes y el contenido de la plataforma no se borran.`
                : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
