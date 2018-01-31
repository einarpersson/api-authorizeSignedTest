const nconf = require('nconf').env({
  separator: '__',
  lowerCase: true
}).file({
  file: 'config.json',
  dir: './',
  search: true
})

nconf.defaults({
  url: '<URL>',
  tokenId: '<TOKENID>',
  tokenSecret: '<TOKENSECRET>'
})

module.exports = {
  url: nconf.get('url'),
  tokenId: nconf.get('tokenId'),
  tokenSecret: nconf.get('tokenSecret'),
}
