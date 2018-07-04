const net = require('net');


module.exports.connect = function (host, port) {
  let client = new net.Socket();
  client.connect(port, host, function() {
    client.write('CONNECT\r\nlogin:system\r\npasscode:manager\r\n\r\n\0');
    // client.write('CONNECT\r\n', 'ascii', () => console.log('data sent 1'));
    // client.write('login:system\r\n', 'ascii', () => console.log('data sent 2'));
    // client.write('passcode:manager\r\n', 'ascii', () => console.log('data sent 3'));
    // client.write('\r\n\0', 'ascii', () => console.log('data sent 4'));
    console.log('Connection established');
  });

  client.on('ready', function() {
    console.log('socket is ready to be used');
  });

  client.on('timeout', function() {
    console.log('Timeout');
    client.end();
  });

  client.on('data', function(data) {
    console.log('data recieved: \r\n' + data);
  });

  client.on('error', function(error) {
    console.log('[Error]: ' + error)
  });

  client.on('close', function() {
    console.log('Connection closed');
  });
};

module.exports.connect('127.0.0.1', 61613);
