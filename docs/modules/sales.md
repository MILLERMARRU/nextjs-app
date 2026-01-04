# 🛒 Módulo de Ventas

El módulo de Ventas permite registrar, consultar y gestionar todas las transacciones de venta.

---

## Información General

| Atributo | Valor |
|----------|-------|
| **Ruta** | `/ventas` |
| **Archivo** | `app/ventas/page.tsx` |
| **Tipo** | Client Component (`"use client"`) |
| **Estado** | MVP - Datos estáticos con filtros |

---

## Funcionalidades

### Implementadas ✅
- Listado de ventas en tabla
- Filtros por estado (Todas, Completada, Pendiente, Cancelada)
- Estadísticas principales
- Badges de estado con colores
- Detalle de productos por venta

### Pendientes 🚧
- Crear nueva venta
- Editar/Cancelar ventas
- Búsqueda por cliente
- Exportar a PDF/Excel
- Paginación

---

## Modelo de Datos

### Interface TypeScript

```typescript
interface Venta {
  id: number;
  fecha: string;           // Formato: "YYYY-MM-DD"
  cliente: string;
  productos: string[];     // Lista de nombres de productos
  total: number;           // En soles (S/)
  estado: "completada" | "pendiente" | "cancelada";
}
```

### Datos de Ejemplo

```typescript
const ventasData: Venta[] = [
  { 
    id: 1, 
    fecha: "2026-04-01", 
    cliente: "Juan Pérez", 
    productos: ["Laptop HP", "Mouse Logitech"], 
    total: 2585, 
    estado: "completada" 
  },
  { 
    id: 2, 
    fecha: "2026-04-01", 
    cliente: "María García", 
    productos: ["Teclado Mecánico"], 
    total: 320, 
    estado: "completada" 
  },
  // ... más ventas
];
```

---

## Estados de Venta

| Estado | Descripción | Color | Icono |
|--------|-------------|-------|-------|
| `completada` | Venta finalizada y pagada | 🟢 Verde | ✓ |
| `pendiente` | Venta creada, pendiente de pago | 🟡 Amarillo | ⏳ |
| `cancelada` | Venta anulada | 🔴 Rojo | ✗ |

### Estilos por Estado
```typescript
const getEstadoStyle = (estado: string) => {
  switch (estado) {
    case "completada":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "pendiente":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    case "cancelada":
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-zinc-100 text-zinc-700";
  }
};
```

---

## Estructura de la Página

### Layout General
```
┌─────────────────────────────────────────────────────────┐
│ Ventas                               [+ Nueva Venta]    │
├─────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│ │Ventas Hoy│ │ Total    │ │Pendientes│ │ Promedio │     │
│ │    2     │ │S/ 6,925  │ │    1     │ │S/ 1,385  │     │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
├─────────────────────────────────────────────────────────┤
│ [Todas] [Completada] [Pendiente] [Cancelada]           │
├─────────────────────────────────────────────────────────┤
│ ID    | Fecha      | Cliente  | Productos | Total | Est│
│ #0001 | 2026-04-01 | Juan P.  | Laptop... | 2,585 | ✓  │
│ #0002 | 2026-04-01 | María G. | Teclado   |   320 | ✓  │
│ ...                                                     │
└─────────────────────────────────────────────────────────┘
```

---

## Estadísticas

### Métricas Calculadas

| Métrica | Fórmula | Valor Demo |
|---------|---------|------------|
| Ventas Hoy | `filter(fecha === hoy).length` | 2 |
| Total Completadas | `Σ(completadas.total)` | S/ 6,925 |
| Pendientes | `filter(pendiente).length` | 1 |
| Promedio por Venta | `total / count` | S/ 1,385 |

### Implementación
```typescript
const totalVentas = ventasData
  .filter(v => v.estado === "completada")
  .reduce((acc, v) => acc + v.total, 0);

const promedioVenta = Math.round(
  totalVentas / ventasData.filter(v => v.estado === "completada").length
);
```

---

## Sistema de Filtros

### Estado del Filtro
```typescript
const [filtro, setFiltro] = useState("todas");

const ventasFiltradas = filtro === "todas" 
  ? ventasData 
  : ventasData.filter(v => v.estado === filtro);
```

### Botones de Filtro
```typescript
const filtros = ["todas", "completada", "pendiente", "cancelada"];

{filtros.map((estado) => (
  <button
    key={estado}
    onClick={() => setFiltro(estado)}
    className={filtro === estado 
      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" 
      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
    }
  >
    {estado.charAt(0).toUpperCase() + estado.slice(1)}
  </button>
))}
```

---

## Tabla de Ventas

### Columnas

| Columna | Campo | Formato |
|---------|-------|---------|
| ID | `id` | `#0001` (padded) |
| Fecha | `fecha` | `YYYY-MM-DD` |
| Cliente | `cliente` | Texto |
| Productos | `productos` | `producto1, producto2` |
| Total | `total` | `S/ X,XXX` |
| Estado | `estado` | Badge con color |
| Acciones | - | Link "Ver detalle" |

### Formato de ID
```typescript
const formatId = (id: number) => `#${id.toString().padStart(4, "0")}`;
// Ejemplo: 1 → "#0001"
```

---

## Componente Principal

```typescript
"use client";

import { useState } from "react";

export default function VentasPage() {
  const [filtro, setFiltro] = useState("todas");

  const ventasFiltradas = filtro === "todas" 
    ? ventasData 
    : ventasData.filter(v => v.estado === filtro);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* Estadísticas */}
        {/* Filtros */}
        {/* Tabla */}
      </div>
    </div>
  );
}
```

---

## Estilos de la Tabla

```css
/* Tabla */
.sales-table {
  @apply w-full;
}

/* Header */
.table-header {
  @apply bg-zinc-50 dark:bg-zinc-700;
}

.table-th {
  @apply px-6 py-4 text-left text-xs font-semibold 
         text-zinc-500 dark:text-zinc-300 
         uppercase tracking-wider;
}

/* Rows */
.table-row {
  @apply hover:bg-zinc-50 dark:hover:bg-zinc-700/50;
}

.table-td {
  @apply px-6 py-4 text-sm;
}

/* Divider */
.table-body {
  @apply divide-y divide-zinc-200 dark:divide-zinc-700;
}
```

---

## API Futura

### Endpoints Planificados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/ventas` | Listar ventas |
| GET | `/api/ventas/:id` | Obtener venta |
| POST | `/api/ventas` | Crear venta |
| PUT | `/api/ventas/:id` | Actualizar venta |
| PATCH | `/api/ventas/:id/cancel` | Cancelar venta |

### Query Parameters
```
GET /api/ventas?estado=completada&fecha_desde=2026-04-01&limite=10
```

---

## Mejoras Futuras

- [ ] Modal para crear nueva venta
- [ ] Selección de productos desde inventario
- [ ] Cálculo automático de totales
- [ ] Aplicar descuentos
- [ ] Múltiples métodos de pago
- [ ] Impresión de comprobante
- [ ] Historial de cambios
- [ ] Devoluciones
- [ ] Reportes por período

---

<div align="center">

[← Módulo de Productos](./products.md) | [Volver al Índice](../README.md) | [Módulo de Caja →](./cash-register.md)

</div>
