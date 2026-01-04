"use client";

import { useState } from "react";

const ventasData = [
  { id: 1, fecha: "2026-04-01", cliente: "Juan Pérez", productos: ["Laptop HP", "Mouse Logitech"], total: 2585, estado: "completada" },
  { id: 2, fecha: "2026-04-01", cliente: "María García", productos: ["Teclado Mecánico"], total: 320, estado: "completada" },
  { id: 3, fecha: "2026-03-31", cliente: "Carlos López", productos: ["Monitor Samsung 27\"", "Webcam HD"], total: 1070, estado: "completada" },
  { id: 4, fecha: "2026-03-31", cliente: "Ana Torres", productos: ["Audífonos Sony"], total: 450, estado: "pendiente" },
  { id: 5, fecha: "2026-03-30", cliente: "Pedro Sánchez", productos: ["Laptop HP"], total: 2500, estado: "completada" },
  { id: 6, fecha: "2026-03-30", cliente: "Lucía Mendoza", productos: ["Mouse Logitech", "Teclado Mecánico", "Webcam HD"], total: 585, estado: "cancelada" },
];

export default function VentasPage() {
  const [filtro, setFiltro] = useState("todas");

  const ventasFiltradas = filtro === "todas" 
    ? ventasData 
    : ventasData.filter(v => v.estado === filtro);

  const totalVentas = ventasData
    .filter(v => v.estado === "completada")
    .reduce((acc, v) => acc + v.total, 0);

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

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Ventas</h1>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            + Nueva Venta
          </button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Ventas Hoy</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              {ventasData.filter(v => v.fecha === "2026-04-01").length}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Completadas</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              S/ {totalVentas.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Pendientes</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {ventasData.filter(v => v.estado === "pendiente").length}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Promedio por Venta</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              S/ {Math.round(totalVentas / ventasData.filter(v => v.estado === "completada").length).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-6">
          {["todas", "completada", "pendiente", "cancelada"].map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltro(estado)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtro === estado
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              {estado.charAt(0).toUpperCase() + estado.slice(1)}
            </button>
          ))}
        </div>

        {/* Tabla de Ventas */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-50 dark:bg-zinc-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                  Productos
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {ventasFiltradas.map((venta) => (
                <tr key={venta.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-white">
                    #{venta.id.toString().padStart(4, "0")}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {venta.fecha}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-900 dark:text-white">
                    {venta.cliente}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {venta.productos.join(", ")}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-white">
                    S/ {venta.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getEstadoStyle(venta.estado)}`}>
                      {venta.estado.charAt(0).toUpperCase() + venta.estado.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
