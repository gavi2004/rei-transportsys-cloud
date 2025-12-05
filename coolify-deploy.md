# Configuración de Despliegue en Coolify

## Servicios a configurar:

### 1. Frontend (pioneros.bitforges.com)
- **Puerto**: 3000
- **Dockerfile**: `frontend/Dockerfile`
- **Build Context**: `frontend/`
- **Variables de entorno**:
  ```
  NODE_ENV=production
  API_URL=https://api-pioneros.bitforges.com
  ```

### 2. Backend API (api-pioneros.bitforges.com)
- **Puerto**: 3500
- **Dockerfile**: `backend/Dockerfile`
- **Build Context**: `backend/`
- **Variables de entorno**:
  ```
  NODE_ENV=production
  PORT=3500
  HOST=0.0.0.0
  MONGO_URI=mongodb://mongo:27017/transportsys
  CORS_ORIGIN=https://pioneros.bitforges.com,https://api-pioneros.bitforges.com
  ```

### 3. PDF Service (interno)
- **Puerto**: 5001
- **Dockerfile**: `pdf-service/Dockerfile`
- **Build Context**: `pdf-service/`

### 4. MongoDB (interno)
- **Imagen**: mongo:6
- **Puerto**: 27017
- **Variables de entorno**:
  ```
  MONGO_INITDB_DATABASE=transportsys
  ```

## Pasos de configuración en Coolify:

1. **Crear proyecto nuevo** con repositorio Git
2. **Configurar 2 servicios principales**:
   - Frontend: Dominio `pioneros.bitforges.com`
   - Backend: Dominio `api-pioneros.bitforges.com`
3. **Configurar servicios internos** (sin dominio público):
   - PDF Service
   - MongoDB
4. **Configurar red interna** para comunicación entre servicios

## Verificación:
- Frontend: https://pioneros.bitforges.com
- API Status: https://api-pioneros.bitforges.com/status
- API Test: https://api-pioneros.bitforges.com/api/test