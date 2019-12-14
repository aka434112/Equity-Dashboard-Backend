const marketInfoSvc = require('../rest/marketInfoSvc.js');
const corporateSvc = require('../rest/corporateSvc.js');
const marketInfo = require('../models/marketInfo.js');
const listDirEqPayload = require('../models/listDirEqPayload.js');
const proxyAgent = require('../constants/proxyAgent.js');

module.exports = {
  fetchMarketInfo: async (symbol) => {
    let marketInfoObj = new marketInfo();
    let marketInfos = await Promise.all([marketInfoSvc.getCompanyInfo(symbol), marketInfoSvc.getCorporateAnnouncement(symbol), marketInfoSvc.getCorporateActions(symbol)]);
    marketInfos = marketInfos.map(info => info.data);
    const companyInfo = marketInfos[0];
    const companyAnnouncements = marketInfos[1];
    const companyActions = marketInfos[2];
    if(companyInfo.includes(process.env.COMPANY_INFO_RUPEE_IMAGE_URI)) {
        marketInfoObj.updateInformation(companyInfo.split(process.env.COMPANY_INFO_RUPEE_IMAGE_URI).join(process.env.NSE_BASE_URL + process.env.COMPANY_INFO_RUPEE_IMAGE_URI));
    } else if(companyInfo.includes(process.env.INFO_NOT_FOUND_URI)) {
        marketInfoObj.updateInformation(companyInfo.split(process.env.INFO_NOT_FOUND_URI).join(process.env.NSE_BASE_URL + process.env.INFO_NOT_FOUND_URI));
    } else {
        marketInfoObj.updateInformation(companyInfo);
    }
    if(companyAnnouncements.includes(process.env.COMPANY_ANNOUNCEMENT_URI)) {
        marketInfoObj.updateAnnouncements(companyAnnouncements.split(process.env.COMPANY_ANNOUNCEMENT_URI).join(process.env.NSE_BASE_URL + process.env.COMPANY_ANNOUNCEMENT_URI));
    } else if(companyAnnouncements.includes(process.env.INFO_NOT_FOUND_URI)) {
        marketInfoObj.updateAnnouncements(companyAnnouncements.split(process.env.INFO_NOT_FOUND_URI).join(process.env.NSE_BASE_URL + process.env.INFO_NOT_FOUND_URI));
    } else {
        marketInfoObj.updateAnnouncements(companyAnnouncements);
    }
    if(companyActions.includes(process.env.INFO_NOT_FOUND_URI)) {
        marketInfoObj.updateAnnouncements(companyActions.split(process.env.INFO_NOT_FOUND_URI).join(process.env.NSE_BASE_URL + process.env.INFO_NOT_FOUND_URI));
    } else {
        marketInfoObj.updateActions(companyActions);
    }
    return marketInfoObj;
  },
  fetchCompanyList: async (query) => {
    let payload = {query: query};
    const COMPANY_VALUES_KEY = 'CompanyValues';
    const COMPANY_LIST_KEY = 'rows1';
    let queryResults = await corporateSvc.getCompanyList(payload);
    queryResults = queryResults.data[COMPANY_LIST_KEY];
    queryResults = queryResults.map(queryResult => queryResult[COMPANY_VALUES_KEY]);
    return queryResults;
  },
  fetchEquity: async (symbol, duration) => {
    const reqPayload = new listDirEqPayload(symbol, duration);
    const queryResults = await corporateSvc.getListDirectEQ(reqPayload);
    return eval("(" + queryResults.data + ")");
  }
}
