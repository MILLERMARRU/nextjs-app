# 💵 Módulo de Caja

El módulo de Caja permite controlar el flujo de efectivo diario del negocio.

---

## Información General

| Atributo | Valor |
|----------|-------|
| **Ruta** | `/caja` |
| **Archivo** | `app/caja/page.tsx` |
| **Tipo** | Client Component (`"use client"`) |
| **Estado** | MVP - Con modal funcional |

---

## Funcionalidades

### Implementadas ✅
- Resumen de caja (inicial, ingresos, egresos, saldo)
- Desglose por método de pago
- Listado de movimientos del día
- Modal para registrar ingresos/egresos
- Botones de acción (Imprimir, Cerrar caja)

### Pendientes 🚧
- Persistencia de datos
- Cierre de caja real
- Generación de reportes
- Histórico de cierres
- Arqueo de caja

---

## Modelo de Datos

### Interface TypeScript

```typescript
interface Movimiento {
  id: number;
  tipo: "ingreso" | "egreso";
  concepto: string;
  monto: number;
  hora: string;                  // Formato: "HH:MM"
  metodo: "Efectivo" | "Tarjeta" | "Yape" | "Transferencia";
}
```

### Datos de Ejemplo

```typescript
const movimientos: Movimiento[] = [
  { id: 1, tipo: "ingreso", concepto: "Venta #0001", monto: 2585, hora: "09:15", metodo: "Efectivo" },
  { id: 2, tipo: "ingreso", concepto: "Venta #0002", monto: 320, hora: "10:30", metodo: "Tarjeta" },
  { id: 3, tipo: "egreso", concepto: "Pago a proveedor", monto: 1500, hora: "11:00", metodo: "Transferencia" },
  { id: 4, tipo: "ingreso", concepto: "Venta #0003", monto: 1070, hora: "12:45", metodo: "Efectivo" },
  { id: 5, tipo: "egreso", concepto: "Gastos operativos", monto: 200, hora: "14:00", metodo: "Efectivo" },
  { id: 6, tipo: "ingreso", concepto: "Venta #0005", monto: 2500, hora: "15:30", metodo: "Yape" },
];
```

---

## Estructura de la Página

### Layout General
```
┌─────────────────────────────────────────────────────────┐
│ Caja                       [+ Ingreso] [- Egreso]       │
├─────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│ │  Caja    │ │+ Ingresos│ │- Egresos │ │  Saldo   │     │
│ │ Inicial  │ │ S/ 6,475 │ │ S/ 1,700 │ │ S/ 5,275 │     │
│ │ S/ 500   │ │  verde   │ │  rojo    │ │ destacado│     │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
├─────────────────────────────────────────────────────────┤
│ [Efectivo: S/X] [Tarjeta: S/X] [Yape: S/X] [Transf: S/X]│
├─────────────────────────────────────────────────────────┤
│ Movimientos del Día                                     │
│ ┌───────────────────────────────────────────────────┐   │
│ │ ↑ Venta #0001          09:15 • Efectivo  +S/2,585 │   │
│ │ ↑ Venta #0002          10:30 • Tarjeta     +S/320 │   │
│ │ ↓ Pago proveedor       11:00 • Transf.   -S/1,500 │   │
│ └───────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│                    [Imprimir Reporte] [Cerrar Caja]     │
└─────────────────────────────────────────────────────────┘
```

---

## Cálculos de Caja

### Métricas

| Métrica | Fórmula | Descripción |
|---------|---------|-------------|
| Caja Inicial | Constante | S/ 500 (configurable) |
| Total Ingresos | `Σ(ingresos.monto)` | Suma de todos los ingresos |
| Total Egresos | `Σ(egresos.monto)` | Suma de todos los egresos |
| Saldo Actual | `inicial + ingresos - egresos` | Balance final |

### Implementación
```typescript
const cajaInicial = 500;

const totalIngresos = movimientos
  .filter(m => m.tipo === "ingreso")
  .reduce((acc, m) => acc + m.monto, 0);

const totalEgresos = movimientos
  .filter(m => m.tipo === "egreso")
  .reduce((acc, m) => acc + m.monto, 0);

const saldoCaja = totalIngresos - totalEgresos;
const saldoActual = cajaInicial + saldoCaja;
```

---

## Métodos de Pago

| Método | Icono | Uso común |
|--------|-------|-----------|
| Efectivo | 💵 | Pagos en tienda |
| Tarjeta | 💳 | Crédito/Débito |
| Yape | 📱 | Billetera digital |
| Transferencia | 🏦 | Pagos bancarios |

### Desglose por Método
```typescript
const metodos = ["Efectivo", "Tarjeta", "Yape", "Transferencia"];

{metodos.map((metodo) => {
  const totalMetodo = movimientos
    .filter(m => m.metodo === metodo && m.tipo === "ingreso")
    .reduce((acc, m) => acc + m.monto, 0);
  
  return (
    <div key={metodo}>
      <p>{metodo}</p>
      <p>S/ {totalMetodo.toLocaleString()}</p>
    </div>
  );
})}
```

---

## Modal de Movimiento

### Estado del Modal
```typescript
const [mostrarModal, setMostrarModal] = useState(false);
const [tipoMovimiento, setTipoMovimiento] = useState<"ingreso" | "egreso">("ingreso");
```

### Campos del Formulario

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| Concepto | `text` | ✅ | Descripción del movimiento |
| Monto | `number` | ✅ | Cantidad en soles |
| Método de Pago | `select` | ✅ | Efectivo, Tarjeta, Yape, Transferencia |

### Estructura del Modal
```typescript
{mostrarModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
      <h3>Nuevo {tipoMovimiento === "ingreso" ? "Ingreso" : "Egreso"}</h3>
      <form>
        <input type="text" placeholder="Concepto" />
        <input type="number" placeholder="Monto" />
        <select>
          <option>Efectivo</option>
          <option>Tarjeta</option>
          <option>Yape</option>
          <option>Transferencia</option>
        </select>
        <button type="submit">Guardar</button>
      </form>
    </div>
  </div>
)}
```

---

## Estilos de Movimientos

### Indicadores Visuales

| Tipo | Icono | Color Fondo | Color Texto |
|------|-------|-------------|-------------|
| Ingreso | ↑ | `bg-green-100` | `text-green-600` |
| Egreso | ↓ | `bg-red-100` | `text-red-600` |

### Implementación
```typescript
<div className={`w-10 h-10 rounded-full flex items-center justify-center ${
  mov.tipo === "ingreso" 
    ? "bg-green-100 dark:bg-green-900" 
    : "bg-red-100 dark:bg-red-900"
}`}>
  <span className={mov.tipo === "ingreso" 
    ? "text-green-600 dark:text-green-400" 
    : "text-red-600 dark:text-red-400"
  }>
    {mov.tipo === "ingreso" ? "↑" : "↓"}
  </span>
</div>
```

---

## Acciones de Caja

### Botones Disponibles

| Acción | Descripción | Estado |
|--------|-------------|--------|
| + Ingreso | Abre modal para registrar ingreso | ✅ Funcional |
| - Egreso | Abre modal para registrar egreso | ✅ Funcional |
| Imprimir Reporte | Genera PDF del día | 🚧 Pendiente |
| Cerrar Caja | Finaliza operaciones del día | 🚧 Pendiente |

---

## API Futura

### Endpoints Planificados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/caja/movimientos` | Listar movimientos |
| POST | `/api/caja/movimientos` | Crear movimiento |
| GET | `/api/caja/resumen` | Obtener resumen del día |
| POST | `/api/caja/cierre` | Cerrar caja |
| GET | `/api/caja/historico` | Histórico de cierres |

---

## Mejoras Futuras

- [ ] Persistencia en base de datos
- [ ] Cierre de caja con arqueo
- [ ] Reportes diarios/mensuales
- [ ] Gráficos de flujo de caja
- [ ] Exportar a Excel/PDF
- [ ] Notificaciones de límites
- [ ] Multi-caja (sucursales)
- [ ] Conciliación bancaria
- [ ] Auditoría de movimientos

---

<div align="center">

[← Módulo de Ventas](./sales.md) | [Volver al Índice](../README.md)

</div>
