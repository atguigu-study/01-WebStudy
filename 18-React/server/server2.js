var express = require('express');
var app = express();

app.use((req, res, next) => {
  console.log('server2 request host:', req.get('host'));
  console.log('server2 request url:', req.url);
  next();
});

app.get('/cars', (req, res) => {
  const cars = [
    { id: 1, brand: 'Toyota', model: 'Camry', year: 2020 },
    { id: 2, brand: 'Honda', model: 'Civic', year: 2021 },
    { id: 3, brand: 'Ford', model: 'Mustang', year: 2022 }
  ];
  res.send(cars);
});

app.listen(5001);