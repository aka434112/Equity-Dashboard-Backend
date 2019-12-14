function marketInfo() {
  this.announcements = ""
  this.information = ""
  this.actions = ""
}

marketInfo.prototype.updateAnnouncements = function (announcements) {
  this.announcements = announcements
}

marketInfo.prototype.updateInformation = function (information) {
  this.information = information
}

marketInfo.prototype.updateActions = function (actions) {
  this.actions = actions
}

module.exports = marketInfo
