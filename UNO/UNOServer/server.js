const express = require('express');
const application = express();
const createError = require('http-errors');
const pug = require('pug')
const path = require('path');
const Logger = require("@ptkdev/logger");
let server = require('http').Server(application);
let GameServiceFactory = require('./game_logic/GameHandlerandservice/GameServiceFactory.js');
let GameServiceRepository = require('./game_logic/GameHandlerandservice/GameServiceRepository.js');

application.get('/', function(request, response){
    response.sendFile(__dirname + '/client/index.html');
});
application.use('/client', express.static(__dirname + '/client'));

server.listen(3000);


const logger = new Logger();

logger.info('************ Welcome to UNO ************');

let io = require('socket.io')(server, {});
let gameServiceRepository = new GameServiceRepository();
let gameServiceFactory = new GameServiceFactory();

io.sockets.on('connection', function(socket) {
    
    logger.debug('Socket connection');
    socket.on('create', function(room) {

        logger.debug('Created room code: ' + room)
        logger.docs(' socketId: ' + socket.id);

        socket.join(room);

        let gameService = gameServiceRepository.findById(room);

        if(!gameService){
            gameService = gameServiceFactory.create("UNO", room);
            gameServiceRepository.insert(gameService);
        }
        socket.use(function(packet){
            gameService.handleAction(socket, packet[0], packet[1]);             
            Object.keys(io.sockets.sockets).forEach(function(id) {
                let data = gameService.getClientResponseData(id);
                if(data){
                    io.to(id).emit('state', data);
                }
            });
        });
    });
});



