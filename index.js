const fetch = require('node-fetch')
const crypto = require('crypto')

const url = '<URL>'
const tokenId = '<TOKENID>'
const tokenSecret = '<TOKENSECRET>'

const payload = {
  tokenId: tokenId,
  timestamp: new Date().toISOString(),
  checkout: null,
}

const calculatedHash = crypto.createHmac('sha512', tokenSecret).update(JSON.stringify(payload), 'utf8').digest('base64')

const options = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'digest': `HMAC-SHA512=${calculatedHash}`
  },
  body: JSON.stringify(payload)
}

fetch(`${url}/orders`, options)
  .then(res => res.json())
  .then(parsedRes => console.log('SUCCESS', parsedRes))
  .catch(err => console.log('ERROR', err))
