const mosca = require('mosca');
const express = require('express');
const http = require('http');

var settings = {
		port:1883
}

var app = express();
var server = http.createServer(app);

var server = new mosca.Server(settings, function() {
    server.attachHttpServer(app);
});

server.on('ready', function(){
    console.log("Servidor MQTT em execucao");
});
