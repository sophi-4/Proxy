window.onload =function(){
//connection to our websocket    
    var socket = new WebSocket('io://localhost:3000');
    
    //input
    var el =document.getElementbyId('myColor');
    el.addEventListener('change', function(){
    //when values in html changes, we grab the valuse in our function an dpass it through the socket, our server making the led change colour 
        socket.send(data.target.value);
                            
    })
    
}