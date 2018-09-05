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
  countAllFeed: 0,

  flags: {
    loadingFeeds: false,
    loadingFilters: false,
    connectivityIssue: false,
  },

  pageNumToLoad: 0,
}

const methods = {
  selectFilter: function (filterGroup, filter) {
    if (filter.selected) {
      state.selectedFilters.push(new SelectedFilter({
          type: filterGroup.filterType,
          value: filter.value,
          label: filter.label
        }))
    } else {
      this.removeSelectedFilter({
        type: filterGroup.filterType,
        value: filter.value
      })
    }
  },

  removeSelectedFilter: function ({ type, value }) {
    let ind = state.selectedFilters.findIndex(
      selectedFilter => selectedFilter.type === type
        && selectedFilter.value === value
    )
    if (ind === -1) return
    state.selectedFilters.splice(ind, 1)
  },

  findFilter: function ({ type, value }) {
    let filterGroup = state.filterGroups.find(filterGroup => filterGroup.filterType === type)
    if (!filterGroup) return

    let filter = filterGroup.filters.find(filter => filter.value === value)
    if (!filter) return

    return filter
  },

  removeFilter: function ({ type, value }) {
    let filter = this.findFilter({ type, value })
    if (filter) {
      filter.selected = false
    }
  },

  loadAllFilters: async function ({ filterLimit, filterType }) {
    try {
      return await feedSrv.fetchFilters({ filterLimit, filterType })
    } catch (err) {
      console.log('All filters error', err)
    }
  },

  loadPage: function (pageNum) {
    state.pageNumToLoad = pageNum
    this.loadFeed()
  },

  loadFeed: util.debounce(function () {
    state.flags.loadingFeeds = true
    feedSrv.fetchFeed({
        searchTerm: state.searchTerm,
        sorter: state.sorter,
        selectedFilters: state.selectedFilters,
        pageNumToLoad: state.pageNumToLoad,
        pageSize: state.pageSize
      })
      .then(feedData => {
        state.countAllFeed = feedData.countAllFeed
  			state.feed = feedData.feed

        state.flags.loadingFeeds = false
        state.flags.connectivityIssue = false
        state.currPageNum = state.pageNumToLoad
        state.lastPageNum = Math.ceil(state.countAllFeed / state.pageSize)
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
    state.flags.loadingFilters = true
    feedSrv.fetchFilters({
        filterLimit: state.filterLimit
      })
      .then(filterGroups => {
        state.filterGroups = filterGroups
        state.flags.loadFilters = false
      })
      .catch(err => {
        console.log(err)
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
    state.pageSize = 20
    state.pageNumToLoad = 1

    this.loadFilters()
    this.loadFeed()
  }
}

export {
  state,
  methods
}
