import axios from 'axios'
import moment from 'moment'

import consts from './../common/js/consts.js'
import util from './../common/js/util.js'
import FilterGroup from './../models/FilterGroup.js'
import Filter from './../models/Filter.js'
const apiUrl = 'http://localhost:8080'

export default {
  fetchFeed: function ({ searchTerm, sorter, selectedFilters, pageNumToLoad, pageSize }) {
    let categoryIds = selectedFilters.filter(selectedFilter => selectedFilter.type === consts.category)
        .map(categoryFilter => categoryFilter.value),
      publishers = selectedFilters.filter(selectedFilter => selectedFilter.type === consts.publisher)
        .map(publisherFilter => publisherFilter.value)

    let params = {
      srch: searchTerm,
      sort: {
        sortBy: sorter.type,
        descOrder: sorter.inDescOrder
      },
      filter: {
        categoryIds,
        publishers
      },
      page: pageNumToLoad,
    }

    return axios.post(apiUrl + '/feed', params)
      .then(result => {
        return {
          countAllFeed: result.data.countAllFeeds,
          feed: result.data.feeds.map(getUiFeed)
        }
      })
      .catch(err => console.log(err))
  },

  fetchFilters: function ({ filterLimit, filterType }) {
    let promises = []
    if (!filterType || filterType === consts.category) {
      promises.push(fetchCategories())
    }
    if (!filterType || filterType === consts.publisher) {
      promises.push(fetchPublishers(filterLimit))
    }

    return Promise.all(promises)
  },
}

function fetchCategories () {
  return axios.get(apiUrl + '/categories')
    .then(result => {
      let categoryFilters = result.data.map(category => new Filter({
            value: category.id,
            label: category.value,
            selected: false
          }))

      return new FilterGroup({
        filterType: consts.category,
        filters: categoryFilters,
        totalCount: categoryFilters.length
      })
    })
    .catch(err => {
      throw err
    })
}

function fetchPublishers (filterLimit) {
  const params = filterLimit ? { params: { limit: filterLimit } } : undefined
  return axios.get(apiUrl + '/publishers', params)
    .then(result => {
      let publisherFilters = result.data.publishers.map(publisher => new Filter({
            value: publisher.publisher,
            label: publisher.publisher,
            selected: false
          }))

      return new FilterGroup({
        filterType: consts.publisher,
        filters: publisherFilters,
        totalCount: result.data.countAllPublishers
      })
    })
    .catch(err => {
      throw err
    })
}

function getUiFeed (apiFeed) {
	let uiFeed = apiFeed
	uiFeed.publisherUrl = util.getUrl(apiFeed.publisherUrl)
	uiFeed.url = util.getUrl(apiFeed.url)
	uiFeed.publishedOnStr = moment(apiFeed.publishedOn).fromNow()
	return uiFeed
}
