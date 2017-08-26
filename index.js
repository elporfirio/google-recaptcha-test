var express = require('express');
var app = express();
var requestp = require('request-promise');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:63342");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, cache-control");
    next();
});

app.post('/verify', function (req, res) {
    var options = {
        method: 'POST',
        uri: 'https://www.google.com/recaptcha/api/siteverify',
        form: {
            secret: '6LcL_C0UAAAAAMDuFe0w71MBc6o2R1zRVLoNrCC0',
            response: req.body.response
        },
        json: true
    };

    requestp(options)
        .then(function(response){
            if(response.success){
                res.send('verificado');
            } else {
                throw Error('Eres un robot ¬¬');
            }
        })
        .catch(function (err) {
            res.status(403).send(err);
            console.error('error', err);
        });
});

app.listen(3000, function () {
    console.log('Express iniciado');
});