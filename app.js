const axios = require('axios');
const xml2js = require('xml2js');

const serviceUrl = 'https://srvservicios.asfi.gob.bo/RetencionesDev/ServicioRetencionFondos.svc/Soap';

// Mensaje SOAP para la operación Ping
const pingSoapMessage = `
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="https://srvservicios.asfi.gob.bo/RetencionesDev/">
    <soap:Header/>
    <soap:Body>
        <tns:Ping>
            <tns:entrada>PruebaPing</tns:entrada>
        </tns:Ping>
    </soap:Body>
</soap:Envelope>
`;

// Mensaje SOAP para la operación RemitirSolicitud
const remitirSolicitudSoapMessage = `
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="https://srvservicios.asfi.gob.bo/RetencionesDev/">
    <soap:Header/>
    <soap:Body>
        <tns:RemitirSolicitud>
            <tns:RemitirSolicitudRequest>
                <tns:Cabecera>
                    <tns:IdSolicitud>123</tns:IdSolicitud>
                    <tns:Entidad>EntidadDemo</tns:Entidad>
                    <tns:TipoProceso>ProcesoDemo</tns:TipoProceso>
                    <tns:CodigoSolicitud>ABC123</tns:CodigoSolicitud>
                    <tns:FechaEnvio>2024-11-20</tns:FechaEnvio>
                    <tns:Gerencia>GerenciaDemo</tns:Gerencia>
                    <tns:AutoridadSolicitante>AutoridadDemo</tns:AutoridadSolicitante>
                    <tns:AutoridadCargo>CargoDemo</tns:AutoridadCargo>
                    <tns:Adjunto>ArchivoBase64</tns:Adjunto>
                    <tns:AdjuntoNombre>documento.pdf</tns:AdjuntoNombre>
                    <tns:DetalleCantidad>2</tns:DetalleCantidad>
                    <tns:HashDatos>HashDemo</tns:HashDatos>
                    <tns:HashImagen>HashImagenDemo</tns:HashImagen>
                    <tns:Usuario>UsuarioDemo</tns:Usuario>
                </tns:Cabecera>
                <tns:Detalles>
                    <tns:Detalle>
                        <tns:Item>1</tns:Item>
                        <tns:ApellidoPaterno>PaternoDemo1</tns:ApellidoPaterno>
                        <tns:ApellidoMaterno>MaternoDemo1</tns:ApellidoMaterno>
                        <tns:Nombres>NombreDemo1</tns:Nombres>
                        <tns:DocumentoIdentidadTipo>1</tns:DocumentoIdentidadTipo>
                        <tns:DocumentoIdentidadNumero>12345678</tns:DocumentoIdentidadNumero>
                        <tns:MontoRetencionBs>100.50</tns:MontoRetencionBs>
                        <tns:TipoRespaldo>1</tns:TipoRespaldo>
                        <tns:DocumentoRespaldo>DocRespaldoDemo1</tns:DocumentoRespaldo>
                        <tns:HashDetalle>HashDetalleDemo1</tns:HashDetalle>
                    </tns:Detalle>
                    <tns:Detalle>
                        <tns:Item>2</tns:Item>
                        <tns:ApellidoPaterno>PaternoDemo2</tns:ApellidoPaterno>
                        <tns:ApellidoMaterno>MaternoDemo2</tns:ApellidoMaterno>
                        <tns:Nombres>NombreDemo2</tns:Nombres>
                        <tns:DocumentoIdentidadTipo>2</tns:DocumentoIdentidadTipo>
                        <tns:DocumentoIdentidadNumero>87654321</tns:DocumentoIdentidadNumero>
                        <tns:MontoRetencionBs>200.75</tns:MontoRetencionBs>
                        <tns:TipoRespaldo>2</tns:TipoRespaldo>
                        <tns:DocumentoRespaldo>DocRespaldoDemo2</tns:DocumentoRespaldo>
                        <tns:HashDetalle>HashDetalleDemo2</tns:HashDetalle>
                    </tns:Detalle>
                </tns:Detalles>
                <tns:Identidad>
                    <tns:Usuario>UsuarioDemo</tns:Usuario>
                    <tns:Clave>ClaveDemo</tns:Clave>
                </tns:Identidad>
            </tns:RemitirSolicitudRequest>
        </tns:RemitirSolicitud>
    </soap:Body>
</soap:Envelope>
`;

async function callSoapService(action, message) {
    try {
        const response = await axios.post(serviceUrl, message, {
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': `"https://srvservicios.asfi.gob.bo/RetencionesDev/IRetencionFondos/${action}"`
            }
        });

        const parser = new xml2js.Parser({ explicitArray: false, tagNameProcessors: [xml2js.processors.stripPrefix] });
        const result = await parser.parseStringPromise(response.data);

        console.log("Respuesta del servicio:", result.Envelope.Body);
    } catch (error) {
        console.error("Error al invocar el servicio:", error.response?.data || error.message);
    }
}

// Llamar a la operación Ping
console.log("Invocando operación Ping...");
callSoapService('Ping', pingSoapMessage);

// Llamar a la operación RemitirSolicitud
console.log("Invocando operación RemitirSolicitud...");
callSoapService('RemitirSolicitud', remitirSolicitudSoapMessage);
