# 🚀 Guía de Instalación

Esta guía te ayudará a instalar y configurar el proyecto en tu entorno local.

---

## Requisitos Previos

### Software Requerido

| Software | Versión Mínima | Versión Recomendada | Verificar |
|----------|----------------|---------------------|-----------|
| Node.js | 18.0.0 | 20.x LTS | `node --version` |
| npm | 9.0.0 | 10.x | `npm --version` |
| Git | 2.30.0 | Última | `git --version` |

### Requisitos de Sistema

| Recurso | Mínimo | Recomendado |
|---------|--------|-------------|
| RAM | 4 GB | 8 GB |
| Espacio en Disco | 500 MB | 1 GB |
| CPU | Dual Core | Quad Core |

---

## Instalación Paso a Paso

### 1. Clonar el Repositorio

```bash
# Usando HTTPS
git clone https://github.com/MILLERMARRU/nextjs-app.git

# Usando SSH (si tienes configurada la clave SSH)
git clone git@github.com:MILLERMARRU/nextjs-app.git
```

### 2. Navegar al Directorio

```bash
cd nextjs-app
```

### 3. Instalar Dependencias

```bash
# Usando npm (recomendado)
npm install

# Usando yarn (alternativa)
yarn install

# Usando pnpm (alternativa)
pnpm install
```

### 4. Verificar Instalación

```bash
# Listar dependencias instaladas
npm list --depth=0
```

Deberías ver algo similar a:

```
nextjs-app@0.1.0
├── @tailwindcss/postcss@4.x.x
├── @types/node@20.x.x
├── @types/react@19.x.x
├── @types/react-dom@19.x.x
├── eslint@9.x.x
├── eslint-config-next@16.1.1
├── next@16.1.1
├── react@19.2.3
├── react-dom@19.2.3
├── tailwindcss@4.x.x
└── typescript@5.x.x
```

### 5. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

### 6. Abrir en el Navegador

Visita [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Estructura de Archivos Después de la Instalación

```
nextjs-app/
├── node_modules/          # Dependencias instaladas
├── .next/                 # Build de desarrollo (generado)
├── app/                   # Código fuente
├── public/                # Archivos estáticos
├── docs/                  # Documentación
├── package.json           # Configuración del proyecto
├── package-lock.json      # Lock de versiones
├── tsconfig.json          # Configuración TypeScript
├── next.config.ts         # Configuración Next.js
├── postcss.config.mjs     # Configuración PostCSS
├── eslint.config.mjs      # Configuración ESLint
└── README.md              # Documentación principal
```

---

## Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| Desarrollo | `npm run dev` | Inicia servidor en modo desarrollo con hot-reload |
| Build | `npm run build` | Genera build optimizado para producción |
| Producción | `npm run start` | Inicia servidor de producción |
| Lint | `npm run lint` | Ejecuta ESLint para verificar código |

---

## Solución de Problemas Comunes

### Error: `EACCES` permission denied

**Causa:** Permisos insuficientes en npm global.

**Solución:**
```bash
# En Linux/Mac
sudo chown -R $(whoami) ~/.npm

# O usar npx en lugar de instalar globalmente
```

### Error: `ENOSPC` no space left on device

**Causa:** Límite de watchers del sistema.

**Solución (Linux):**
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Error: Puerto 3000 en uso

**Causa:** Otro proceso usando el puerto.

**Solución:**
```bash
# Encontrar proceso usando el puerto
lsof -i :3000

# O iniciar en otro puerto
npm run dev -- -p 3001
```

### Error: `Module not found`

**Causa:** Dependencias no instaladas correctamente.

**Solución:**
```bash
# Limpiar y reinstalar
rm -rf node_modules
rm package-lock.json
npm install
```

---

## Instalación en Diferentes Sistemas Operativos

### Windows

```powershell
# Usar PowerShell como Administrador
git clone https://github.com/MILLERMARRU/nextjs-app.git
cd nextjs-app
npm install
npm run dev
```

### macOS

```bash
# Usando Terminal
git clone https://github.com/MILLERMARRU/nextjs-app.git
cd nextjs-app
npm install
npm run dev
```

### Linux (Ubuntu/Debian)

```bash
# Instalar Node.js si no está instalado
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clonar e instalar
git clone https://github.com/MILLERMARRU/nextjs-app.git
cd nextjs-app
npm install
npm run dev
```

---

## Siguiente Paso

→ [Configuración del Entorno](./configuration.md)

---

<div align="center">

[← Volver al Índice](../README.md)

</div>
