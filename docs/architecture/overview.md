# 🏗️ Arquitectura del Sistema

Visión general de la arquitectura técnica del Sistema de Gestión de Negocios.

---

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    NAVEGADOR                         │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │              NEXT.JS APP                       │  │   │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐       │  │   │
│  │  │  │ Dashboard│ │ Productos│ │  Ventas  │       │  │   │
│  │  │  └──────────┘ └──────────┘ └──────────┘       │  │   │
│  │  │  ┌──────────┐ ┌──────────────────────┐        │  │   │
│  │  │  │   Caja   │ │     Componentes      │        │  │   │
│  │  │  └──────────┘ │   (Navbar, etc.)     │        │  │   │
│  │  │               └──────────────────────┘        │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      SERVIDOR (Futuro)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   API ROUTES                         │   │
│  │  /api/productos  /api/ventas  /api/caja             │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    BASE DE DATOS                     │   │
│  │                  (PostgreSQL/Prisma)                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Stack Tecnológico

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 16.1.1 | Framework React con SSR/SSG |
| **React** | 19.2.3 | Biblioteca de UI |
| **TypeScript** | 5.x | Tipado estático |
| **TailwindCSS** | 4.x | Framework de estilos |

### Herramientas de Desarrollo

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| **ESLint** | 9.x | Linting de código |
| **PostCSS** | - | Procesamiento CSS |
| **Node.js** | 18+ | Runtime de JavaScript |

### Futuro (Planificado)

| Tecnología | Propósito |
|------------|-----------|
| **Prisma** | ORM para base de datos |
| **PostgreSQL** | Base de datos relacional |
| **NextAuth.js** | Autenticación |
| **Zod** | Validación de esquemas |

---

## Patrones de Arquitectura

### 1. App Router (Next.js 13+)

El proyecto utiliza el nuevo App Router de Next.js basado en el sistema de archivos.

```
app/
├── page.tsx          → Ruta: /
├── layout.tsx        → Layout global
├── productos/
│   └── page.tsx      → Ruta: /productos
├── ventas/
│   └── page.tsx      → Ruta: /ventas
└── caja/
    └── page.tsx      → Ruta: /caja
```

### 2. Server Components vs Client Components

| Tipo | Uso | Directiva |
|------|-----|-----------|
| **Server Component** | Renderizado en servidor, sin estado | Por defecto |
| **Client Component** | Interactividad, hooks de React | `"use client"` |

**Ejemplo de uso:**
```typescript
// Server Component (por defecto)
// app/page.tsx
export default function Home() {
  return <div>Dashboard</div>;
}

// Client Component
// app/ventas/page.tsx
"use client";
import { useState } from "react";
export default function VentasPage() {
  const [filtro, setFiltro] = useState("todas");
  return <div>...</div>;
}
```

### 3. Composición de Componentes

```
┌─────────────────────────────────────┐
│              Layout                 │
│  ┌───────────────────────────────┐  │
│  │            Navbar             │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │            Page               │  │
│  │                               │  │
│  │  ┌─────────┐  ┌─────────┐    │  │
│  │  │Component│  │Component│    │  │
│  │  └─────────┘  └─────────┘    │  │
│  │                               │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## Flujo de Datos

### Estado Actual (MVP)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Datos Mock  │ ──▶ │  Componente  │ ──▶ │    Vista     │
│  (Hardcoded) │     │    React     │     │    HTML      │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Estado Futuro (Con API)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│     Base     │ ◀─▶ │  API Routes  │ ◀─▶ │  Componente  │
│   de Datos   │     │   Next.js    │     │    React     │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │    Vista     │
                                          │    HTML      │
                                          └──────────────┘
```

---

## Estructura de Carpetas

```
nextjs-app/
├── app/                      # Código fuente principal
│   ├── page.tsx              # Página principal (Dashboard)
│   ├── layout.tsx            # Layout raíz
│   ├── globals.css           # Estilos globales
│   ├── favicon.ico           # Favicon
│   │
│   ├── components/           # Componentes compartidos
│   │   └── Navbar.tsx        # Barra de navegación
│   │
│   ├── productos/            # Módulo de productos
│   │   └── page.tsx
│   │
│   ├── ventas/               # Módulo de ventas
│   │   └── page.tsx
│   │
│   └── caja/                 # Módulo de caja
│       └── page.tsx
│
├── public/                   # Archivos estáticos
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── docs/                     # Documentación
│   ├── README.md
│   ├── getting-started/
│   ├── modules/
│   ├── architecture/
│   └── ...
│
├── package.json              # Dependencias y scripts
├── package-lock.json         # Lock de versiones
├── tsconfig.json             # Configuración TypeScript
├── next.config.ts            # Configuración Next.js
├── postcss.config.mjs        # Configuración PostCSS
├── eslint.config.mjs         # Configuración ESLint
└── README.md                 # Documentación principal
```

---

## Convenciones de Código

### Nomenclatura

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Componentes | PascalCase | `ProductoCard.tsx` |
| Páginas | page.tsx | `app/productos/page.tsx` |
| Hooks | camelCase con "use" | `useProductos.ts` |
| Utilidades | camelCase | `formatPrice.ts` |
| Constantes | UPPER_SNAKE_CASE | `MAX_ITEMS` |
| Interfaces | PascalCase con "I" | `IProducto` |

### Estructura de Componente

```typescript
// 1. Directiva (si es necesaria)
"use client";

// 2. Importaciones
import { useState } from "react";
import Link from "next/link";

// 3. Tipos/Interfaces
interface Props {
  title: string;
}

// 4. Componente
export default function ComponentName({ title }: Props) {
  // 4.1 Estado
  const [state, setState] = useState();

  // 4.2 Efectos (si aplica)
  
  // 4.3 Handlers
  const handleClick = () => {};

  // 4.4 Render
  return (
    <div>
      {title}
    </div>
  );
}
```

---

## Principios de Diseño

### 1. Separación de Responsabilidades
Cada módulo maneja su propia lógica y UI.

### 2. Componentes Reutilizables
Componentes comunes en `/components`.

### 3. Tipado Estricto
TypeScript en todo el código.

### 4. Mobile First
Diseño responsive desde móvil.

### 5. Dark Mode Support
Soporte nativo para modo oscuro.

---

## Decisiones Técnicas

| Decisión | Justificación |
|----------|---------------|
| Next.js App Router | Mejor rendimiento y características modernas |
| TailwindCSS | Desarrollo rápido y consistente |
| TypeScript | Prevención de errores y mejor DX |
| Server Components | Mejor rendimiento inicial |
| Datos Mock | MVP rápido sin backend |

---

<div align="center">

[← Volver al Índice](../README.md) | [Estructura del Proyecto →](./project-structure.md)

</div>
