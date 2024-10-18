const axios = require('axios');
const https = require('https');

const fs = require('fs');
const path = require('path');

const certFile = path.join(__dirname, 'Certificado2024.crt');

const agentWithCert = new https.Agent({
    keepAlive: true,
    cert: fs.readFileSync(certFile),
    rejectUnauthorized: false
});
axios({
    method: 'get',
    url: 'https://srvservicios.asfi.gov.bo/Retencionesdev/ServicioRetencionFondos.svc?wsdl',
    httpsAgent: agentWithCert,
    timeout: 5000
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });