import util from './../common/js/util.js'
import feedSrv from './../services/feedService.js'

export default {
  searchBy: '',
  sortBy: null,
  sorters: [],
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

  loadFeed: util.debounce(() => {
    feedSrv.fetchFeed({
        searchTerm: this.searchBy,
        sortBy: this.sortBy,
        selectedFilters: this.selectedFilters,
        pageNumToLoad: this.pageNumToLoad,
        pageSize: this.pageSize
      })
      .then(result => {
        this.flags.connectivityIssue = false
        this.countAllFeeds = result.data.countAllFeeds
  			this.feed = result.data.feeds.map(feedsSrv.getUiFeed)
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

  loadFilters: () => {
    feedSrv.fetchFilters({
        filterLimit
      })
      .then(result => {

      })
      .catch(err => {

      })
  }
}
