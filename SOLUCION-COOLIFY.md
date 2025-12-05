# 🔧 SOLUCIÓN: Problema de dominio en Coolify

## ❌ Problema Original
- La aplicación funciona por IP pero no por dominio
- Error típico de configuración de proxy reverso y CORS

## ✅ Solución Implementada

### 1. **CORS Configurado Correctamente** 
```javascript
// backend/app.js - Dominios permitidos configurados
const allowedOrigins = [
  'https://pioneros.bitforges.com',     // Frontend
  'https://api-pioneros.bitforges.com', // API
  'http://localhost:3000',              // Desarrollo
  // ... más dominios
];
```

### 2. **Puertos Corregidos**
```typescript
// frontend/vite.config.ts - Puerto consistente
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 3000,  // ✅ Coincide con Dockerfile
    }
});
```

### 3. **API URL Dinámica**
```typescript
// frontend/src/lib/config.ts - Se adapta al entorno
export const API_URL = typeof window !== 'undefined' 
    ? (window.location.hostname.includes('localhost')
        ? `http://localhost:${API_PORT}`
        : 'https://api-pioneros.bitforges.com')  // ✅ Dominio para producción
    : 'https://api-pioneros.bitforges.com';
```

## 🚀 Configuración en Coolify

### Servicios a crear:

#### **Frontend** (pioneros.bitforges.com)
- Build Context: `frontend/`
- Puerto: `3000`
- Variables de entorno:
  ```
  NODE_ENV=production
  API_URL=https://api-pioneros.bitforges.com
  ```

#### **Backend API** (api-pioneros.bitforges.com)
- Build Context: `backend/`
- Puerto: `3500`
- Variables de entorno:
  ```
  NODE_ENV=production
  PORT=3500
  HOST=0.0.0.0
  MONGO_URI=mongodb://mongo:27017/transportsys
  CORS_ORIGIN=https://pioneros.bitforges.com,https://api-pioneros.bitforges.com
  ```

#### **Servicios Internos** (sin dominio)
- **PDF Service**: Puerto 5001
- **MongoDB**: Puerto 27017

## 📋 Lista de Verificación

- [ ] Push de todos los cambios al repositorio
- [ ] Configurar proyecto en Coolify desde Git
- [ ] Crear servicio Frontend con dominio `pioneros.bitforges.com`
- [ ] Crear servicio Backend con dominio `api-pioneros.bitforges.com`
- [ ] Agregar servicios internos (MongoDB, PDF)
- [ ] Configurar variables de entorno para cada servicio
- [ ] Verificar que todos los servicios están en la misma red
- [ ] Probar con: `node verify-deployment.js`

## 🔍 Verificación Post-Despliegue

### URLs a verificar:
- ✅ Frontend: https://pioneros.bitforges.com
- ✅ API Status: https://api-pioneros.bitforges.com/status  
- ✅ API Test: https://api-pioneros.bitforges.com/api/test

### Script de verificación:
```bash
node verify-deployment.js
```

## 🐛 Si todavía hay problemas:

### 1. **Error CORS**
- Verificar que `CORS_ORIGIN` incluye ambos dominios
- Revisar logs del backend para ver requests rechazados

### 2. **Frontend no carga**
- Verificar que `API_URL` apunta al dominio correcto
- Revisar build del frontend en logs de Coolify

### 3. **API no responde**
- Verificar que MongoDB está ejecutándose
- Revisar variables de entorno en el dashboard de Coolify

### 4. **Servicios no se comunican**
- Verificar red interna en Coolify
- Revisar que todos los servicios están en el mismo proyecto

## 📞 Comando de prueba rápida:
```powershell
# En tu máquina local para verificar que los dominios resuelven:
nslookup pioneros.bitforges.com
nslookup api-pioneros.bitforges.com
```

## ✅ **Resultado esperado:**
- ✅ Frontend funciona en https://pioneros.bitforges.com
- ✅ API responde en https://api-pioneros.bitforges.com
- ✅ No más errores CORS
- ✅ Comunicación correcta entre servicios