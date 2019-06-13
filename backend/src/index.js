const express = require('express');
const mongoose = require('mongoose');
const path = require('path');       // dependencias
const cors = require('cors')

const app = express();

const server = require('http').Server(app); // COnsegue ver http
const io = require('socket.io')(server); // Adiciona websockets as requisicoes de server

mongoose.connect('mongodb+srv://admin:admin601263@cluster0-xibvb.mongodb.net/test?retryWrites=true&w=majority',
        {useNewUrlParser: true});

app.use((req, res , next) => {//toda rota tem acesso ou repassa a requisicao pra toda rota
    req.io = io;
    next();    //Garante que todos outro midwares continuem executando
})

app.use(cors());  //permite que todos enderecos conseguem acessr o back end

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));        

app.use(require('./routes'));

server.listen(3333);