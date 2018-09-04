import util from './../common/js/util.js'
import feedSrv from './../services/feedService.js'
import consts from './../common/js/consts.js'
const logger = console

export default {
  sorters: [],
  filterLimit: 0,

  searchTerm: '',
  sorter: null,
  filterGroups: [],

  selectedFilters: [],

  pageSize: 0,
  currPageNum: 0,
  lastPageNum: 0,

  feed: [],
  countAllFeeds: 0,

  flags: {
    loadingFeeds: false,
    loadingFilters: false,
    connectivityIssue: false,
  },

  pageNumToLoad: 0,

  loadFeed: util.debounce(function () {
    feedSrv.fetchFeed({
        searchTerm: this.searchTerm,
        sorter: this.sorter,
        selectedFilters: this.selectedFilters,
        pageNumToLoad: this.pageNumToLoad,
        pageSize: this.pageSize
      })
      .then(feedData => {
        this.flags.connectivityIssue = false
        this.countAllFeeds = feedData.countAllFeed
  			this.feed = feedData.feed
      })
      .catch(err => {
        switch (err.type) {
          case consts.errTypes.UNAVAILABLE_CONNECTION:
            this.flags.connectivityIssue = true
            break;

          default:
            logger.error(err.type + ": " + err.message)
        }
      })
  }, 500),

  loadFilters: function () {
    feedSrv.fetchFilters({
        filterLimit: this.filterLimit
      })
      .then(filterGroups => {
        this.filterGroups = filterGroups
      })
      .catch(err => {

      })
  }
}
