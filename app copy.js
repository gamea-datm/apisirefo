const soap = require('soap');

// URL del WSDL del servicio SOAP
//const url = 'http://www.dneonline.com/calculator.asmx?wsdl';
//const url = 'https://srvservicios.asfi.gob.bo/RetencionesDev/ServicioRetencionFondos.svc';
const url = 'https://srvservicios.asfi.gob.bo/RetencionesDev/ServicioRetencionFondos.svc?wsdl';
// url: 'https://servicios.asfi.gob.bo/Retencionesdev/ServicioRetencionFondos.svc?wsdl'


const url = 'http://www.dneonline.com/calculator.asmx?wsdl';
// Función para llamar al método "Add" en el servicio
async function addNumbers(a, b) {
    try {
        // Crear cliente SOAP
        const client = await soap.createClientAsync(url); 
        // Parámetros como objeto JavaScript
        const args = {
            intA: a,
            intB: b
        }; 
        // Llamar al método "Add" y recibir el resultado
        const [result] = await client.AddAsync(args);
        console.log("Resultado de la suma:", result.AddResult);
    } catch (error) {
        console.error("Error:", error.message);
    }
}  
// Llamada de prueba
addNumbers(5, 8);  

/* const axios = require('axios');

async function fetchData() {
    try {
        const response = await axios({
            method: 'get',
            url: 'https://servicios.asfi.gob.bo/Retencionesdev/ServicioRetencionFondos.svc?wsdl',
            timeout: 5000
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

fetchData(); */