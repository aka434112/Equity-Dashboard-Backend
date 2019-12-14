var express = require('express');
var router = express.Router();
const nseScraperSvc = require('../services/nseScraperSvc.js');


/* GET home page. */
router.get('/api/search', async function(req, res, next) {
  let symbol = req.query.symbol;
  const duration = req.query.duration;
  const EQUITY_SYMBOL_KEY = 'sym';
  const MARKET_INFO_KEY = 'marketInfo';
  let marketInfo;
  let equityData;
  let updateCount = 0;
  if(duration && symbol && symbol !== '') {
    equityData = await nseScraperSvc.fetchEquity(symbol, duration);
    equityData = equityData.rows;
    if(!equityData.length) {
      res.send([]);
      return;
    }
    equityData.forEach(equity => {
      nseScraperSvc.fetchMarketInfo(equity[EQUITY_SYMBOL_KEY]).then(marketInfo => {
        updateCount++;
        equity[MARKET_INFO_KEY] = marketInfo;
        if(updateCount === equityData.length) {
          res.send(equityData);
        }
      })
    })
  } else {
    res.status(400).send();
  }
});

router.get('/api/fetchCompanyList', async function (req, res, next) {
  const query = req.query.query;
  if(query) {
    const queryResults = await nseScraperSvc.fetchCompanyList(query);
    res.send(queryResults);
  } else {
    res.status(400).send();
  }
});

module.exports = router;
