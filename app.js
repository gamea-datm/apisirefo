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

    // Seleccionar el endpoint adecuado (por ejemplo, ep_RetencionFondos_basicHttp)
    const endpoint = client['RetencionFondos']['ep_RetencionFondos_basicHttp'];

    // Definir los parámetros con el espacio de nombres correcto
    const params = {
        Ping: {
            // Agrega los parámetros esperados por el servicio aquí.
            InputParameter: 'PruebaPing' // Cambia según la estructura del WSDL
        }
    };

    // Invocar la operación Ping
    endpoint.Ping(params, (err, result) => {
        if (err) {
            console.error('Error al invocar la operación Ping:', err);
            return;
        }

        console.log('Respuesta de la operación Ping:', result);
    });
});