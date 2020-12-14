const express = require('express');
const { Server } = require('http');
const path = require('path');
const app = express();

//get puerto y envia 
app.set('port', process.env.PORT || 3000);

//usa  el path principal y lo une sin depender de un sistema operativo 
app.use(express.static( path.join(__dirname,'public')));

//escucha al servidor y al momento ejecutamos la funcion para decirle que puerto estamos utilizando 
 const server = app.listen( app.get('port'), ()=>{
    //mandamos el puerto de ejecusion
    console.log('Servidor en el puerto: ', app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO(server);


io.on('connection',(socket)=>{
    console.log('Nueva Coneccion', socket.id);

    socket.on('mensaje',(data)=>{
        
        io.sockets.emit('mensaje',{
            usuario : data.usuario,
            mensaje : data.mensaje,
        });
    });

    socket.on('tiping',(data)=>{
        socket.broadcast.emit('tiping',data);
    });


});