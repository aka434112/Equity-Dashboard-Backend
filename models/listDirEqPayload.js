function listDirEqPayload (symbol, period) {
  this.Symbol = symbol
  this.Industry = ''
  this.Period = period
  this.symbol = symbol
  this.listingPeriod = period
  this.segment = 'EQUITIES'
}

module.exports = listDirEqPayload
