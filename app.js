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

    // Seleccionar el endpoint adecuado (por ejemplo, ep_RetencionFondos_basicHttp o ep_RetencionFondos_wsHttp)
    const endpoint = client['RetencionFondos']['ep_RetencionFondos_basicHttp'];

    // Definir los parámetros para tns:IRetencionFondos_Ping_InputMessage
    const params = {
        // Sustituye 'ValorEjemplo' con los datos reales que necesites enviar según el esquema del WSDL
        // Usa las claves correctas según la definición del mensaje en el WSDL
        InputParameter: 'PruebaPing'
    };

    // Invocar la operación Ping con los parámetros
    endpoint.Ping(params, (err, result) => {
        if (err) {
            console.error('Error al invocar la operación Ping:', err);
            return;
        }

        console.log('Respuesta de la operación Ping:', result);
    });
});