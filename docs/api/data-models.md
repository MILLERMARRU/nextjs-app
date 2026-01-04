# 🎯 Modelos de Datos

Documentación completa de las estructuras de datos utilizadas en el sistema.

---

## Índice

1. [Producto](#producto)
2. [Venta](#venta)
3. [Movimiento de Caja](#movimiento-de-caja)
4. [Actividad](#actividad)
5. [Relaciones entre Entidades](#relaciones)

---

## Producto

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

### Descripción de Campos

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | `number` | ✅ | Identificador único del producto |
| `nombre` | `string` | ✅ | Nombre del producto |
| `precio` | `number` | ✅ | Precio unitario en soles (S/) |
| `stock` | `number` | ✅ | Cantidad disponible en inventario |
| `categoria` | `string` | ✅ | Categoría del producto |

### Validaciones

```typescript
const ProductoSchema = {
  id: { type: "number", min: 1 },
  nombre: { type: "string", minLength: 1, maxLength: 100 },
  precio: { type: "number", min: 0 },
  stock: { type: "number", min: 0, integer: true },
  categoria: { type: "string", minLength: 1 }
};
```

### Ejemplo

```typescript
const producto: Producto = {
  id: 1,
  nombre: "Laptop HP",
  precio: 2500,
  stock: 15,
  categoria: "Electrónicos"
};
```

### Extensión Futura (Schema Prisma)

```prisma
model Producto {
  id          Int      @id @default(autoincrement())
  nombre      String
  precio      Decimal  @db.Decimal(10, 2)
  stock       Int      @default(0)
  categoria   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  ventas      VentaProducto[]
}
```

---

## Venta

### Interface TypeScript

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

### Descripción de Campos

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | `number` | ✅ | Identificador único de la venta |
| `fecha` | `string` | ✅ | Fecha de la venta (ISO 8601) |
| `cliente` | `string` | ✅ | Nombre del cliente |
| `productos` | `string[]` | ✅ | Lista de nombres de productos |
| `total` | `number` | ✅ | Monto total en soles (S/) |
| `estado` | `EstadoVenta` | ✅ | Estado actual de la venta |

### Estados de Venta

```typescript
type EstadoVenta = "completada" | "pendiente" | "cancelada";
```

| Estado | Descripción | Transiciones Permitidas |
|--------|-------------|------------------------|
| `pendiente` | Venta creada, sin pagar | → completada, cancelada |
| `completada` | Venta pagada y finalizada | → cancelada (con restricciones) |
| `cancelada` | Venta anulada | Estado final |

### Ejemplo

```typescript
const venta: Venta = {
  id: 1,
  fecha: "2026-04-01",
  cliente: "Juan Pérez",
  productos: ["Laptop HP", "Mouse Logitech"],
  total: 2585,
  estado: "completada"
};
```

### Extensión Futura (Schema Prisma)

```prisma
model Venta {
  id          Int              @id @default(autoincrement())
  fecha       DateTime         @default(now())
  cliente     String
  total       Decimal          @db.Decimal(10, 2)
  estado      EstadoVenta      @default(PENDIENTE)
  productos   VentaProducto[]
  movimientos Movimiento[]
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
}

enum EstadoVenta {
  COMPLETADA
  PENDIENTE
  CANCELADA
}

model VentaProducto {
  id          Int      @id @default(autoincrement())
  ventaId     Int
  productoId  Int
  cantidad    Int
  precioUnit  Decimal  @db.Decimal(10, 2)
  venta       Venta    @relation(fields: [ventaId], references: [id])
  producto    Producto @relation(fields: [productoId], references: [id])
}
```

---

## Movimiento de Caja

### Interface TypeScript

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

### Descripción de Campos

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | `number` | ✅ | Identificador único |
| `tipo` | `TipoMovimiento` | ✅ | Ingreso o egreso |
| `concepto` | `string` | ✅ | Descripción del movimiento |
| `monto` | `number` | ✅ | Cantidad en soles (S/) |
| `hora` | `string` | ✅ | Hora del movimiento (HH:MM) |
| `metodo` | `MetodoPago` | ✅ | Método de pago utilizado |

### Tipos

```typescript
type TipoMovimiento = "ingreso" | "egreso";
type MetodoPago = "Efectivo" | "Tarjeta" | "Yape" | "Transferencia";
```

### Ejemplo

```typescript
const movimiento: Movimiento = {
  id: 1,
  tipo: "ingreso",
  concepto: "Venta #0001",
  monto: 2585,
  hora: "09:15",
  metodo: "Efectivo"
};
```

### Extensión Futura (Schema Prisma)

```prisma
model Movimiento {
  id          Int            @id @default(autoincrement())
  tipo        TipoMovimiento
  concepto    String
  monto       Decimal        @db.Decimal(10, 2)
  metodo      MetodoPago
  ventaId     Int?
  venta       Venta?         @relation(fields: [ventaId], references: [id])
  cierreId    Int?
  cierre      CierreCaja?    @relation(fields: [cierreId], references: [id])
  createdAt   DateTime       @default(now())
}

enum TipoMovimiento {
  INGRESO
  EGRESO
}

enum MetodoPago {
  EFECTIVO
  TARJETA
  YAPE
  TRANSFERENCIA
}
```

---

## Actividad

### Interface TypeScript

```typescript
interface Actividad {
  accion: string;
  detalle: string;
  tiempo: string;
  tipo: "venta" | "producto" | "caja";
}
```

### Descripción de Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `accion` | `string` | Título de la acción realizada |
| `detalle` | `string` | Información adicional |
| `tiempo` | `string` | Tiempo relativo ("Hace 5 min") |
| `tipo` | `TipoActividad` | Categoría de la actividad |

### Ejemplo

```typescript
const actividad: Actividad = {
  accion: "Nueva venta registrada",
  detalle: "Laptop HP - S/ 2,500",
  tiempo: "Hace 5 min",
  tipo: "venta"
};
```

---

## Relaciones

### Diagrama de Entidades

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│   Producto   │       │  VentaProducto   │       │    Venta     │
├──────────────┤       ├──────────────────┤       ├──────────────┤
│ id           │◄──────│ productoId       │       │ id           │
│ nombre       │       │ ventaId          │──────►│ fecha        │
│ precio       │       │ cantidad         │       │ cliente      │
│ stock        │       │ precioUnit       │       │ total        │
│ categoria    │       └──────────────────┘       │ estado       │
└──────────────┘                                  └──────┬───────┘
                                                        │
                                                        │
                                                        ▼
                                                  ┌──────────────┐
                                                  │  Movimiento  │
                                                  ├──────────────┤
                                                  │ id           │
                                                  │ tipo         │
                                                  │ concepto     │
                                                  │ monto        │
                                                  │ hora         │
                                                  │ metodo       │
                                                  │ ventaId      │
                                                  └──────────────┘
```

### Relaciones

| Entidad A | Relación | Entidad B |
|-----------|----------|-----------|
| Producto | 1:N | VentaProducto |
| Venta | 1:N | VentaProducto |
| Venta | 1:N | Movimiento |

---

## Constantes y Enums

### Categorías de Producto

```typescript
const CATEGORIAS_PRODUCTO = [
  "Electrónicos",
  "Accesorios",
  "Audio",
  "Computación",
  "Periféricos"
] as const;

type CategoriaProducto = typeof CATEGORIAS_PRODUCTO[number];
```

### Métodos de Pago

```typescript
const METODOS_PAGO = [
  "Efectivo",
  "Tarjeta",
  "Yape",
  "Transferencia"
] as const;

type MetodoPago = typeof METODOS_PAGO[number];
```

---

## Utilidades de Formato

### Formato de Precio

```typescript
const formatPrice = (price: number): string => {
  return `S/ ${price.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

// Ejemplo: formatPrice(2500) → "S/ 2,500.00"
```

### Formato de ID

```typescript
const formatId = (id: number, prefix: string = "#"): string => {
  return `${prefix}${id.toString().padStart(4, "0")}`;
};

// Ejemplo: formatId(1) → "#0001"
```

---

<div align="center">

[← Volver al Índice](../README.md) | [Interfaces TypeScript →](./typescript-interfaces.md)

</div>
