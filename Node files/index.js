window.onload =function(){
    //connection to our websocket    
    var socket = new WebSocket('io://localhost:8000');
    
    //input
    //grabbing the element from the html file
    var el = document.getElementbyId('myColor');
    el.addEventListener('change',function(data){
    //when values in html changes, we grab the valuse in our function an dpass it through the socket, our server making the led change colour 
        socket.send(data.target.value);
                            
    })
    
}