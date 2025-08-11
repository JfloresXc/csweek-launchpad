# CS WEEK 2025 - Landing Page

## Descripción del Proyecto

Landing page oficial para el evento **CS WEEK 2025**, una semana dedicada a la ciencia de la computación que reúne a estudiantes y profesionales de las principales universidades del Perú con capítulos IEEE Computer Society.

## Características

- 🎨 Diseño moderno y responsivo
- 🏛️ Logos personalizados para 8 universidades peruanas
- ⚡ Construido con Vite + React + TypeScript
- 🎯 Optimizado para conversión y registro
- 📱 Experiencia móvil optimizada

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/85723a08-4e3e-48cf-9370-a35095e9208a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.

## Git Workflow y Rebase

### Estrategia de Branching

Este proyecto utiliza una estrategia de branching basada en **Git Flow** simplificado:

- `main`: Rama principal con código estable y listo para producción
- `feature/*`: Ramas de características para nuevas funcionalidades
- `hotfix/*`: Ramas para correcciones urgentes

### Proceso de Merge con Rebase

Para mantener un historial de commits limpio y lineal, utilizamos **rebase** antes de hacer merge:

```bash
# 1. Crear una nueva rama de feature
git checkout -b feature/nueva-funcionalidad

# 2. Realizar commits en la rama de feature
git add .
git commit -m "feat: agregar nueva funcionalidad"

# 3. Antes del merge, hacer rebase con main
git checkout main
git pull origin main
git checkout feature/nueva-funcionalidad
git rebase main

# 4. Resolver conflictos si existen
# git add <archivos-resueltos>
# git rebase --continue

# 5. Hacer merge (fast-forward)
git checkout main
git merge feature/nueva-funcionalidad

# 6. Limpiar la rama de feature
git branch -d feature/nueva-funcionalidad
```

### Ventajas del Rebase

- **Historial Lineal**: Mantiene un historial de commits limpio y fácil de seguir
- **Sin Merge Commits**: Evita commits de merge innecesarios
- **Mejor Legibilidad**: Facilita la revisión del historial del proyecto
- **Rollback Sencillo**: Permite revertir cambios de manera más eficiente
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

### Deployment Automático con Vercel

1. **Conectar con Vercel:**
   ```bash
   # Instalar Vercel CLI
   npm i -g vercel
   
   # Hacer login
   vercel login
   
   # Configurar proyecto
   vercel
   ```

2. **Configurar Secrets en GitHub:**
   - `VERCEL_TOKEN`: Token de Vercel
   - `VERCEL_ORG_ID`: ID de organización
   - `VERCEL_PROJECT_ID`: ID del proyecto

3. **Deployment automático:**
   - Push a `main` → Deploy a producción
   - Pull Request → Deploy preview

### Deployment Manual

```bash
# Build del proyecto
npm run build

# Preview local
npm run preview

# Deploy con Vercel
vercel --prod
```

## Universidades Incluidas

- 🏛️ IEEE Computer Society UNTELS
- 🏛️ IEEE CS UNI
- 🏛️ IEEE CS UNMSM
- 🏛️ IEEE CS UPC
- 🏛️ IEEE CS PUCP
- 🏛️ IEEE CS USIL
- 🏛️ IEEE CS UTEC
- 🏛️ IEEE CS ULIMA
