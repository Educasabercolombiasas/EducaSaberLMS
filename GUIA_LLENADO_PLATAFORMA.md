# 📋 Guía: Proceso para Llenar la Plataforma desde Cero

Esta guía describe el orden correcto para poblar la plataforma con datos, asumiendo que solo tienes un usuario `teacher_admin` inicial.

## 🎯 Orden de Creación (Resumen)

```
1. Competencias (ICFES)
2. Colegios/Entidades
3. Usuarios (school_admin, students)
4. Módulos
5. Lecciones
6. Preguntas
7. Asociar Lecciones a Módulos
8. Cursos
9. Exámenes
10. Inscripciones de Estudiantes
```

---

## 📝 Proceso Detallado

### **PASO 1: Crear Competencias ICFES** ✅

**¿Por qué primero?** Las competencias son la base de todo. Cursos, módulos, lecciones y exámenes pueden asociarse a competencias.

**Dónde:** No hay UI directa, pero puedes:
- Usar un script de seed (si existe)
- Crearlas directamente en la base de datos
- O agregar una funcionalidad en la UI de admin

**Competencias ICFES estándar:**
- `lectura_critica` - "Lectura Crítica"
- `matematicas` - "Razonamiento Cuantitativo" / "Matemáticas"
- `comunicacion_escrita` - "Comunicación Escrita"
- `competencias_ciudadanas` - "Competencias Ciudadanas"
- `ingles` - "Inglés"
- `ciencias_naturales` - "Ciencias Naturales" (si aplica)
- `ciencias_sociales` - "Ciencias Sociales" (si aplica)

**Campos requeridos:**
- `name`: Identificador único (ej: 'matematicas')
- `displayName`: Nombre para mostrar (ej: 'Matemáticas')
- `description`: Opcional
- `colorHex`: Opcional (color para UI)
- `iconName`: Opcional (icono)

**Nota:** Si no existen competencias, muchos formularios no funcionarán correctamente.

---

### **PASO 2: Crear Colegios/Entidades** 🏫

**¿Por qué segundo?** Los usuarios (students, school_admin) necesitan estar asociados a un colegio.

**Dónde:** Pestaña "Colegios" en el admin panel

**Campos requeridos:**
- `name`: Nombre del colegio
- `type`: 'school', 'company', 'government_entity', 'other'
- `city`: Ciudad
- `institutionType`: 'publica', 'privada', 'otro'
- `academicCalendar`: 'diurno', 'nocturno', 'ambos'

**Campos opcionales pero recomendados:**
- `contactEmail`: Email de contacto
- `contactPhone`: Teléfono de contacto
- `address`: Dirección
- `neighborhood`: Barrio
- `daneCode`: Código DANE (si aplica)

**Tipos de entidades:**
- `school`: Colegio tradicional
- `company`: Empresa (para cursos corporativos)
- `government_entity`: Entidad gubernamental
- `other`: Otro tipo de organización

**Ejemplo:**
```
Colegio: "Colegio Distrital Modelo"
- type: "school"
- city: "Bogotá"
- institutionType: "publica"
- academicCalendar: "diurno"
```

---

### **PASO 3: Crear Usuarios** 👥

**¿Por qué tercero?** Necesitas usuarios para crear contenido y para que los estudiantes se inscriban.

**Dónde:** Pestaña **Usuarios** en el admin.

- Estudiantes: **Usuarios → Estudiantes → Nuevo Estudiante**
- Admins de colegio o de plataforma: **Usuarios → Administradores → Nuevo administrador** (el de colegio debe llevar colegio asignado)

**Orden sugerido:**

#### 3.1. Crear Administradores de Colegio (`school_admin`)
- **Requisitos:** Debe tener un `schoolId` asignado
- **Campos importantes:**
  - `email`, `password`, `firstName`, `lastName`
  - `schoolId`: **OBLIGATORIO** - debe seleccionar un colegio
  - `contactPhone`: **VITAL** según tus requerimientos
  - `documentType`, `documentNumber`: Para identificación
- **No necesita:** `dateOfBirth`, `gender`, `avatarUrl`

#### 3.2. Crear Estudiantes (`student`)
- **Requisitos:** Debe tener un `schoolId` asignado
- **Campos importantes:**
  - `email`, `password`, `firstName`, `lastName`
  - `schoolId`: **OBLIGATORIO**
  - `academicGrade`: Grado académico ('sexto', 'septimo', etc.)
  - `dateOfBirth`: Para calcular edad
  - `documentType`, `documentNumber`: Para identificación
- **Campos opcionales pero útiles:**
  - `socioeconomicStratum`: Estrato socioeconómico
  - `areasOfDifficulty`, `areasOfStrength`: Áreas de dificultad/fortaleza

**Nota:** El primer `teacher_admin` ya existe. Otros admins de plataforma se crean en **Usuarios → Administradores**.

---

### **PASO 4: Crear Módulos** 📚

**¿Por qué cuarto?** Los cursos necesitan módulos para funcionar.

**Dónde:** Pestaña "Módulos" en el admin panel

**Quién puede crear:** Solo `teacher_admin`

**Campos requeridos:**
- `title`: Título del módulo
- `description`: Descripción
- `estimatedTime`: Tiempo estimado en minutos
- `orderIndex`: Orden (se puede ajustar después)

**Campos opcionales:**
- `competencyId`: Competencia asociada (recomendado)
- `isPublished`: Si está publicado (por defecto `false`)

**Proceso:**
1. Click en "Nuevo Módulo"
2. Llenar título, descripción, tiempo estimado
3. Opcionalmente seleccionar una competencia
4. Guardar (aún sin lecciones)

**Ejemplo:**
```
Módulo: "Números Naturales"
- description: "Operaciones básicas con números naturales"
- estimatedTime: 120 (minutos)
- competencyId: "matematicas"
- orderIndex: 1
```

**Nota:** Los módulos son **reutilizables**. Puedes crear un módulo "Fracciones" y usarlo en múltiples cursos (Matemáticas 6to, Matemáticas 7mo, etc.).

---

### **PASO 5: Crear Lecciones** 📖

**¿Por qué quinto?** Las lecciones se asocian a módulos y contienen preguntas.

**Dónde:** Pestaña "Lecciones" en el admin panel

**Quién puede crear:** Solo `teacher_admin`

**Campos requeridos:**
- `title`: Título de la lección
- `description`: Descripción
- `estimatedTimeMinutes`: Tiempo estimado
- `theoryContent`: Contenido teórico (HTML)

**Campos opcionales:**
- `videoUrl`: URL del video
- `videoDescription`: Descripción del video
- `competencyId`: Competencia directa (opcional, puede venir del módulo)
- `isPublished`: Si está publicado

**Proceso:**
1. Click en "Nueva Lección"
2. Llenar título, descripción, tiempo
3. Agregar contenido teórico (puede ser HTML)
4. Opcionalmente agregar video
5. Guardar

**Ejemplo:**
```
Lección: "Suma de Números Naturales"
- description: "Aprende a sumar números naturales"
- estimatedTimeMinutes: 30
- theoryContent: "<p>Los números naturales son...</p>"
- videoUrl: "https://youtube.com/..."
- competencyId: "matematicas"
```

**Nota:** Las lecciones son **independientes** de los módulos inicialmente. Se asocian después.

---

### **PASO 6: Crear Preguntas** ❓

**¿Por qué sexto?** Las preguntas se asocian a lecciones y se usan en exámenes.

**Dónde:** Pestaña "Preguntas" en el admin panel

**Quién puede crear:** Solo `teacher_admin`

**Campos requeridos:**
- `questionText`: Texto de la pregunta
- `optionA`, `optionB`, `optionC`, `optionD`: Opciones de respuesta
- `correctOption`: Opción correcta ('A', 'B', 'C', o 'D')
- `orderIndex`: Orden dentro de la lección
- `difficultyLevel`: 'facil', 'intermedio', 'dificil', 'variable'

**Campos opcionales:**
- `lessonId`: Lección asociada (puede ser `null` inicialmente)
- `questionImage`: Imagen en el enunciado
- `optionAImage`, `optionBImage`, etc.: Imágenes en las opciones
- `explanation`: Explicación de la respuesta correcta
- `explanationImage`: Imagen en la explicación
- `timeLimit`: Tiempo límite en segundos

**Proceso:**
1. Click en "Nueva Pregunta"
2. Seleccionar lección (o dejar sin asignar)
3. Escribir pregunta y opciones
4. Marcar opción correcta
5. Agregar explicación
6. Establecer dificultad
7. Guardar

**Ejemplo:**
```
Pregunta: "¿Cuál es el resultado de 5 + 3?"
- optionA: "7"
- optionB: "8" ✓ (correcta)
- optionC: "9"
- optionD: "10"
- explanation: "La suma de 5 + 3 es 8"
- difficultyLevel: "facil"
- lessonId: "lesson-123" (asociada a la lección de suma)
```

**Nota:** Puedes crear preguntas sin asignarlas a una lección inicialmente, y asignarlas después.

---

### **PASO 7: Asociar Lecciones a Módulos** 🔗

**¿Por qué séptimo?** Los módulos necesitan lecciones para tener contenido.

**Dónde:** Pestaña "Módulos" → Click en "Gestionar Lecciones" de un módulo

**Proceso:**
1. Ir a la lista de módulos
2. Click en el botón de "gestión de lecciones" (icono de lista/lecciones)
3. Seleccionar lecciones de la lista disponible
4. Establecer el `orderIndex` (orden dentro del módulo)
5. Guardar

**Ejemplo:**
```
Módulo: "Números Naturales"
  Lecciones (en orden):
    1. "Introducción a números naturales" (orderIndex: 1)
    2. "Suma de números naturales" (orderIndex: 2)
    3. "Resta de números naturales" (orderIndex: 3)
    4. "Multiplicación de números naturales" (orderIndex: 4)
```

**Nota:** Una lección puede estar en múltiples módulos. El `orderIndex` es específico de cada módulo.

---

### **PASO 8: Crear Cursos** 🎓

**¿Por qué octavo?** Los cursos agrupan módulos y son la unidad principal que los estudiantes ven.

**Dónde:** Pestaña "Cursos" en el admin panel

**Quién puede crear:** `teacher_admin` o `school_admin`

**Requisitos previos:**
- ✅ Competencias creadas
- ✅ Módulos creados (al menos uno)
- ✅ Módulos con lecciones asociadas (recomendado)

**Campos requeridos:**
- `title`: Título del curso
- `description`: Descripción
- `year`: Año escolar (6, 7, 8, 9, 10, 11)
- `competencyId`: Competencia (OBLIGATORIO)
- `moduleIds`: Array de IDs de módulos (al menos uno)

**Campos opcionales:**
- `schoolIds`: Array de IDs de colegios/entidades
  - Si está vacío: Curso general (disponible para todos)
  - Si tiene valores: Curso específico para esos colegios
- `isPublished`: Si está publicado (por defecto `false`)

**Proceso:**
1. Click en "Nuevo Curso"
2. Llenar título, descripción, año
3. Seleccionar competencia
4. **Seleccionar módulos** (múltiples, con checkboxes)
5. Opcionalmente seleccionar colegios/entidades (o dejar vacío para curso general)
6. Guardar

**Ejemplo:**
```
Curso: "Matemáticas 6to Grado"
- description: "Curso completo de matemáticas para sexto grado"
- year: 6
- competencyId: "matematicas"
- moduleIds: ["module-numeros-naturales", "module-fracciones", "module-geometria"]
- schoolIds: [] (curso general) o ["school-abc"] (específico)
```

**Reglas importantes:**
- Un curso debe tener **al menos un módulo**
- Un curso solo puede tener **una competencia**
- Puede haber **múltiples cursos** de la misma competencia/año, pero con diferentes módulos
- Si un curso tiene `schoolIds` vacío, es **general** (disponible para todos)

---

### **PASO 9: Crear Exámenes** 📝

**¿Por qué noveno?** Los exámenes evalúan el conocimiento y pueden estar asociados a cursos.

**Dónde:** Pestaña "Exámenes" o "Gestión Exámenes" en el admin panel

**Quién puede crear:** `teacher_admin` o `school_admin`

**Requisitos previos:**
- ✅ Cursos creados (opcional, algunos exámenes no requieren curso)
- ✅ Preguntas creadas

**Tipos de exámenes:**
- `simulacro_completo`: Simulacro completo tipo ICFES
- `diagnostico`: Examen diagnóstico
- `por_competencia`: Examen de una competencia específica
- `por_modulo`: Examen de un módulo específico

**Campos requeridos:**
- `title`: Título del examen
- `examType`: Tipo de examen
- `competencyId` o `courseId`: Al menos uno debe estar presente
- `academicGrade`: Grado académico (opcional)
- `passingScore`: Puntaje mínimo para aprobar (por defecto 70)

**Campos opcionales:**
- `description`: Descripción
- `timeLimitMinutes`: Tiempo límite
- `difficultyLevel`: Nivel de dificultad
- `isAdaptive`: Si es adaptativo
- `openDate`, `closeDate`: Fechas de apertura/cierre
- `isPublished`: Si está publicado

**Proceso:**
1. Click en "Nuevo Examen"
2. Seleccionar tipo de examen
3. Asociar a curso o competencia
4. Configurar preguntas (puede ser automático o manual)
5. Establecer tiempo límite y puntaje de aprobación
6. Guardar

**Ejemplo:**
```
Examen: "Simulacro ICFES - Matemáticas 6to"
- examType: "simulacro_completo"
- courseId: "course-matematicas-6to"
- academicGrade: "sexto"
- timeLimitMinutes: 120
- passingScore: 70
- isPublished: true
```

**Nota:** Los exámenes pueden generarse automáticamente desde preguntas de las lecciones del curso, o puedes crearlos manualmente.

---

### **PASO 10: Inscribir Estudiantes a Cursos** 🎯

**¿Por qué último?** Los estudiantes necesitan cursos publicados para inscribirse.

**Dónde:** 
- Desde el dashboard del estudiante (auto-inscripción)
- O desde el admin panel (inscripción manual)

**Requisitos previos:**
- ✅ Estudiantes creados
- ✅ Cursos creados y **publicados** (`isPublished = true`)

**Proceso (desde admin):**
1. Ir a la pestaña de estudiantes
2. Seleccionar un estudiante
3. Asociarlo a un curso (si hay funcionalidad para esto)
4. O el estudiante se auto-inscribe desde su dashboard

**Proceso (desde estudiante):**
1. El estudiante accede a su dashboard
2. Ve el catálogo de cursos disponibles
3. Filtra por competencia, grado, etc.
4. Click en "Inscribirse" en un curso
5. Se crea un `CourseEnrollment`

**Nota:** Cuando un estudiante se inscribe, se crean automáticamente:
- `CourseEnrollment`: Registro de inscripción
- `StudentCourseProgress`: Progreso del curso
- `StudentModuleProgress`: Progreso de cada módulo
- `StudentLessonProgress`: Progreso de cada lección

---

## 🔄 Flujo de Trabajo Recomendado

### **Fase 1: Configuración Base** (Pasos 1-3)
```
1. Competencias → 2. Colegios → 3. Usuarios
```
**Tiempo estimado:** 30-60 minutos

### **Fase 2: Contenido Educativo** (Pasos 4-7)
```
4. Módulos → 5. Lecciones → 6. Preguntas → 7. Asociar Lecciones a Módulos
```
**Tiempo estimado:** Varias horas (depende del contenido)

**Estrategia recomendada:**
- Crear módulos por competencia
- Crear lecciones temáticas
- Crear preguntas progresivamente (puedes empezar con pocas)
- Asociar lecciones a módulos según el orden lógico

### **Fase 3: Cursos y Evaluación** (Pasos 8-9)
```
8. Cursos → 9. Exámenes
```
**Tiempo estimado:** 1-2 horas

**Estrategia recomendada:**
- Crear cursos generales primero (sin asignar colegios)
- Luego crear cursos específicos si es necesario
- Publicar cursos cuando estén completos
- Crear exámenes después de que los cursos tengan contenido

### **Fase 4: Activación** (Paso 10)
```
10. Inscripciones de Estudiantes
```
**Tiempo estimado:** Continuo (los estudiantes se inscriben cuando quieren)

---

## 📊 Ejemplo Práctico Completo

### **Escenario:** Crear un curso completo de "Matemáticas 6to Grado"

#### **Paso 1: Competencias**
```
✅ Ya existen: "matematicas"
```

#### **Paso 2: Colegios**
```
✅ Crear: "Colegio Distrital Modelo"
   - type: "school"
   - city: "Bogotá"
```

#### **Paso 3: Usuarios**
```
✅ Crear school_admin: "Juan Admin"
   - schoolId: "colegio-modelo"
   
✅ Crear estudiantes: "María García", "Pedro López"
   - schoolId: "colegio-modelo"
   - academicGrade: "sexto"
```

#### **Paso 4: Módulos**
```
✅ Crear módulo: "Números Naturales"
   - competencyId: "matematicas"
   - estimatedTime: 120

✅ Crear módulo: "Fracciones"
   - competencyId: "matematicas"
   - estimatedTime: 150

✅ Crear módulo: "Geometría Básica"
   - competencyId: "matematicas"
   - estimatedTime: 180
```

#### **Paso 5: Lecciones**
```
✅ Crear lección: "Introducción a números naturales"
   - estimatedTimeMinutes: 30
   - theoryContent: "<p>Los números naturales son...</p>"

✅ Crear lección: "Suma de números naturales"
   - estimatedTimeMinutes: 25
   - theoryContent: "<p>Para sumar números naturales...</p>"

✅ Crear lección: "Concepto de fracción"
   - estimatedTimeMinutes: 35
   - theoryContent: "<p>Una fracción representa...</p>"

... (más lecciones)
```

#### **Paso 6: Preguntas**
```
✅ Crear pregunta: "¿Cuál es el resultado de 5 + 3?"
   - lessonId: "leccion-suma"
   - correctOption: "B"
   - optionB: "8"

✅ Crear pregunta: "¿Qué es una fracción?"
   - lessonId: "leccion-fraccion"
   - correctOption: "A"
   - optionA: "Una parte de un todo"

... (más preguntas)
```

#### **Paso 7: Asociar Lecciones a Módulos**
```
✅ Módulo "Números Naturales":
   - Lección "Introducción..." (orderIndex: 1)
   - Lección "Suma..." (orderIndex: 2)
   - Lección "Resta..." (orderIndex: 3)

✅ Módulo "Fracciones":
   - Lección "Concepto de fracción" (orderIndex: 1)
   - Lección "Suma de fracciones" (orderIndex: 2)
   - ...
```

#### **Paso 8: Crear Curso**
```
✅ Curso: "Matemáticas 6to Grado"
   - year: 6
   - competencyId: "matematicas"
   - moduleIds: ["modulo-numeros", "modulo-fracciones", "modulo-geometria"]
   - schoolIds: [] (curso general)
   - isPublished: true
```

#### **Paso 9: Crear Examen**
```
✅ Examen: "Simulacro Matemáticas 6to"
   - examType: "simulacro_completo"
   - courseId: "curso-matematicas-6to"
   - timeLimitMinutes: 120
   - isPublished: true
```

#### **Paso 10: Inscripciones**
```
✅ Estudiante "María García" se inscribe a "Matemáticas 6to Grado"
✅ Estudiante "Pedro López" se inscribe a "Matemáticas 6to Grado"
```

---

## ⚠️ Puntos Críticos y Validaciones

### **1. Dependencias Obligatorias**
- ❌ **No puedes crear un curso sin módulos**
- ❌ **No puedes crear un curso sin competencia**
- ❌ **No puedes crear un `school_admin` sin colegio**
- ❌ **No puedes crear un `student` sin colegio**
- ⚠️ **Puedes crear módulos sin lecciones** (pero no serán útiles)
- ⚠️ **Puedes crear lecciones sin módulos** (se asocian después)
- ⚠️ **Puedes crear preguntas sin lección** (se asocian después)

### **2. Publicación**
- Los cursos deben estar `isPublished = true` para que los estudiantes los vean
- Los módulos deben estar `isPublished = true` para aparecer en la selección de cursos
- Las lecciones deben estar `isPublished = true` para que los estudiantes las accedan

### **3. Visibilidad**
- **Cursos generales** (`schoolIds` vacío): Disponibles para todos los estudiantes
- **Cursos específicos** (`schoolIds` con valores): Solo para estudiantes de esos colegios
- **Estudiantes sin colegio**: Solo ven cursos generales

### **4. Orden Lógico**
- Los módulos dentro de un curso tienen `orderIndex` (orden de presentación)
- Las lecciones dentro de un módulo tienen `orderIndex` (orden de presentación)
- Las preguntas dentro de una lección tienen `orderIndex` (orden de presentación)

---

## 🚀 Checklist Rápido

Usa este checklist para verificar que tienes todo listo:

### **Configuración Base**
- [ ] Competencias ICFES creadas (mínimo 5)
- [ ] Al menos 1 colegio creado
- [ ] Al menos 1 `school_admin` creado
- [ ] Al menos 1 `student` creado

### **Contenido Mínimo**
- [ ] Al menos 1 módulo creado
- [ ] Al menos 1 lección creada
- [ ] Al menos 1 pregunta creada
- [ ] Lección asociada a módulo
- [ ] Pregunta asociada a lección

### **Cursos y Evaluación**
- [ ] Al menos 1 curso creado
- [ ] Curso tiene al menos 1 módulo
- [ ] Curso está publicado (`isPublished = true`)
- [ ] Al menos 1 examen creado (opcional)

### **Activación**
- [ ] Estudiante puede ver cursos disponibles
- [ ] Estudiante puede inscribirse a un curso
- [ ] Estudiante puede acceder a lecciones del curso

---

## 💡 Consejos y Mejores Prácticas

### **1. Empezar Pequeño**
- Crea 1-2 módulos completos primero
- Crea 1 curso con esos módulos
- Prueba el flujo completo antes de crear más contenido

### **2. Reutilización**
- Los módulos son reutilizables: crea módulos genéricos que puedas usar en múltiples cursos
- Ejemplo: Módulo "Fracciones" puede usarse en "Matemáticas 6to" y "Matemáticas 7mo"

### **3. Organización**
- Nombra los módulos de forma clara y descriptiva
- Usa competencias para organizar el contenido
- Mantén un orden lógico en `orderIndex`

### **4. Publicación Gradual**
- No publiques cursos hasta que tengan contenido completo
- Puedes crear módulos/lecciones sin publicar y publicarlos después
- Usa `isPublished = false` para contenido en desarrollo

### **5. Testing**
- Después de cada paso, verifica que puedas ver/editar lo que creaste
- Prueba el flujo desde la perspectiva del estudiante
- Verifica que los filtros funcionen correctamente

---

## 🔧 Scripts Útiles (Si Existen)

Si hay scripts de seed disponibles, puedes usarlos para:
- Crear competencias automáticamente
- Crear datos de prueba (estudiantes, módulos, etc.)
- Poblar la base de datos con contenido inicial

**Nota:** Verifica que los scripts estén actualizados con la nueva estructura de `CourseSchool`.

---

## 📞 Soporte

Si encuentras problemas en algún paso:
1. Verifica que cumpliste los requisitos previos
2. Revisa los mensajes de error en la consola
3. Verifica que los datos existen en la base de datos
4. Asegúrate de que los permisos del usuario sean correctos

---

## ✅ Resumen del Orden

```
1. Competencias (base de todo)
   ↓
2. Colegios (necesarios para usuarios)
   ↓
3. Usuarios (school_admin, students)
   ↓
4. Módulos (necesarios para cursos)
   ↓
5. Lecciones (contenido educativo)
   ↓
6. Preguntas (evaluación)
   ↓
7. Asociar Lecciones → Módulos
   ↓
8. Cursos (agrupan módulos)
   ↓
9. Exámenes (evalúan conocimiento)
   ↓
10. Inscripciones (estudiantes se inscriben)
```

¡Listo! Con este orden, la plataforma estará completamente funcional. 🎉

