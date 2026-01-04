const productos = [
  { id: 1, nombre: "Laptop HP", precio: 2500, stock: 15, categoria: "Electrónicos" },
  { id: 2, nombre: "Mouse Logitech", precio: 85, stock: 50, categoria: "Accesorios" },
  { id: 3, nombre: "Teclado Mecánico", precio: 320, stock: 25, categoria: "Accesorios" },
  { id: 4, nombre: "Monitor Samsung 27\"", precio: 890, stock: 10, categoria: "Electrónicos" },
  { id: 5, nombre: "Audífonos Sony", precio: 450, stock: 30, categoria: "Audio" },
  { id: 6, nombre: "Webcam HD", precio: 180, stock: 20, categoria: "Accesorios" },
];

export default function ProductosPage() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Productos</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            + Nuevo Producto
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-medium px-2 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-full">
                  {producto.categoria}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    producto.stock > 20
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : producto.stock > 10
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  Stock: {producto.stock}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                {producto.nombre}
              </h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                S/ {producto.precio.toFixed(2)}
              </p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  Editar
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  Vender
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Resumen de Inventario</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-700 p-4 rounded-lg">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Productos</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">{productos.length}</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-700 p-4 rounded-lg">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Valor Total Inventario</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                S/ {productos.reduce((acc, p) => acc + p.precio * p.stock, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-700 p-4 rounded-lg">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Unidades en Stock</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {productos.reduce((acc, p) => acc + p.stock, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
