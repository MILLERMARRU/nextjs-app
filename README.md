# Sistema de Gestión de Negocios - Next.js App

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)

**Sistema completo de gestión para pequeños y medianos negocios**

[Ver Demo](#instalación) • [Documentación](#módulos) • [Contribuir](#contribución)

</div>

---

## 📋 Product Requirements Document (PRD)

### 1. Visión General

#### 1.1 Propósito
Sistema de gestión integral diseñado para pequeños y medianos negocios que permite administrar inventario de productos, registrar ventas y controlar el flujo de caja de manera eficiente y centralizada.

#### 1.2 Problema que Resuelve
- **Desorganización del inventario**: Dificultad para conocer el stock actual y valor del inventario
- **Control de ventas deficiente**: Falta de registro histórico y seguimiento de transacciones
- **Gestión de caja manual**: Errores en el control de ingresos y egresos diarios
- **Falta de visibilidad**: Ausencia de métricas y KPIs del negocio en tiempo real

#### 1.3 Público Objetivo
- Dueños de tiendas minoristas
- Pequeños comerciantes
- Emprendedores con negocios físicos
- Administradores de puntos de venta

---

### 2. Objetivos del Producto

| Objetivo | Métrica de Éxito | Prioridad |
|----------|------------------|-----------|
| Centralizar gestión de inventario | 100% productos registrados digitalmente | Alta |
| Automatizar registro de ventas | Reducción 80% tiempo de registro | Alta |
| Control preciso de caja | Cuadre diario exacto | Alta |
| Dashboard de métricas | Visualización en tiempo real | Media |
| Experiencia de usuario fluida | < 3 clics para acciones principales | Media |

---

### 3. Alcance del Proyecto

#### 3.1 Incluido (In Scope)
- ✅ Gestión de productos e inventario
- ✅ Registro y seguimiento de ventas
- ✅ Control de caja (ingresos/egresos)
- ✅ Dashboard con métricas principales
- ✅ Interfaz responsive (desktop y móvil)
- ✅ Modo claro/oscuro
- ✅ Diseño moderno con TailwindCSS

#### 3.2 No Incluido (Out of Scope) - Versión Actual
- ❌ Autenticación de usuarios
- ❌ Persistencia en base de datos
- ❌ Reportes exportables (PDF/Excel)
- ❌ Multi-sucursal
- ❌ Integración con sistemas de facturación
- ❌ API REST para integraciones externas

---

### 4. Módulos del Sistema

#### 4.1 📦 Módulo de Productos
**Ruta:** `/productos`

**Funcionalidades:**
- Listado de productos en tarjetas visuales
- Visualización de categorías
- Indicadores de stock (verde/amarillo/rojo)
- Precio unitario en soles (S/)
- Acciones: Editar, Vender

**Resumen de Inventario:**
- Total de productos
- Valor total del inventario
- Unidades totales en stock

**Modelo de Datos:**
```typescript
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}
```

---

#### 4.2 🛒 Módulo de Ventas
**Ruta:** `/ventas`

**Funcionalidades:**
- Tabla de ventas con filtros por estado
- Estados: Completada, Pendiente, Cancelada
- Información de cliente y productos
- Historial con fecha y hora

**Estadísticas:**
- Ventas del día
- Total ventas completadas
- Ventas pendientes
- Promedio por venta

**Modelo de Datos:**
```typescript
interface Venta {
  id: number;
  fecha: string;
  cliente: string;
  productos: string[];
  total: number;
  estado: "completada" | "pendiente" | "cancelada";
}
```

---

#### 4.3 💵 Módulo de Caja
**Ruta:** `/caja`

**Funcionalidades:**
- Registro de ingresos y egresos
- Modal para nuevos movimientos
- Múltiples métodos de pago (Efectivo, Tarjeta, Yape, Transferencia)
- Historial de movimientos del día
- Cierre de caja

**Métricas:**
- Caja inicial
- Total ingresos
- Total egresos
- Saldo actual
- Desglose por método de pago

**Modelo de Datos:**
```typescript
interface Movimiento {
  id: number;
  tipo: "ingreso" | "egreso";
  concepto: string;
  monto: number;
  hora: string;
  metodo: "Efectivo" | "Tarjeta" | "Yape" | "Transferencia";
}
```

---

#### 4.4 🏠 Dashboard Principal
**Ruta:** `/`

**Funcionalidades:**
- Resumen general con KPIs principales
- Accesos rápidos a módulos
- Feed de actividad reciente
- Indicadores visuales con gradientes

**KPIs Mostrados:**
- Total de productos
- Ventas del mes
- Saldo en caja

---

### 5. Arquitectura Técnica

#### 5.1 Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Next.js | 16.1.1 | Framework React con App Router |
| React | 19.2.3 | Librería de UI |
| TypeScript | 5.x | Tipado estático |
| TailwindCSS | 4.x | Estilos utilitarios |
| ESLint | 9.x | Linting de código |

#### 5.2 Estructura del Proyecto

```
nextjs-app/
├── app/
│   ├── page.tsx              # Dashboard principal
│   ├── layout.tsx            # Layout con Navbar
│   ├── globals.css           # Estilos globales
│   ├── components/
│   │   └── Navbar.tsx        # Barra de navegación
│   ├── productos/
│   │   └── page.tsx          # Módulo de productos
│   ├── ventas/
│   │   └── page.tsx          # Módulo de ventas
│   └── caja/
│       └── page.tsx          # Módulo de caja
├── public/                   # Archivos estáticos
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── postcss.config.mjs
```

#### 5.3 Patrones de Diseño
- **App Router**: Enrutamiento basado en archivos de Next.js 13+
- **Server Components**: Componentes renderizados en servidor por defecto
- **Client Components**: Uso de `"use client"` para interactividad (useState)
- **Responsive Design**: Mobile-first con breakpoints de Tailwind

---

### 6. Diseño de UI/UX

#### 6.1 Sistema de Diseño

**Colores principales:**
- Primario: Azul (`blue-600`)
- Éxito: Verde (`green-600`)
- Alerta: Amarillo (`yellow-600`)
- Error: Rojo (`red-600`)
- Neutral: Zinc (`zinc-50` a `zinc-900`)

**Componentes UI:**
- Cards con sombras y bordes redondeados (`rounded-xl shadow-md`)
- Botones con estados hover y transiciones
- Tablas con encabezados destacados
- Badges de estado con colores semánticos
- Modales centrados con backdrop

#### 6.2 Características de Accesibilidad
- Soporte para modo oscuro (`dark:`)
- Contraste adecuado de colores
- Hover states visibles
- Estructura semántica HTML

---

### 7. Roadmap de Desarrollo

#### Fase 1: MVP (Actual) ✅
- [x] Estructura base del proyecto
- [x] Dashboard con métricas
- [x] Módulo de productos (visualización)
- [x] Módulo de ventas (visualización con filtros)
- [x] Módulo de caja (visualización y modal)
- [x] Navegación entre módulos
- [x] Diseño responsive

#### Fase 2: Persistencia (Próximo)
- [ ] Integración con base de datos (Prisma + PostgreSQL)
- [ ] API Routes para CRUD
- [ ] Validación de formularios
- [ ] Estados de carga y error

#### Fase 3: Autenticación
- [ ] Login/Registro de usuarios
- [ ] Roles y permisos
- [ ] Sesiones seguras

#### Fase 4: Funcionalidades Avanzadas
- [ ] Reportes exportables
- [ ] Gráficos y analytics
- [ ] Notificaciones de stock bajo
- [ ] Búsqueda y filtros avanzados

---

### 8. Requisitos No Funcionales

| Requisito | Especificación |
|-----------|----------------|
| Rendimiento | First Contentful Paint < 1.5s |
| Compatibilidad | Chrome, Firefox, Safari, Edge (últimas 2 versiones) |
| Responsive | Desktop, Tablet, Mobile |
| Accesibilidad | WCAG 2.1 Nivel AA |
| SEO | Meta tags básicos |

---

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Pasos

```bash
# Clonar repositorio
git clone https://github.com/MILLERMARRU/nextjs-app.git

# Entrar al directorio
cd nextjs-app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Construye para producción |
| `npm run start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint |

---

## 🤝 Contribución

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👤 Autor

**MILLERMARRU**
- GitHub: [@MILLERMARRU](https://github.com/MILLERMARRU)

---

<div align="center">

Hecho con ❤️ usando Next.js y TailwindCSS

</div>
