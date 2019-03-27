const express = require('express')
const { Client } = require('pg')
const app = express();

const hostname = '127.0.0.1';
const port = 3001;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'qr2.1_dev',
    password: 'experion',
    port: 5433,
});
client.connect();

client.query('SELECT * FROM public."Requests"', (err, res) => {
    if (err) {
        console.log(err);
    }
    requests = res;
    client.end();

    app.route('/api/requests').get((req, res) => {
        res.send(requests.rows);
    });
});