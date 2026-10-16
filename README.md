<div align="center">

# The Hub

### Tu portal personal de proyectos

[![Astro](https://img.shields.io/badge/Astro-4.x-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br />

*Un dashboard de portfolio con layout masonry y drag-and-drop, construido siguiendo los mas altos estandares de desarrollo de software.*

[Reportar Bug](https://github.com/davilex7/The_Hub/issues) · [Solicitar Feature](https://github.com/davilex7/The_Hub/issues)

<br />

</div>

---

<br />

# Guia de Usuario

## Que es The Hub?

**The Hub** es tu centro de control personal para mostrar y organizar tus proyectos de desarrollo. Piensa en el como tu portfolio interactivo donde puedes:

- **Ver todos tus proyectos** de un vistazo con previsualizaciones visuales
- **Reorganizar las cards** arrastandolas a tu gusto
- **Acceder rapidamente** a los repositorios de cada proyecto
- **Disfrutar del modo oscuro** automatico segun tu sistema

## Como usar The Hub

### Navegar por tus proyectos

Simplemente desplazate por la pagina para ver todas las cards de proyectos. Cada card muestra:

| Elemento | Descripcion |
|----------|-------------|
| **Preview** | Imagen o GIF mostrando el proyecto |
| **Titulo** | Nombre del proyecto |
| **Descripcion** | Breve explicacion de que hace |
| **Tecnologias** | Tags con las tecnologias utilizadas |
| **Badge Featured** | Indica proyectos destacados |

### Abrir un proyecto

**Click** en cualquier card para abrir el repositorio del proyecto en una nueva pestana.

### Reorganizar las cards

1. **Manten pulsado** sobre una card
2. **Arrastra** hacia la posicion deseada
3. **Suelta** para confirmar la nueva posicion

> **Tip:** El orden que establezcas se guarda automaticamente y persistira cuando vuelvas a visitar la pagina.

### Accesibilidad

The Hub es totalmente accesible por teclado:

| Tecla | Accion |
|-------|--------|
| `Tab` | Navegar entre cards |
| `Enter` / `Espacio` | Abrir el proyecto |
| `Flechas` | Mover cards durante el arrastre |

---

<br />

# Documentacion Tecnica

## Indice

1. [Arquitectura](#arquitectura)
2. [Stack Tecnologico](#stack-tecnologico)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Principios de Diseno](#principios-de-diseno)
5. [Sistema de Diseno](#sistema-de-diseno)
6. [Instalacion](#instalacion)
7. [Scripts Disponibles](#scripts-disponibles)
8. [Configuracion](#configuracion)
9. [Anadir Nuevos Proyectos](#anadir-nuevos-proyectos)
10. [Contribuir](#contribuir)

---

## Arquitectura

The Hub implementa una **Arquitectura Hexagonal** (tambien conocida como Ports & Adapters) combinada con principios de **Clean Architecture**. Esto garantiza:

- Independencia del framework
- Testabilidad
- Independencia de la UI
- Independencia de la base de datos
- Independencia de agentes externos

### Diagrama de Capas

```
+-------------------------------------------------------------+
|                         UI LAYER                            |
|  (React Components, Astro Pages, Hooks, Context)            |
+-------------------------------------------------------------+
|                    APPLICATION LAYER                        |
|  (Use Cases, Services)                                      |
+-------------------------------------------------------------+
|                      DOMAIN LAYER                           |
|  (Entities, Value Objects, Types)                           |
+-------------------------------------------------------------+
|                   INFRASTRUCTURE LAYER                      |
|  (Repositories, Persistence, Mappers)                       |
+-------------------------------------------------------------+
```

### Flujo de Dependencias

```
UI --> Application --> Domain <-- Infrastructure
            |              ^
          Ports -----------+
```

> **Regla critica:** Las dependencias siempre apuntan hacia el centro (Domain). El dominio NO conoce nada del exterior.

---

## Stack Tecnologico

### Core

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| **Astro** | 4.x | Framework principal, generacion estatica |
| **React** | 18.x | Componentes interactivos (Islands) |
| **TypeScript** | 5.x | Tipado estricto en todo el proyecto |

### Styling

| Tecnologia | Proposito |
|------------|-----------|
| **CSS Modules** | Scoping de estilos por componente |
| **CSS Custom Properties** | Design tokens |
| **PostCSS** | Procesamiento de CSS |

### Funcionalidad

| Tecnologia | Proposito |
|------------|-----------|
| **dnd-kit** | Drag & drop accesible y performante |
| **localStorage** | Persistencia del orden de cards |

### Tooling

| Herramienta | Configuracion |
|-------------|---------------|
| **ESLint** | Reglas estrictas + plugins React/a11y |
| **Prettier** | Formateo consistente |
| **TypeScript** | Modo estricto habilitado |

---

## Estructura del Proyecto

```
src/
|-- core/                          # Capa de Dominio y Aplicacion
|   |-- domain/
|   |   |-- entities/
|   |   |   +-- Project.ts         # Entidad principal inmutable
|   |   |-- value-objects/
|   |   |   |-- ProjectId.ts       # ID unico validado
|   |   |   |-- Url.ts             # URL validada
|   |   |   |-- ImagePath.ts       # Ruta de imagen validada
|   |   |   +-- Technology.ts      # Tecnologia normalizada
|   |   +-- types/
|   |       +-- index.ts           # Tipos compartidos
|   |
|   |-- application/
|   |   |-- use-cases/
|   |   |   |-- GetAllProjects.ts
|   |   |   |-- GetProjectById.ts
|   |   |   |-- FilterProjectsByTechnology.ts
|   |   |   +-- ReorderProjects.ts
|   |   +-- services/
|   |       +-- ProjectOrderService.ts
|   |
|   +-- ports/                     # Interfaces (Contratos)
|       |-- ProjectRepository.ts
|       +-- OrderPersistence.ts
|
|-- infrastructure/                # Implementaciones Concretas
|   |-- repositories/
|   |   +-- JsonProjectRepository.ts
|   |-- persistence/
|   |   +-- LocalStorageOrderPersistence.ts
|   +-- mappers/
|       +-- ProjectMapper.ts
|
|-- ui/                            # Capa de Presentacion
|   |-- components/
|   |   |-- atoms/                 # Componentes basicos
|   |   |   |-- Button/
|   |   |   |-- Icon/
|   |   |   |-- Image/
|   |   |   |-- Link/
|   |   |   |-- Tag/
|   |   |   +-- Text/
|   |   |-- molecules/             # Composiciones de atoms
|   |   |   |-- ProjectCard/
|   |   |   +-- TechnologyBadge/
|   |   |-- organisms/             # Secciones completas
|   |   |   |-- ProjectGrid/
|   |   |   |-- Header/
|   |   |   +-- Footer/
|   |   +-- templates/
|   |       +-- DashboardLayout/
|   |
|   |-- hooks/                     # Custom hooks
|   |   |-- useProjects.ts
|   |   |-- useLocalStorage.ts
|   |   +-- useMediaQuery.ts
|   |
|   |-- context/
|   |   +-- ProjectsContext.tsx
|   |
|   +-- styles/
|       |-- tokens/                # Design tokens
|       |   |-- colors.css
|       |   |-- spacing.css
|       |   |-- typography.css
|       |   |-- shadows.css
|       |   |-- animations.css
|       |   +-- ...
|       +-- base/
|           |-- reset.css
|           +-- global.css
|
|-- config/
|   |-- constants.ts               # Configuracion de la app
|   +-- dependencies.ts            # Inyeccion de dependencias
|
|-- data/
|   +-- projects.json              # Datos de los proyectos
|
+-- pages/
    +-- index.astro                # Pagina principal
```

---

## Principios de Diseno

### SOLID

#### Single Responsibility Principle (SRP)

```typescript
// Cada clase tiene una unica responsabilidad
class GetAllProjects {
  execute(): Promise<Project[]> { /* solo obtiene proyectos */ }
}

class ReorderProjects {
  execute(order: ProjectId[]): void { /* solo reordena */ }
}
```

#### Open/Closed Principle (OCP)

```typescript
// Abierto para extension, cerrado para modificacion
interface ProjectRepository {
  findAll(): Promise<Project[]>;
}

// Nueva implementacion sin modificar la interfaz
class ApiProjectRepository implements ProjectRepository { }
class JsonProjectRepository implements ProjectRepository { }
```

#### Liskov Substitution Principle (LSP)

```typescript
// Las implementaciones son intercambiables
const repo: ProjectRepository = new JsonProjectRepository(data);
// Podria ser ApiProjectRepository sin cambiar el codigo que lo usa
```

#### Interface Segregation Principle (ISP)

```typescript
// Interfaces pequenas y especificas
interface OrderPersistence {
  save(order: ProjectId[]): void;
  load(): ProjectId[] | null;
  clear(): void;
}
// No forzamos metodos que no se necesitan
```

#### Dependency Inversion Principle (DIP)

```typescript
// Dependemos de abstracciones, no de implementaciones
class GetAllProjects {
  constructor(
    private readonly repository: ProjectRepository,  // interfaz
    private readonly persistence: OrderPersistence   // interfaz
  ) {}
}
```

### Otros Principios Aplicados

| Principio | Aplicacion |
|-----------|------------|
| **DRY** | Hooks reutilizables, tokens de diseno |
| **KISS** | Componentes simples y enfocados |
| **Composition over Inheritance** | Atomic Design, hooks |
| **Fail Fast** | Value Objects con validacion |
| **Immutability** | Entidades y Value Objects inmutables |

---

## Sistema de Diseno

### Design Tokens

Todos los valores de diseno estan centralizados como CSS Custom Properties:

```css
/* Espaciado (escala de 4px) */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-4: 1rem;      /* 16px */
--space-8: 4rem;      /* 64px */

/* Tipografia fluida con clamp() */
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);

/* Colores semanticos */
--color-background: var(--color-gray-50);
--color-surface: white;
--color-text-primary: var(--color-gray-900);
```

### Restriccion de Medidas

> **PROHIBIDO:** Usar `px` para dimensiones de layout

| Permitido | Uso |
|-----------|-----|
| `rem` | Espaciados, tamanos de fuente |
| `em` | Espaciados relativos al elemento |
| `%` | Anchos relativos |
| `vw`, `vh`, `dvh` | Dimensiones de viewport |
| `fr` | Distribucion en grid |
| `clamp()` | Valores fluidos |

**Unica excepcion:** `0.0625rem` (1px) para bordes finos, documentado en cada uso.

### Atomic Design

```
Atoms --> Molecules --> Organisms --> Templates --> Pages
  |           |             |             |           |
Button    ProjectCard   ProjectGrid   Dashboard   index.astro
  Icon     TechBadge      Header
  Text                    Footer
```

---

## Instalacion

### Requisitos Previos

- Node.js 18.x o superior
- npm 9.x o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/davilex7/The_Hub.git

# 2. Entrar al directorio
cd The_Hub

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicacion estara disponible en `http://localhost:4321`

---

## Scripts Disponibles

| Script | Descripcion |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de produccion |
| `npm run preview` | Previsualiza el build de produccion |
| `npm run lint` | Ejecuta ESLint |
| `npm run lint:fix` | Corrige errores de ESLint automaticamente |
| `npm run format` | Formatea el codigo con Prettier |
| `npm run typecheck` | Verifica tipos de TypeScript |

---

## Configuracion

### Configuracion de la Aplicacion

Edita `src/config/constants.ts`:

```typescript
export const APP_CONFIG = {
  siteName: 'The Hub',
  siteDescription: 'A showcase of my development projects',
  authorName: 'Tu Nombre',
  authorGithub: 'https://github.com/tu-usuario',
} as const;
```

### TypeScript

El proyecto usa configuracion estricta. Ver `tsconfig.json` para detalles completos.

Opciones clave habilitadas:
- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- `noUncheckedIndexedAccess: true`

---

## Anadir Nuevos Proyectos

### 1. Anadir la imagen de preview

Coloca tu imagen en `public/previews/`:

```
public/previews/mi-proyecto.png
```

Formatos soportados: `.png`, `.jpg`, `.webp`, `.gif`, `.svg`

### 2. Anadir los datos del proyecto

Edita `src/data/projects.json`:

```json
{
  "projects": [
    {
      "id": "mi-proyecto",
      "name": "Mi Proyecto Increible",
      "description": "Descripcion breve pero informativa del proyecto.",
      "repositoryUrl": "https://github.com/usuario/mi-proyecto",
      "previewImage": "/previews/mi-proyecto.png",
      "previewType": "image",
      "technologies": ["React", "TypeScript", "Node.js"],
      "featured": true,
      "createdAt": "2024-01-15"
    }
  ]
}
```

### Campos del Proyecto

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `id` | `string` | Identificador unico (slug) |
| `name` | `string` | Nombre para mostrar |
| `description` | `string` | Descripcion (max. ~150 caracteres) |
| `repositoryUrl` | `string` | URL del repositorio |
| `previewImage` | `string` | Ruta a la imagen de preview |
| `previewType` | `"image" \| "gif" \| "video"` | Tipo de preview |
| `technologies` | `string[]` | Lista de tecnologias |
| `featured` | `boolean` | Proyecto destacado? |
| `createdAt` | `string` | Fecha de creacion (ISO 8601) |

---

## Contribuir

### Workflow

1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit de cambios: `git commit -m 'feat: anadir nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

### Convencion de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

| Tipo | Descripcion |
|------|-------------|
| `feat` | Nueva funcionalidad |
| `fix` | Correccion de bug |
| `docs` | Documentacion |
| `style` | Formateo, sin cambios de codigo |
| `refactor` | Refactorizacion |
| `test` | Anadir tests |
| `chore` | Tareas de mantenimiento |

### Checklist de PR

- [ ] TypeScript sin errores (`npm run typecheck`)
- [ ] ESLint sin warnings (`npm run lint`)
- [ ] Prettier aplicado (`npm run format`)
- [ ] Build exitoso (`npm run build`)
- [ ] Funcionalidad probada manualmente

---

<div align="center">

## Licencia

Este proyecto esta bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para mas detalles.

---

**Hecho con mass y mucho cafe**

[Volver arriba](#the-hub)

</div>
