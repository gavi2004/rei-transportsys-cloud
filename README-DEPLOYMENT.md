# Guía de Despliegue en Coolify

## 🚀 Resumen del Problema

**Problema**: La aplicación funciona por IP pero no por dominio en Coolify.

**Causa principal**: Configuración incorrecta de CORS, puertos y proxy reverso para múltiples dominios.

## ✅ Solución Implementada

### Cambios realizados:

1. **Configuración CORS mejorada** (`backend/app.js`)
   - Lista específica de dominios permitidos
   - Manejo automático para desarrollo y producción
   - Headers y métodos correctamente configurados

2. **Configuración de puertos corregida** (`frontend/vite.config.ts`)
   - Puerto 3000 consistente con Dockerfile
   - Configuración para preview mode

3. **API URL dinámica** (`frontend/src/lib/config.ts`)
   - Detección automática de entorno
   - URLs diferentes para localhost y producción

4. **Docker-compose optimizado** (`docker-compose.prod.yml`)
   - Configuración específica para producción
   - Variables de entorno correctas
   - Red interna configurada

## 🔧 Configuración en Coolify

### Servicios a crear:

#### 1. Frontend (pioneros.bitforges.com)
```
Build Context: frontend/
Dockerfile: frontend/Dockerfile
Puerto: 3000
Variables de entorno:
  NODE_ENV=production
  API_URL=https://api-pioneros.bitforges.com
```

#### 2. Backend API (api-pioneros.bitforges.com)
```
Build Context: backend/
Dockerfile: backend/Dockerfile
Puerto: 3500
Variables de entorno:
  NODE_ENV=production
  PORT=3500
  HOST=0.0.0.0
  MONGO_URI=mongodb://mongo:27017/transportsys
  CORS_ORIGIN=https://pioneros.bitforges.com,https://api-pioneros.bitforges.com
```

#### 3. Servicios internos (sin dominio público)
```
PDF Service:
  Build Context: pdf-service/
  Puerto: 5001

MongoDB:
  Imagen: mongo:6
  Puerto: 27017
  Variables:
    MONGO_INITDB_DATABASE=transportsys
```

## 🔍 Verificación

1. **Ejecutar script de verificación**:
   ```bash
   node verify-deployment.js
   ```

2. **URLs a verificar manualmente**:
   - Frontend: https://pioneros.bitforges.com
   - API Status: https://api-pioneros.bitforges.com/status
   - API Test: https://api-pioneros.bitforges.com/api/test

## 🐛 Resolución de problemas comunes

### Si el frontend no carga:
- Verificar que el puerto 3000 está configurado correctamente
- Revisar las variables de entorno del frontend
- Comprobar que el build se completó correctamente

### Si hay errores CORS:
- Verificar que los dominios están en la lista `allowedOrigins`
- Revisar las variables de entorno `CORS_ORIGIN`
- Comprobar que los headers están correctamente configurados

### Si la API no responde:
- Verificar que MongoDB está ejecutándose
- Revisar logs del backend para errores de conexión
- Comprobar que las variables de entorno están configuradas

### Si los servicios no se comunican:
- Verificar que están en la misma red de Coolify
- Revisar la configuración de DNS interno
- Comprobar que los puertos están expuestos correctamente

## 📋 Lista de verificación pre-despliegue

- [ ] Dominios configurados en DNS
- [ ] Certificados SSL configurados en Coolify
- [ ] Variables de entorno definidas
- [ ] Build contexts correctos
- [ ] Puertos configurados
- [ ] Red interna configurada
- [ ] Volúmenes para MongoDB configurados

## 🔄 Pasos de despliegue

1. **Push de cambios al repositorio**
2. **Configurar proyecto en Coolify**
3. **Crear servicios uno por uno**
4. **Configurar dominios y variables**
5. **Desplegar en el siguiente orden**:
   - MongoDB
   - PDF Service
   - Backend API
   - Frontend
6. **Verificar con el script**
7. **Probar funcionalidad completa**

## 📞 Contacto

Si necesitas ayuda adicional, revisa:
- Logs de Coolify para cada servicio
- Documentación de Coolify sobre múltiples servicios
- Red interna y comunicación entre servicios