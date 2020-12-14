console.log('Hola Mundo');
const socket = io();
//elementos del doom
var mensaje = document.getElementById('mensaje');
var usuario = document.getElementById('usuario');
var btnEnviar = document.getElementById('enviar');
var salida = document.getElementById('salida');
var accion = document.getElementById('accion');
var nombre = document.getElementById('name');


btnEnviar.addEventListener('click',()=>{
    socket.emit('mensaje',{

        mensaje: mensaje.value,
        usuario: usuario.value,
        
    });
    
   this.usuario.style.display= 'none';
    this.mensaje.value="";  
    this.name.innerHTML = usuario.value;      


});
var tecla = document.addEventListener('keydown',(e)=>{
    var keycode = e.keyCode || e.which;
    if(keycode == '13') {



        socket.emit('mensaje',{

            mensaje: mensaje.value,
            usuario: usuario.value,
            
        });
        
       this.usuario.style.display= 'none';
        this.mensaje.value="";   
        this.name.innerHTML = usuario.value;     
    
        
        



    }
});



socket.on('mensaje',function(data){
    console.log(data);
    salida.innerHTML += `<p>
    <strong> ${data.usuario} </strong>: ${data.mensaje}
    </p>
    `;
    accion.innerHTML = '';

    
});

mensaje.addEventListener('keypress',function(){
  socket.emit('tiping', usuario.value);
  accion.innerHTML = '';
});

socket.on('tiping',(dato)=>{
    console.log(dato);
    if(dato ==''){
        accion.innerHTML = `<p> <strong>alguien esta escribiendo algo</strong></p>`;
    }else{
    accion.innerHTML = `<p> <strong>${dato} esta escribiendo algo..</strong></p>`;
    }

});


