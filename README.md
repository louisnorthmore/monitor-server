[![Stories in Ready](https://badge.waffle.io/louisnorthmore/monitor-server.png?label=ready&title=Ready)](https://waffle.io/louisnorthmore/monitor-server)
# monitor-server
Simple Monitor Server in node.js designed to be used to view realtime logs or messages from anything!

### Usage
Install dependencies: ```npm install```
<br>Start the server: ```node server.js```

You can send messages to be displayed using curl and sending a JSON object:<br>
```curl -X POST -H 'Content-Type:application/json' 'http://127.0.0.1:8080/message' -d '{"message":"Hello!","name":"Louis","type":"default"}'```

You can access the monitor itself via a web browser eg: http://127.0.0.1:8080
