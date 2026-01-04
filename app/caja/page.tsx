"use client";

import { useState } from "react";

const movimientos = [
  { id: 1, tipo: "ingreso", concepto: "Venta #0001", monto: 2585, hora: "09:15", metodo: "Efectivo" },
  { id: 2, tipo: "ingreso", concepto: "Venta #0002", monto: 320, hora: "10:30", metodo: "Tarjeta" },
  { id: 3, tipo: "egreso", concepto: "Pago a proveedor", monto: 1500, hora: "11:00", metodo: "Transferencia" },
  { id: 4, tipo: "ingreso", concepto: "Venta #0003", monto: 1070, hora: "12:45", metodo: "Efectivo" },
  { id: 5, tipo: "egreso", concepto: "Gastos operativos", monto: 200, hora: "14:00", metodo: "Efectivo" },
  { id: 6, tipo: "ingreso", concepto: "Venta #0005", monto: 2500, hora: "15:30", metodo: "Yape" },
];

export default function CajaPage() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoMovimiento, setTipoMovimiento] = useState<"ingreso" | "egreso">("ingreso");

  const totalIngresos = movimientos
    .filter(m => m.tipo === "ingreso")
    .reduce((acc, m) => acc + m.monto, 0);

  const totalEgresos = movimientos
    .filter(m => m.tipo === "egreso")
    .reduce((acc, m) => acc + m.monto, 0);

  const saldoCaja = totalIngresos - totalEgresos;

  const cajaInicial = 500;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Caja</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => { setTipoMovimiento("ingreso"); setMostrarModal(true); }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              + Ingreso
            </button>
            <button 
              onClick={() => { setTipoMovimiento("egreso"); setMostrarModal(true); }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              - Egreso
            </button>
          </div>
        </div>

        {/* Resumen de Caja */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Caja Inicial</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              S/ {cajaInicial.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Ingresos</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              + S/ {totalIngresos.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Egresos</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              - S/ {totalEgresos.toLocaleString()}
            </p>
          </div>
          <div className="bg-zinc-900 dark:bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-zinc-400 dark:text-zinc-500">Saldo Actual</p>
            <p className="text-2xl font-bold text-white dark:text-zinc-900">
              S/ {(cajaInicial + saldoCaja).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Métodos de Pago */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {["Efectivo", "Tarjeta", "Yape", "Transferencia"].map((metodo) => {
            const totalMetodo = movimientos
              .filter(m => m.metodo === metodo && m.tipo === "ingreso")
              .reduce((acc, m) => acc + m.monto, 0);
            return (
              <div key={metodo} className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-4">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{metodo}</p>
                <p className="text-xl font-bold text-zinc-900 dark:text-white">
                  S/ {totalMetodo.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>

        {/* Movimientos */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Movimientos del Día</h2>
          </div>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {movimientos.map((mov) => (
              <div key={mov.id} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    mov.tipo === "ingreso" 
                      ? "bg-green-100 dark:bg-green-900" 
                      : "bg-red-100 dark:bg-red-900"
                  }`}>
                    <span className={`text-lg ${
                      mov.tipo === "ingreso" 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-red-600 dark:text-red-400"
                    }`}>
                      {mov.tipo === "ingreso" ? "↑" : "↓"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">{mov.concepto}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {mov.hora} • {mov.metodo}
                    </p>
                  </div>
                </div>
                <p className={`text-lg font-semibold ${
                  mov.tipo === "ingreso" 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                }`}>
                  {mov.tipo === "ingreso" ? "+" : "-"} S/ {mov.monto.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones de Cierre */}
        <div className="mt-8 flex justify-end gap-4">
          <button className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 px-6 py-3 rounded-lg font-medium transition-colors">
            Imprimir Reporte
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Cerrar Caja
          </button>
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
              Nuevo {tipoMovimiento === "ingreso" ? "Ingreso" : "Egreso"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Concepto
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descripción del movimiento"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Monto
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Método de Pago
                </label>
                <select className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Efectivo</option>
                  <option>Tarjeta</option>
                  <option>Yape</option>
                  <option>Transferencia</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setMostrarModal(false)}
                className={`px-4 py-2 text-white rounded-lg font-medium transition-colors ${
                  tipoMovimiento === "ingreso"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Guardar {tipoMovimiento === "ingreso" ? "Ingreso" : "Egreso"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
