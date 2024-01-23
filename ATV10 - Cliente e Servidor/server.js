const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/transformar', (req, res) => {
    const texto = req.body.texto;
    const paraMaiusculo = req.body.paraMaiusculo === 'true';

    const textoTransformado = paraMaiusculo ? texto.toUpperCase() : texto.toLowerCase();

    res.send(textoTransformado);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
