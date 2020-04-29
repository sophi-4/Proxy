# Proxy

# Setup
* brew install node in the directory of proxy file

* npm install socket.io in the directory of the proxy file

* For serial communcation npm install serialport 

* For the proxy's websocket server - npm install express

* npm install johnny-five

Launch the server with: node proxy.js
(If the error 'npm: command not found' arises try - brew update, brew unistall node and brew install node in proxy directory and then npm socket.io followed by other setup instructions. Should solve the issue of command not found) 

# Explanation of code:

* Websockets - they are a communications protocol over a single TCP connection that enables interactions between a browser and server. It’s a real time connection enabling easy transfer of messages from the browser and the server. 
* Express.js - is a framework for node.js that allows easy creation of a web mobile application and to easily create APIs


* We have a node server and P5 js sketch 
The P5 js sketch is going to connect to the node server with socket.io

* The js code executes onto the browser but the browser has to get that js code from somewhere

* We want the server to host the html and js files for the sketch itself 
To change the server to be a web server 

* Express web application framework that allows the server to become a web server   


