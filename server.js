const express = require('express')
const { Client } = require('pg')
const app = express();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
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
    var requests;
    if (err) {
        requests = 'DB not found...'
    }
    else {
        requests = res.rows;
    }
    client.end();

    app.route('/api/requests').get((req, res) => {
        res.send(requests);
    });
});

app.route('/').get((req, res) => {
    res.send(`<h3 style="font-family:Calibri">This works...</h3>`);
});