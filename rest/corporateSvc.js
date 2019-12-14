const axios = require('axios');
const proxyAgent = require('../constants/proxyAgent.js');
const qs = require('querystring');

const corporateSvc = axios.create({
    baseURL: process.env.NSE_CORPORATES_BASE_URI,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9'
    },
    httpsAgent: proxyAgent
});

module.exports = {
   getCompanyList: function (requestPayload) {
     return corporateSvc.post('/common/getCompanyList.jsp', qs.stringify(requestPayload));
   },
   getListDirectEQ: function (requestPayload) {
     return corporateSvc.post('/listDir/getListDirectEQ.jsp', qs.stringify(requestPayload));
   }
 }
