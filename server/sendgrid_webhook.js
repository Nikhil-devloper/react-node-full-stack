const localtunnel = require('localtunnel');

console.log('Inside tunnel file');

(async () => {
  const tunnel = await localtunnel({ port: 5001 });
 
  console.log('Inside tunnel');
  
  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  tunnel.url;
 
  console.log('Inside tunnel',tunnel.url);

  tunnel.on('close', () => {
    // tunnels are closed
  });
})();