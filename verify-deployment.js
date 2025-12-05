#!/usr/bin/env node

/**
 * Script de verificación para el despliegue en Coolify
 * Verifica que ambos dominios estén funcionando correctamente
 */

const https = require('https');
const http = require('http');

const endpoints = [
    {
        name: 'Frontend',
        url: 'https://pioneros.bitforges.com',
        expectedStatus: 200,
        type: 'frontend'
    },
    {
        name: 'API Status',
        url: 'https://api-pioneros.bitforges.com/status',
        expectedStatus: 200,
        type: 'api'
    },
    {
        name: 'API Test',
        url: 'https://api-pioneros.bitforges.com/api/test',
        expectedStatus: 200,
        type: 'api'
    }
];

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https:') ? https : http;
        
        const req = client.get(url, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Coolify-Deployment-Verifier/1.0'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    data: data,
                    url: url
                });
            });
        });

        req.on('error', reject);
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

async function verifyEndpoint(endpoint) {
    try {
        console.log(`🔍 Verificando ${endpoint.name}: ${endpoint.url}`);
        
        const response = await makeRequest(endpoint.url);
        
        if (response.statusCode === endpoint.expectedStatus) {
            console.log(`✅ ${endpoint.name}: OK (${response.statusCode})`);
            
            if (endpoint.type === 'api') {
                try {
                    const jsonData = JSON.parse(response.data);
                    console.log(`   📊 Respuesta: ${JSON.stringify(jsonData, null, 2)}`);
                } catch (e) {
                    console.log(`   📄 Respuesta: ${response.data.substring(0, 100)}...`);
                }
            }
            
            return true;
        } else {
            console.log(`❌ ${endpoint.name}: Error ${response.statusCode}`);
            console.log(`   📄 Respuesta: ${response.data.substring(0, 200)}...`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ ${endpoint.name}: ${error.message}`);
        return false;
    }
}

async function verifyDeployment() {
    console.log('🚀 Iniciando verificación del despliegue...\n');
    
    let allPassed = true;
    
    for (const endpoint of endpoints) {
        const result = await verifyEndpoint(endpoint);
        allPassed = allPassed && result;
        console.log(''); // Línea en blanco
    }
    
    console.log('='.repeat(50));
    if (allPassed) {
        console.log('🎉 ¡Todos los servicios están funcionando correctamente!');
        console.log('✅ El despliegue en Coolify fue exitoso');
    } else {
        console.log('⚠️  Algunos servicios tienen problemas');
        console.log('❗ Revisa la configuración en Coolify');
    }
    
    process.exit(allPassed ? 0 : 1);
}

verifyDeployment();