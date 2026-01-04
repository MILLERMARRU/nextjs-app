# 🏠 Dashboard Principal

El Dashboard es la página de inicio del sistema que proporciona una vista general del estado del negocio.

---

## Información General

| Atributo | Valor |
|----------|-------|
| **Ruta** | `/` |
| **Archivo** | `app/page.tsx` |
| **Tipo** | Server Component |
| **Layout** | Principal con Navbar |

---

## Descripción Funcional

El Dashboard actúa como centro de control del sistema, mostrando:
- Métricas principales (KPIs) del negocio
- Accesos directos a los módulos principales
- Feed de actividad reciente

---

## Estructura de la Página

### 1. Header
```
┌─────────────────────────────────────────────────────────┐
│  Bienvenido al Sistema de Gestión                       │
│  Panel de control para administrar tu negocio           │
└─────────────────────────────────────────────────────────┘
```

### 2. Tarjetas de KPIs (3 columnas)
```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ 📦 Total        │ │ 💰 Ventas del   │ │ 🏦 Saldo en     │
│ Productos       │ │ Mes             │ │ Caja            │
│ 156             │ │ S/ 45,890       │ │ S/ 5,775        │
│ +12 esta semana │ │ +23% vs ant.    │ │ Actualizado 5m  │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

### 3. Accesos Rápidos (3 columnas)
```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ 📦 Productos    │ │ 🛒 Ventas       │ │ 💵 Caja         │
│ Gestiona tu     │ │ Registra ventas │ │ Administra      │
│ inventario...   │ │ y consulta...   │ │ ingresos...     │
│ → Ir a Productos│ │ → Ir a Ventas   │ │ → Ir a Caja     │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

### 4. Actividad Reciente
```
┌─────────────────────────────────────────────────────────┐
│ Actividad Reciente                                      │
├─────────────────────────────────────────────────────────┤
│ 🛒 Nueva venta registrada                    Hace 5 min │
│    Laptop HP - S/ 2,500                                 │
├─────────────────────────────────────────────────────────┤
│ 📦 Producto actualizado                     Hace 15 min │
│    Stock de Mouse Logitech: 50 → 48                     │
├─────────────────────────────────────────────────────────┤
│ 💵 Ingreso a caja                           Hace 30 min │
│    Venta #0001 - S/ 2,585                               │
└─────────────────────────────────────────────────────────┘
```

---

## Código del Componente

### Importaciones
```typescript
import Link from "next/link";
```

### Componente Principal
```typescript
export default function Home() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Contenido */}
      </div>
    </div>
  );
}
```

---

## Estilos Utilizados

### Tarjetas de KPIs
| Clase | Propósito |
|-------|-----------|
| `bg-gradient-to-br from-blue-500 to-blue-600` | Gradiente azul para Productos |
| `bg-gradient-to-br from-green-500 to-green-600` | Gradiente verde para Ventas |
| `bg-gradient-to-br from-purple-500 to-purple-600` | Gradiente púrpura para Caja |
| `rounded-xl shadow-lg p-6` | Bordes redondeados y sombra |
| `text-white` | Texto blanco sobre gradiente |

### Tarjetas de Acceso Rápido
| Clase | Propósito |
|-------|-----------|
| `bg-white dark:bg-zinc-800` | Fondo adaptativo light/dark |
| `hover:shadow-lg transition-all` | Efecto hover con sombra |
| `hover:-translate-y-1` | Elevación al hacer hover |
| `group` | Agrupación para efectos anidados |
| `group-hover:scale-110` | Escala del ícono en hover |

---

## Datos Mostrados

### KPIs Principales

| KPI | Valor Demo | Icono | Color |
|-----|------------|-------|-------|
| Total Productos | 156 | 📦 | Azul |
| Ventas del Mes | S/ 45,890 | 💰 | Verde |
| Saldo en Caja | S/ 5,775 | 🏦 | Púrpura |

### Actividad Reciente (Mock Data)

```typescript
const actividadReciente = [
  { 
    accion: "Nueva venta registrada", 
    detalle: "Laptop HP - S/ 2,500", 
    tiempo: "Hace 5 min", 
    tipo: "venta" 
  },
  { 
    accion: "Producto actualizado", 
    detalle: "Stock de Mouse Logitech: 50 → 48", 
    tiempo: "Hace 15 min", 
    tipo: "producto" 
  },
  // ...más items
];
```

---

## Navegación

### Links Internos
| Destino | Componente | Ruta |
|---------|------------|------|
| Productos | `<Link href="/productos">` | `/productos` |
| Ventas | `<Link href="/ventas">` | `/ventas` |
| Caja | `<Link href="/caja">` | `/caja` |

---

## Responsive Design

| Breakpoint | Comportamiento |
|------------|----------------|
| Mobile (`< md`) | 1 columna para KPIs y accesos |
| Tablet (`md`) | 2-3 columnas |
| Desktop (`lg+`) | 3 columnas completas |

### Clases Responsive
```css
grid-cols-1 md:grid-cols-3  /* KPIs */
grid-cols-1 md:grid-cols-3  /* Accesos rápidos */
```

---

## Mejoras Futuras

- [ ] Conectar con API para datos reales
- [ ] Gráficos de tendencias
- [ ] Filtros por período de tiempo
- [ ] Notificaciones en tiempo real
- [ ] Widgets personalizables

---

## Archivos Relacionados

| Archivo | Descripción |
|---------|-------------|
| `app/layout.tsx` | Layout que contiene el Navbar |
| `app/components/Navbar.tsx` | Barra de navegación |
| `app/globals.css` | Estilos globales |

---

<div align="center">

[← Volver al Índice](../README.md) | [Módulo de Productos →](./products.md)

</div>
