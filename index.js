const mosca = require('mosca');
const express = require('express');
const http = require('http');

var settings = {
		port:1883
}

var servehttp = http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type": "text/html"});
	if(request.url == "/"){
		response.write("<h1>Página principal</h1>");
		console.log('Pagina inicial');
	}else if(request.url == "/bemvindo"){
		response.write("<h1>Bem-vindo :)</h1>");
		console.log('Pagina bem vindo');
	}else{
		response.write("<h1>Página não encontrada :(</h1>");
		console.log('Pagina nao encontrada');
	}
	response.end();
});

var mqtt = new mosca.Server(settings, function() {
    server.attachHttpServer(app);
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
