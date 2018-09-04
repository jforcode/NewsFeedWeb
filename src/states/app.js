import util from './../common/js/util.js'
import feedSrv from './../services/feedService.js'
import consts from './../common/js/consts.js'
import Sorter from './../models/Sorter.js'
import SelectedFilter from './../models/SelectedFilter.js'

const logger = console

const state = {
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
}

const methods = {
  selectFilter: function (filterGroup, filter) {
    console.log(filterGroup, filter)
    if (filter.selected) {
      state.selectedFilters.push(new SelectedFilter({
          type: filterGroup.filterType,
          value: filter.value,
          label: filter.label
        }))
    } else {
      let ind = state.selectedFilters.findIndex(
        selectedFilter => selectedFilter.type === filterGroup.filterType
          && selectedFilter.value === filter.value
      )
      if (ind !== -1) {
        state.selectedFilters.splice(ind, 1)
      }
    }
  },

  loadFeed: util.debounce(function () {
    feedSrv.fetchFeed({
        searchTerm: state.searchTerm,
        sorter: state.sorter,
        selectedFilters: state.selectedFilters,
        pageNumToLoad: state.pageNumToLoad,
        pageSize: state.pageSize
      })
      .then(feedData => {
        state.flags.connectivityIssue = false
        state.countAllFeeds = feedData.countAllFeed
  			state.feed = feedData.feed
      })
      .catch(err => {
        switch (err.type) {
          case consts.errTypes.UNAVAILABLE_CONNECTION:
            state.flags.connectivityIssue = true
            break;

          default:
            logger.error(err.type + ": " + err.message)
        }
      })
  }, 500),

  loadFilters: function () {
    feedSrv.fetchFilters({
        filterLimit: state.filterLimit
      })
      .then(filterGroups => {
        state.filterGroups = filterGroups
      })
      .catch(err => {

      })
  },

  initSelf: function () {
    state.sorters = [
      new Sorter({ type: 'publishedOn', inDescOrder: true, displayLabel: 'Latest Posts First' }),
      new Sorter({ type: 'publishedOn', inDescOrder: false, displayLabel: 'Oldest Posts First' }),
      new Sorter({ type: 'publisher', inDescOrder: false, displayLabel: 'Publisher (A - Z)' }),
      new Sorter({ type: 'publisher', inDescOrder: true, displayLabel: 'Publisher (Z - A)' }),
    ]
    state.sorter = state.sorters[0]

    state.filterLimit = 5

    this.loadFilters()
    this.loadFeed()
  }
}

export {
  state,
  methods
}
