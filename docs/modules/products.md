# 📦 Módulo de Productos

El módulo de Productos permite gestionar el inventario completo del negocio.

---

## Información General

| Atributo | Valor |
|----------|-------|
| **Ruta** | `/productos` |
| **Archivo** | `app/productos/page.tsx` |
| **Tipo** | Server Component |
| **Estado** | MVP - Datos estáticos |

---

## Funcionalidades

### Implementadas ✅
- Listado de productos en tarjetas
- Visualización de categorías
- Indicadores de stock con colores semánticos
- Precio en soles (S/)
- Botones de acción (Editar, Vender)
- Resumen de inventario

### Pendientes 🚧
- CRUD completo de productos
- Búsqueda y filtros
- Paginación
- Carga de imágenes
- Códigos de barras

---

## Modelo de Datos

### Interface TypeScript

```typescript
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}
```

### Datos de Ejemplo

```typescript
const productos: Producto[] = [
  { id: 1, nombre: "Laptop HP", precio: 2500, stock: 15, categoria: "Electrónicos" },
  { id: 2, nombre: "Mouse Logitech", precio: 85, stock: 50, categoria: "Accesorios" },
  { id: 3, nombre: "Teclado Mecánico", precio: 320, stock: 25, categoria: "Accesorios" },
  { id: 4, nombre: "Monitor Samsung 27\"", precio: 890, stock: 10, categoria: "Electrónicos" },
  { id: 5, nombre: "Audífonos Sony", precio: 450, stock: 30, categoria: "Audio" },
  { id: 6, nombre: "Webcam HD", precio: 180, stock: 20, categoria: "Accesorios" },
];
```

---

## Estructura de la Página

### Layout General
```
┌─────────────────────────────────────────────────────────┐
│ Productos                          [+ Nuevo Producto]   │
├─────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐                     │
│ │ Card 1  │ │ Card 2  │ │ Card 3  │                     │
│ └─────────┘ └─────────┘ └─────────┘                     │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐                     │
│ │ Card 4  │ │ Card 5  │ │ Card 6  │                     │
│ └─────────┘ └─────────┘ └─────────┘                     │
├─────────────────────────────────────────────────────────┤
│ Resumen de Inventario                                   │
│ [Total: 6] [Valor: S/ XX,XXX] [Unidades: XXX]          │
└─────────────────────────────────────────────────────────┘
```

### Tarjeta de Producto
```
┌──────────────────────────┐
│ [Categoría]  [Stock: XX] │
│                          │
│ Nombre del Producto      │
│ S/ 0,000.00              │
│                          │
│ [Editar]  [Vender]       │
└──────────────────────────┘
```

---

## Indicadores de Stock

| Nivel | Condición | Color | Clase Tailwind |
|-------|-----------|-------|----------------|
| Alto | `stock > 20` | 🟢 Verde | `bg-green-100 text-green-700` |
| Medio | `stock > 10 && <= 20` | 🟡 Amarillo | `bg-yellow-100 text-yellow-700` |
| Bajo | `stock <= 10` | 🔴 Rojo | `bg-red-100 text-red-700` |

### Implementación
```typescript
const getStockColor = (stock: number) => {
  if (stock > 20) return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
  if (stock > 10) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
  return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
};
```

---

## Resumen de Inventario

### Métricas Calculadas

| Métrica | Fórmula | Ejemplo |
|---------|---------|---------|
| Total Productos | `productos.length` | 6 |
| Valor Total | `Σ(precio × stock)` | S/ 95,550 |
| Unidades en Stock | `Σ(stock)` | 150 |

### Implementación
```typescript
// Total productos
const totalProductos = productos.length;

// Valor del inventario
const valorInventario = productos.reduce(
  (acc, p) => acc + p.precio * p.stock, 
  0
);

// Unidades totales
const unidadesStock = productos.reduce(
  (acc, p) => acc + p.stock, 
  0
);
```

---

## Componente Completo

```typescript
const productos = [
  // ... datos
];

export default function ProductosPage() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Productos
          </h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            + Nuevo Producto
          </button>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>

        {/* Resumen */}
        <ResumenInventario productos={productos} />
      </div>
    </div>
  );
}
```

---

## Estilos

### Tarjeta de Producto
```css
/* Contenedor */
.product-card {
  @apply bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 
         hover:shadow-lg transition-shadow;
}

/* Badge de categoría */
.category-badge {
  @apply text-xs font-medium px-2 py-1 
         bg-zinc-100 dark:bg-zinc-700 
         text-zinc-600 dark:text-zinc-300 
         rounded-full;
}

/* Precio */
.price {
  @apply text-2xl font-bold text-blue-600 dark:text-blue-400;
}

/* Botones */
.btn-edit {
  @apply flex-1 bg-zinc-100 dark:bg-zinc-700 
         hover:bg-zinc-200 dark:hover:bg-zinc-600 
         text-zinc-700 dark:text-zinc-300 
         px-3 py-2 rounded-lg text-sm font-medium transition-colors;
}

.btn-sell {
  @apply flex-1 bg-blue-600 hover:bg-blue-700 
         text-white px-3 py-2 rounded-lg 
         text-sm font-medium transition-colors;
}
```

---

## Responsive Design

| Breakpoint | Columnas | Clase |
|------------|----------|-------|
| Mobile | 1 | `grid-cols-1` |
| Tablet | 2 | `md:grid-cols-2` |
| Desktop | 3 | `lg:grid-cols-3` |

---

## API Futura

### Endpoints Planificados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Listar productos |
| GET | `/api/productos/:id` | Obtener producto |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Eliminar producto |

---

## Mejoras Futuras

- [ ] Integración con base de datos
- [ ] Búsqueda por nombre/categoría
- [ ] Filtros avanzados
- [ ] Ordenamiento
- [ ] Paginación
- [ ] Carga de imágenes
- [ ] Historial de precios
- [ ] Alertas de stock bajo
- [ ] Códigos de barras/QR
- [ ] Importar/Exportar CSV

---

<div align="center">

[← Dashboard](./dashboard.md) | [Volver al Índice](../README.md) | [Módulo de Ventas →](./sales.md)

</div>
