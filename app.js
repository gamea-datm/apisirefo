const axios = require('axios');

axios({
    method: 'get',
    url: 'https://servicios.asfi.gob.bo/Retencionesdev/ServicioRetencionFondos.svc?wsdl',
    timeout: 5000
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
// prueba 2