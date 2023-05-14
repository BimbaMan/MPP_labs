const express = require('express');
require('dotenv').config();
const app = express();
const WebSocketServer = require('express-ws')(app);
const aWss = WebSocketServer.getWss();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg);
                break;
            case "draw":
                broadcastConnection(ws, msg);
                break;
        }
    })
})

app.listen(PORT, () => console.log(`server start on PORT ${PORT}`));

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg);
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    });
}