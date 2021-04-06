require('dotenv').config()
const express = require('express')
const app = express();
const fs = require('fs');
const cors = require('cors')
// const morganBody = require('morgan-body');
const path = require('path');
const api = require('./routes/api')
const { sequelize } = require('./models')
const config = require('./config/config')

// const http = require('http');
// var https = require('https');
// var privateKey  = fs.readFileSync('certificates/key.pem', 'utf8');
// var certificate = fs.readFileSync('certificates/cert.pem', 'utf8');

// const credentials = {key: privateKey, cert: certificate}; 
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'))
app.disable('x-powered-by');

// const log = fs.createWriteStream(
//     path.join(__dirname, "logs", "express.log"), { flags: "a" }
// );

// morganBody(app, {
//     noColors: true,
//     stream: log,
// });

// const httpServer = http.createServer(app);

app.use('/api', api)

app.get('*', (req, res) => {
  res.redirect('/')
})

app.post('*', (req, res) => {
  res.json({ error: 'Unauthorized request.' })
})

sequelize.sync({ force: true })
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server is running on Port ${config.port}`)
  })
})



// For http
// httpServer.listen(PORT, () => {
//     console.log(`Server is running on ${httpServer.URL}:${PORT}`)
// });
// For https
// httpsServer.listen(8443);

