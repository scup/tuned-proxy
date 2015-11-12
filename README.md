# Tuned Proxy

## Initializy
```javascript
var TunedProxy = require('tuned-proxy');

var tunedConfig = {
	file: 'file_path'
};

var tunedProxy = new TunedProxy(tunedConfig);

var http = require('http');

var options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/',
  method: 'GET'
};

var req = http.request(options, function(res) {
  tunedProxy.register(res);
  //do what u want man, be free dear fellow
});

```