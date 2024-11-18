const soap = require('soap');
const url = 'https://srvservicios.asfi.gob.bo/RetencionesDev/ServicioRetencionFondos.svc?wsdl';

async function callPing() {
    try {
        // Crear el cliente SOAP
        const client = await soap.createClientAsync(url);

        // Configuración opcional del encabezado de seguridad
        /* const securityHeader = {
            Username: 'your_username',
            Password: 'your_password',
        };

        client.setSecurity(new soap.WSSecurity(securityHeader.Username, securityHeader.Password));
        */
        // Invocar la operación Ping
        const args = {
            Texto: 'Texto de prueba para Ping', // Cambiar por el texto requerido
        };

        // Invocar la operación Ping
        const [result] = await client.PingAsync(args);  
        console.log('Resultado de Ping:', result); 
    } catch (error) {
        console.error('Error al invocar Ping:', error); 
    }
}
console.log("CONSUMO DE SERVICIO PING");
callPing();