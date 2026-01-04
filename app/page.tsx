import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Bienvenido al Sistema de Gestión
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Panel de control para administrar tu negocio
          </p>
        </div>

        {/* Resumen General */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Productos</p>
                <p className="text-3xl font-bold mt-1">156</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
            <div className="mt-4 text-blue-100 text-sm">
              +12 productos esta semana
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Ventas del Mes</p>
                <p className="text-3xl font-bold mt-1">S/ 45,890</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <div className="mt-4 text-green-100 text-sm">
              +23% vs mes anterior
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Saldo en Caja</p>
                <p className="text-3xl font-bold mt-1">S/ 5,775</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏦</span>
              </div>
            </div>
            <div className="mt-4 text-purple-100 text-sm">
              Actualizado hace 5 min
            </div>
          </div>
        </div>

        {/* Accesos Rápidos */}
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
          Accesos Rápidos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/productos"
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">📦</span>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Productos
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              Gestiona tu inventario, agrega nuevos productos y controla el stock.
            </p>
            <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center gap-1">
              Ir a Productos
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          <Link
            href="/ventas"
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">🛒</span>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Ventas
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              Registra ventas, consulta el historial y genera reportes.
            </p>
            <div className="mt-4 text-green-600 dark:text-green-400 font-medium text-sm flex items-center gap-1">
              Ir a Ventas
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          <Link
            href="/caja"
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">💵</span>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Caja
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              Administra ingresos, egresos y cierra tu caja diaria.
            </p>
            <div className="mt-4 text-purple-600 dark:text-purple-400 font-medium text-sm flex items-center gap-1">
              Ir a Caja
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Actividad Reciente
          </h2>
          <div className="space-y-4">
            {[
              { accion: "Nueva venta registrada", detalle: "Laptop HP - S/ 2,500", tiempo: "Hace 5 min", tipo: "venta" },
              { accion: "Producto actualizado", detalle: "Stock de Mouse Logitech: 50 → 48", tiempo: "Hace 15 min", tipo: "producto" },
              { accion: "Ingreso a caja", detalle: "Venta #0001 - S/ 2,585", tiempo: "Hace 30 min", tipo: "caja" },
              { accion: "Nueva venta registrada", detalle: "Teclado Mecánico - S/ 320", tiempo: "Hace 1 hora", tipo: "venta" },
              { accion: "Egreso de caja", detalle: "Pago a proveedor - S/ 1,500", tiempo: "Hace 2 horas", tipo: "caja" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.tipo === "venta" 
                    ? "bg-green-100 dark:bg-green-900" 
                    : item.tipo === "producto"
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-purple-100 dark:bg-purple-900"
                }`}>
                  <span className="text-lg">
                    {item.tipo === "venta" ? "🛒" : item.tipo === "producto" ? "📦" : "💵"}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-zinc-900 dark:text-white">{item.accion}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.detalle}</p>
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">{item.tiempo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
