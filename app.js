const axios = require('axios');
const xml2js = require('xml2js');

const serviceUrl = 'https://srvservicios.asfi.gob.bo/RetencionesDev/ServicioRetencionFondos.svc/Soap';

// Construcción del mensaje SOAP adaptado al WSDL
const soapMessage = `
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="https://srvservicios.asfi.gob.bo/RetencionesDev/">
    <soap:Header/>    
    <soap:Body>
        <tns:Ping>
            <tns:entrada>PruebaPing</tns:entrada>
        </tns:Ping>
    </soap:Body>
</soap:Envelope>
`;
/* const soapMessage = `
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="https://srvservicios.asfi.gob.bo/RetencionesDev/">
    <soap:Body>
        <tns:Ping>
            <tns:InputParameter>PruebaPing</tns:InputParameter>
        </tns:Ping>
    </soap:Body>
</soap:Envelope>
`;
 */
async function callSoapService() {
    try {
        // Realizar la solicitud SOAP
        const response = await axios.post(serviceUrl, soapMessage, {
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': '"https://srvservicios.asfi.gob.bo/RetencionesDev/IRetencionFondos/Ping"'
            }
        });

        console.log("============ Respuesta completa del servicio: ==============");
        console.log(response);
        console.log("==========================");

        // Analizar la respuesta SOAP
        const parser = new xml2js.Parser({ explicitArray: false, tagNameProcessors: [xml2js.processors.stripPrefix] });
        const result = await parser.parseStringPromise(response.data);

        // Extraer datos relevantes
        const responseBody = result.Envelope.Body;
        const pingResult = responseBody.PingResponse.PingResult;

        console.log("Resultado del servicio:", pingResult);
    } catch (error) {
        console.error("Error al invocar el servicio:");
        console.error(error.response?.data || error.message);
    }
}

// Llamar al servicio SOAP
callSoapService();
