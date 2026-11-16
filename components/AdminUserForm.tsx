'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { School, UserCog } from 'lucide-react'

export type AdminRole = 'school_admin' | 'teacher_admin'

export interface AdminUserFormValues {
  firstName: string
  lastName: string
  email: string
  password?: string
  role: AdminRole
  schoolId?: string
  contactPhone?: string
}

interface AdminUserFormProps {
  admin?: (AdminUserFormValues & { id?: string }) | null
  schools: Array<{ id: string; name: string }>
  onSubmit: (data: AdminUserFormValues) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

const ROLE_OPTIONS: { value: AdminRole; label: string; description: string }[] = [
  {
    value: 'school_admin',
    label: 'Administrador de colegio',
    description: 'Ve su institución, estudiantes y reportes. No crea contenido de la plataforma.',
  },
  {
    value: 'teacher_admin',
    label: 'Administrador de plataforma',
    description: 'Crea cursos, exámenes y puede crear otros administradores.',
  },
]

export function AdminUserForm({ admin, schools, onSubmit, onCancel, loading = false }: AdminUserFormProps) {
  const isEditing = !!admin
  const [roleSelected, setRoleSelected] = useState(isEditing)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<AdminUserFormValues>({
    firstName: admin?.firstName || '',
    lastName: admin?.lastName || '',
    email: admin?.email || '',
    password: '',
    role: admin?.role || 'school_admin',
    schoolId: admin?.schoolId || '',
    contactPhone: admin?.contactPhone || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setError('Completa nombre, apellido y correo.')
      return
    }
    if (!isEditing && !formData.password) {
      setError('La contraseña es obligatoria al crear el usuario.')
      return
    }
    if (formData.role === 'school_admin' && !formData.schoolId) {
      setError('El administrador de colegio debe tener un colegio asignado.')
      return
    }

    try {
      await onSubmit({
        ...formData,
        schoolId: formData.role === 'school_admin' ? formData.schoolId : undefined,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el administrador.')
    }
  }

  if (!roleSelected) {
    return (
      <Dialog open onOpenChange={(open) => !open && onCancel()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>¿Qué tipo de administrador quieres crear?</DialogTitle>
            <DialogDescription>
              Elige el rol. Después podrás asignarle colegio si corresponde.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            {ROLE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className="rounded-lg border-2 border-gray-200 p-5 text-left hover:border-[#73A2D3] hover:bg-blue-50"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, role: option.value, schoolId: option.value === 'teacher_admin' ? '' : prev.schoolId }))
                  setRoleSelected(true)
                }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-[#73A2D3]">
                  {option.value === 'school_admin' ? <School className="h-5 w-5" /> : <UserCog className="h-5 w-5" />}
                </div>
                <div className="font-semibold text-gray-900">{option.label}</div>
                <p className="mt-1 text-sm text-gray-600">{option.description}</p>
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const roleLabel = ROLE_OPTIONS.find((r) => r.value === formData.role)?.label

  return (
    <Dialog open onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar administrador' : `Nuevo ${roleLabel?.toLowerCase()}`}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Puedes cambiar el colegio o la contraseña. El rol no se modifica.'
              : 'Con estos datos podrá entrar a la plataforma.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="admin-firstName">Nombre *</Label>
              <Input
                id="admin-firstName"
                className="mt-1.5"
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="admin-lastName">Apellido *</Label>
              <Input
                id="admin-lastName"
                className="mt-1.5"
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="admin-email">Correo *</Label>
            <Input
              id="admin-email"
              type="email"
              className="mt-1.5"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="admin-password">{isEditing ? 'Nueva contraseña' : 'Contraseña *'}</Label>
            <Input
              id="admin-password"
              type="password"
              className="mt-1.5"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              required={!isEditing}
              placeholder={isEditing ? 'Dejar en blanco para no cambiarla' : ''}
            />
          </div>

          {formData.role === 'school_admin' && (
            <div>
              <Label>Colegio *</Label>
              <Select
                value={formData.schoolId || undefined}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, schoolId: value }))}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Seleccionar colegio" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="admin-phone">Teléfono (opcional)</Label>
            <Input
              id="admin-phone"
              type="tel"
              className="mt-1.5"
              value={formData.contactPhone || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
              placeholder="300 123 4567"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            {!isEditing && (
              <Button type="button" variant="ghost" onClick={() => setRoleSelected(false)}>
                Cambiar tipo
              </Button>
            )}
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-[#73A2D3] hover:bg-[#5b8ab8]">
              {loading ? 'Guardando...' : isEditing ? 'Guardar' : 'Crear'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
