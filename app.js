const axios = require('axios');
const xml2js = require('xml2js');

// Definir la URL del servicio
const serviceUrl = 'https://srvservicios.asfi.gob.bo/RetencionesDev/ServicioRetencionFondos.svc/Soap';

// Construir manualmente el mensaje SOAP
const soapMessage = `
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="https://srvservicios.asfi.gob.bo/RetencionesDev/">
    <soap:Body>
        <ns:Ping>
            <ns:InputParameter>PruebaPing</ns:InputParameter>
        </ns:Ping>
    </soap:Body>
</soap:Envelope>
`;

// Realizar la solicitud POST
axios.post(serviceUrl, soapMessage, {
    headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': '"https://srvservicios.asfi.gob.bo/RetencionesDev/IRetencionFondos/Ping"'
    }
})
    .then(async (response) => {
        console.log("Respuesta completa del servicio:");
        console.log(response.data);

        // Analizar la respuesta SOAP
        const parser = new xml2js.Parser({ explicitArray: false });
        const result = await parser.parseStringPromise(response.data);

        // Extraer datos relevantes de la respuesta
        const responseBody = result['soap:Envelope']['soap:Body'];
        console.log("Cuerpo de la respuesta:", responseBody);
    })
    .catch((error) => {
        console.error("Error al invocar el servicio:");
        console.error(error.response?.data || error.message);
    });
