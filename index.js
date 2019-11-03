const mosca = require('mosca');
const express = require('express');
const http = require('http');

var settings = {
		port:80
}

var mqtt = new mosca.Server(settings, function() {
    mqtt.attachHttpServer(serverhttp);
});

mqtt.on('ready', function(){
    console.log("Servidor MQTT em execucao");
});

mqtt.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

mqtt.on('published', function(packet, client) {
  console.log('Published : ', packet.payload);
});

mqtt.on('subscribed', function(topic, client) {
  console.log('subscribed : ', topic);
});

mqtt.on('unsubscribed', function(topic, client) {
  console.log('unsubscribed : ', topic);
});

mqtt.on('clientDisconnecting', function(client) {
  console.log('clientDisconnecting : ', client.id);
});

mqtt.on('clientDisconnected', function(client) {
  console.log('clientDisconnected : ', client.id);
});

serverhttp.listen(process.env.PORT || 5000, function(){
	console.log('Servidor HTTP rodando!');
});
