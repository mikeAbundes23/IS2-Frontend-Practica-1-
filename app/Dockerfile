# ==============================
# Stage 1: Build React + Vite
# ==============================
FROM node:18-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Generar build de producción
RUN npm run build


# ==============================
# Stage 2: Runtime con Supervisor y PM2
# ==============================
FROM node:18-alpine AS runtime

WORKDIR /app

# Instalar Supervisor
RUN apk add --no-cache supervisor

# Crear usuario no-root
RUN addgroup appuser && adduser -D -G appuser appuser

# Crear carpetas para logs de Supervisor y la build
RUN mkdir -p /app/supervisor /app/dist && chown -R appuser:appuser /app/supervisor /app/dist /app

# Instalar PM2 globalmente
RUN npm install -g pm2

# Copiar build de frontend
COPY --from=builder /app/dist /app/dist

# Copiar configuración de Supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Cambiar a usuario no-root
USER appuser

# Exponer puerto de la SPA
EXPOSE 3000

# Comando para iniciar Supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
