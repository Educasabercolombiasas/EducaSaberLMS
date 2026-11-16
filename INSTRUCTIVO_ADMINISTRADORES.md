# Instructivo para administradores — EducaSaber LMS

## Roles

### Administrador de plataforma (`teacher_admin`)
- Crea lecciones, módulos, cursos, preguntas y exámenes
- Gestiona colegios y branding
- Crea y elimina **estudiantes** y **otros administradores**
- En **Usuarios → Administradores** da de alta un admin de colegio (con colegio asignado) o de plataforma
- Carga masiva (estudiantes, colegios, lecciones, preguntas) y configuración

### Administrador de colegio (`school_admin`)
- Solo ve **su** institución
- Puede **crear, editar y eliminar estudiantes** de su colegio
- Puede crear cursos y exámenes para su institución
- Puede consultar lecciones, módulos y preguntas ya creadas
- **No** puede crear otros administradores, colegios ni contenido de lecciones/preguntas
- **No** tiene la pestaña de configuración / carga masiva de contenido

---

## 📋 **Proceso de Creación de Contenido Educativo**

### 🔄 **Orden Correcto de Creación**

```
1️⃣ COMPETENCIAS (ya existen en el sistema)
   ↓
2️⃣ LECCIONES (crear contenido individual)
   ↓
3️⃣ MÓDULOS (agrupar lecciones por competencia)
   ↓
4️⃣ CURSOS (combinar módulos para un programa completo)
   ↓
5️⃣ PREGUNTAS (evaluar el aprendizaje)
   ↓
6️⃣ EXÁMENES (evaluaciones formales)
```

---

## 📖 **1. LECCIONES**

### 🎯 **¿Qué son las Lecciones?**
- **Unidad básica** de contenido educativo
- Contiene: video, teoría, ejercicios
- Se asigna a una **competencia específica**
- Tiempo estimado de estudio

### ✅ **Quién puede crear Lecciones:**
- **Solo administrador de plataforma**
- **NO** administrador de colegio

### 📝 **Proceso de Creación:**
1. Ir a pestaña **"📖 Lecciones"**
2. Hacer clic en **"Nueva Lección"**
3. Completar formulario:
   - **Título**: Nombre descriptivo
   - **Descripción**: Objetivos y contenido
   - **Competencia**: Seleccionar de la lista
   - **Tiempo estimado**: En minutos
   - **Video URL**: Enlace al video (opcional)
   - **Contenido teórico**: Texto explicativo
4. Guardar

### 🔍 **Para Administradores de Colegio:**
- **Solo pueden VER** las lecciones existentes
- **NO pueden crear, editar ni eliminar**
- Útil para **planificar cursos** con contenido disponible

---

## 📚 **2. MÓDULOS**

### 🎯 **¿Qué son los Módulos?**
- **Agrupación** de lecciones relacionadas
- Organizados por **competencia**
- Estructura lógica de aprendizaje
- Preparación para crear cursos

### ✅ **Quién puede crear Módulos:**
- **Solo administrador de plataforma**
- **NO** administrador de colegio

### 📝 **Proceso de Creación:**
1. Ir a pestaña **"📚 Módulos"**
2. Hacer clic en **"Nuevo Módulo"**
3. Completar formulario:
   - **Título**: Nombre del módulo
   - **Descripción**: Objetivos del módulo
   - **Competencia**: Seleccionar competencia
   - **Lecciones**: Agregar lecciones existentes
4. **Importante**: Solo aparecen lecciones de la competencia seleccionada
5. Guardar

### 🔍 **Para Administradores de Colegio:**
- **Solo pueden VER** los módulos existentes
- **NO pueden crear, editar ni eliminar**
- Útil para **seleccionar módulos** al crear cursos

---

## 🎓 **3. CURSOS**

### 🎯 **¿Qué son los Cursos?**
- **Programa completo** de aprendizaje
- Combina múltiples módulos
- Dirigido a un **grado académico específico**
- Asignado a una **institución**

### ✅ **Quién puede crear Cursos:**
- **Administrador de plataforma**: Puede crear para cualquier colegio
- **Administrador de Colegio**: Solo para su institución

### 📝 **Proceso de Creación:**

#### **Para Administrador de plataforma:**
1. Ir a pestaña **"🎓 Cursos"**
2. Hacer clic en **"Nuevo Curso"**
3. Completar formulario:
   - **Título**: Nombre del curso
   - **Descripción**: Objetivos y contenido
   - **Colegio**: Seleccionar institución
   - **Grado académico**: 6° a 11°
   - **Módulos**: Seleccionar módulos existentes
4. Guardar

#### **Para Administrador de Colegio:**
1. Ir a pestaña **"🎓 Cursos"**
2. Hacer clic en **"Nuevo Curso"**
3. Completar formulario:
   - **Título**: Nombre del curso
   - **Descripción**: Objetivos y contenido
   - **Colegio**: Se asigna automáticamente
   - **Grado académico**: 6° a 11°
   - **Módulos**: Seleccionar módulos existentes
4. Guardar

### 🔍 **Diferencias por Rol:**
- **Administrador de plataforma**: Ve todos los cursos del sistema
- **Administrador de Colegio**: Solo ve cursos de su institución

---

## ❓ **4. PREGUNTAS**

### 🎯 **¿Qué son las Preguntas?**
- **Evaluaciones** del contenido
- Diferentes tipos: opción múltiple, verdadero/falso, ensayo
- Asignadas a lecciones específicas
- Base para crear exámenes

### ✅ **Quién puede crear Preguntas:**
- **Solo administrador de plataforma**
- **NO** administrador de colegio

### 📝 **Proceso de Creación:**
1. Ir a pestaña **"❓ Preguntas"**
2. Hacer clic en **"Nueva Pregunta"**
3. Completar formulario:
   - **Tipo**: Opción múltiple, verdadero/falso, ensayo
   - **Enunciado**: Texto de la pregunta
   - **Opciones**: A, B, C, D (si aplica)
   - **Respuesta correcta**: Seleccionar
   - **Explicación**: Por qué es correcta
   - **Lección**: Asignar a lección específica
4. Guardar

### 🔍 **Para Administradores de Colegio:**
- **Solo pueden VER** las preguntas existentes
- **NO pueden crear, editar ni eliminar**
- Útil para **consultar** preguntas disponibles al crear exámenes

---

## 📝 **5. EXÁMENES**

### 🎯 **¿Qué son los Exámenes?**
- **Evaluaciones formales** para estudiantes
- Combinan preguntas de diferentes lecciones
- Configurables por tiempo y puntaje
- Generan resultados y estadísticas

### ✅ **Quién puede crear Exámenes:**
- **Administrador de plataforma**: Puede crear para cualquier colegio
- **Administrador de Colegio**: Solo para su institución

### 📝 **Proceso de Creación:**
1. Ir a pestaña **"📝 Exámenes"**
2. Hacer clic en **"Nuevo Examen"**
3. Completar formulario:
   - **Título**: Nombre del examen
   - **Tipo**: Por competencia, por módulo, completo
   - **Tiempo límite**: En minutos
   - **Puntaje mínimo**: Para aprobar
   - **Preguntas**: Seleccionar cantidad por módulo
4. Guardar

---

## 6. Usuarios

### Administrador de plataforma
En **Usuarios** hay dos pestañas:

- **Estudiantes** — alta, edición y baja de alumnos (colegio y grado obligatorios).
- **Administradores** — **Nuevo administrador**:
  1. Elige *Administrador de colegio* o *Administrador de plataforma*.
  2. Si es de colegio, **asígnalo a un colegio**.
  3. Pon nombre, correo y contraseña. Con eso puede entrar, sin un ingeniero de por medio.

No puedes eliminarte a ti mismo ni al último admin de plataforma. Borrar un admin no borra estudiantes ni cursos.

### Administrador de colegio
- Crea, edita y elimina **solo estudiantes de su colegio**
- No ve ni crea otros administradores

---

## Flujo de trabajo

### Administrador de plataforma
```
1. Crear colegios
2. Crear administradores de colegio (Usuarios → Administradores)
3. Crear lecciones, módulos y preguntas
4. Crear cursos y asignarlos al colegio/grado
5. Crear exámenes
6. Cargar o dar de alta estudiantes
```

### Administrador de colegio
```
1. Crear y editar estudiantes de su institución
2. Consultar lecciones y módulos
3. Crear cursos y exámenes de su colegio
4. Ver analytics de su institución
```

---

## 📊 **7. ANALYTICS Y REPORTES**

### 🎯 **Funcionalidades Disponibles:**
- **KPIs**: Estudiantes activos, exámenes realizados, promedios
- **Gráficos**: Evolución por materia, distribución de calificaciones
- **Filtros**: Por colegio, curso, grado, competencia
- **Exportación**: Reportes en CSV

### ✅ **Acceso:**
- **Ambos roles** tienen acceso completo a analytics
- **Filtros automáticos** según el rol:
  - Administrador de plataforma: Ve todo el sistema
  - Administrador de Colegio: Solo su institución

---

## ⚠️ **Consideraciones Importantes**

### 🔒 **Restricciones de Seguridad:**
- Los Administradores de Colegio **NO pueden** acceder a datos de otras instituciones
- Las lecciones y módulos son **compartidos** entre instituciones
- Los cursos son **específicos** por institución

### 📈 **Mejores Prácticas:**
1. **Planificar** antes de crear contenido
2. **Reutilizar** lecciones y módulos existentes
3. **Asignar competencias** correctamente
4. **Crear preguntas** variadas y de calidad
5. **Probar exámenes** antes de publicarlos

### 🆘 **Soporte:**
- Para dudas técnicas, contactar al Administrador de plataforma
- Para contenido educativo, coordinar con el equipo académico
- Revisar analytics regularmente para mejorar el contenido

---

## 📞 **Contacto y Soporte**

- **Administrador de plataforma**: Acceso completo al sistema
- **Administrador de Colegio**: Soporte limitado a su institución
- **Estudiantes**: Acceso solo a cursos asignados

---

*Actualizado en noviembre 2026: alta de administradores desde Usuarios y permisos reales de cada rol.*
