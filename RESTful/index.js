import express from 'express';
import fs from 'fs';
import e from 'express';


const store_filename = 'store-service-all-merchants.json';
const store_rawdata = fs.readFileSync(store_filename);
const store_data = JSON.parse(store_rawdata);

const amino_filename = 'amino-service-all-merchants.json';
const amino_rawdata = fs.readFileSync(amino_filename);
const amino_data = JSON.parse(amino_rawdata);

const amino_top_filename = 'amino-service-top-merchants.json';
const amino_top_rawdata = fs.readFileSync(amino_top_filename);
const amino_top_data = JSON.parse(amino_top_rawdata);

const app = express();

app.get('/',(req, res) => {
    res.send('Hello World!');
});

app.get('/v2/internal/merchants', (req, res) => {
    res.send(store_data);
});

app.get('/v1/extension/merchants', (req, res) => {
    const top = req.query.top
    if (top === 'true') {
        res.send(amino_top_data);
    }
    else {
        res.send(amino_data);
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
