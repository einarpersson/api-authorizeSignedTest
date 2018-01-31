const fetch = require('node-fetch')
const crypto = require('crypto')
const {
    url,
    tokenId,
    tokenSecret
} = require('./config')

/******** FOR GET REQUEST  ********/
const timestamp = new Date().toISOString()
const urlToGet = `${url}/stats/calls/mostcommon?phonenumber=0707227024&noofPhonenumbers=5&tokenId=${tokenId}`
const signatureDataGet = urlToGet + ';' + timestamp

const calculatedHashGet = crypto.createHmac('sha512', tokenSecret).update(signatureDataGet, 'utf8').digest('base64')

const optionsGet = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Date': timestamp,
        'digest': `HMAC-SHA512=${calculatedHashGet}`
    }
}

fetch(urlToGet, optionsGet)
    .then(res => {
        return res.json()
    })
    .then(parsedRes => console.log('GET SUCCESS', parsedRes))
    .catch(err => console.log('GET ERROR', err))


/******** FOR POST REQUEST  ********/
const payload = {
    tokenId: tokenId,
    timestamp: new Date().toISOString(),
    checkout: null,
}
const signatureDataPost = JSON.stringify(payload)
const calculatedHashPost = crypto.createHmac('sha512', tokenSecret).update(signatureDataPost, 'utf8').digest('base64')
const optionsPost = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'digest': `HMAC-SHA512=${calculatedHashPost}`
    },
    body: JSON.stringify(payload)
}

fetch(`${url}/orders`, optionsPost)
    .then(res => res.json())
    .then(parsedRes => console.log('POST SUCCESS', parsedRes))
    .catch(err => console.log('POST ERROR', err))