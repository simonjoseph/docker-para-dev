const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/external-api', async(req, res) => {
    const adress = 'https://external-api:9000/products';
    const response = await fetch(adress);
    const data = await response.json();
    res.json(data);
});

app.get('test-db', async(req, res) => {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });
    connection.connect();
    res.send('Connected to database successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}` );
});
