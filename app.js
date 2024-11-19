const soap = require('soap');

const url = 'https://srvservicios.asfi.gob.bo/RetencionesDev/ServicioRetencionFondos.svc?wsdl';

const options = {
    wsdl_headers: {
        'Content-Type': 'application/soap+xml; charset=utf-8',
    },
    wsdl_options: {
        rejectUnauthorized: false, // Si es necesario omitir errores SSL
    },
};

soap.createClient(url, options, function (err, client) {
    if (err) {
        console.error(err);
        return;
    }

    client.addHttpHeader('Content-Type', 'application/soap+xml; charset=utf-8');

    const args = {
        Texto: 'Texto de prueba para Ping',
    };

    client.Ping(args, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
});