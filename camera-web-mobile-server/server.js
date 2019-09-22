const express = require('express');
const app = express();

const cors = require('cors')
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

let router = require('./routers/router.js');
app.use('/', router);

// Create a Server
const server = app.listen(4040, function () {

    let host = server.address().address
    let port = server.address().port

    console.log("App listening at http://%s:%s", host, port);
})