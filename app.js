const soap = require('soap');

const url = 'https://srvservicios.asfi.gob.bo/RetencionesDev/ServicioRetencionFondos.svc?wsdl';

async function callPing() {
    try {
        // Crear el cliente SOAP
        const client = await soap.createClientAsync(url, {
            wsdl_options: {
                forceSoap12Headers: true, // Forzar SOAP 1.2
            },
        });

        // Configuración opcional del encabezado de seguridad (si aplica)
        /* const securityHeader = {
            Username: 'your_username',
            Password: 'your_password',
        };

        client.setSecurity(new soap.WSSecurity(securityHeader.Username, securityHeader.Password)); */

        // Argumentos requeridos por la operación Ping
        const args = {
            Texto: 'Texto de prueba para Ping', // Cambiar por el texto requerido
        };

        // Modificar los encabezados SOAP
        client.addSoapHeader(
            `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tns="https://srvservicios.asfi.gob.bo/RetencionesSIN/">
                <soap:Header/>
                <soap:Body>
                    <tns:Ping>
                        <tns:Texto>${args.Texto}</tns:Texto>
                    </tns:Ping>
                </soap:Body>
            </soap:Envelope>`,
        );

        // Invocar la operación Ping
        const [result] = await client.PingAsync(args);

        console.log('Resultado de Ping:', result);
    } catch (error) {
        console.error('Error al invocar Ping:', error);
    }
}

callPing();