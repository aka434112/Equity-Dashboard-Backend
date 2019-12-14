const axios = require('axios');
const proxyAgent = require('../constants/proxyAgent.js');

const marketInfoClient = axios.create({
    baseURL: process.env.NSE_MARKET_INFO_BASE_URI,
    httpsAgent: proxyAgent
});

module.exports = {
   getCorporateAnnouncement: function (symbol) {
     return marketInfoClient.get('/corpAnnounce.jsp?symbol=' + symbol)
   },
   getCorporateActions: function (symbol) {
     return marketInfoClient.get('/corpAction.jsp?symbol=' + symbol)
   },
   getCompanyInfo: function (symbol) {
     return marketInfoClient.get('/compInfo.jsp?symbol=' + symbol + '&series=EQ')
   }
 }
