const soap = require('soap');

// URL del WSDL
const wsdlUrl = 'https://srvservicios.asfi.gob.bo/RetencionesDev/ServicioRetencionFondos.svc?wsdl';

// Crear el cliente SOAP
soap.createClient(wsdlUrl, (err, client) => {
    if (err) {
        console.error('Error al cargar el WSDL:', err);
        return;
    }

    console.log('Cliente SOAP creado con éxito.');
    console.log('Descripción del cliente:', client.describe());
});