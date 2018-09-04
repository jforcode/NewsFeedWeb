import consts from './../common/js/consts.js'
import FilterGroup from './../models/FilterGroup.js'
import Filter from './../models/Filter.js'
const apiUrl = process.env.apiUrl

export default {
  fetchFeeds: function ({ searchTerm, sorter, selectedFilters, pageNumToLoad, pageSize }) {
    let categoryIds = selectedFilters.filter(selectedFilter => selectedFilter.type === consts.category)
        .map(categoryFilter => categoryFilter.value),
      publishers = selectedFilters.filter(selectedFilter => selectedFilter.type === consts.publisher)
        .map(publisherFilter => publisherFilter.value)

    let params = {
      srch: this.searchTerm,
      sort: {
        sortBy: sorter.type,
        descOrder: this.sorter.inDescOrder
      },
      filter: {
        categoryIds,
        publishers
      },
      page,
    }

    return axios.post(apiUrl + '/feed', params)
  },

  fetchFilters: async function ({ filterLimit }) {
    const params = filterLimit ? { params: { limit: filterLimit } } : undefined

    return Promise.all([
        axios.get(apiUrl + '/categories'),
        axios.get(apiUrl + '/publishers', params)
      ])
      .then(values => {
        let categoryFilters = values[0].data.map(category => new Filter({
              value: category.id,
              label: category.value,
              selected: false
            }))

        let publisherFilters = values[1].data.publishers.map(publisher => new Filter({
              value: publisher.publisher,
              label: publisher.publisher,
              selected: false
            }))

        return [
          new FilterGroup({ filterType: consts.category, filters: categoryFilters, totalCount: categoryFilters.length }),
          new FilterGroup({ filterType: consts.publisher, filters: publisherFilters, totalCount: values[1].data.countAllPublishers })
        ]
      })
  },

  getUiFeed: function (apiFeed) {
  	let uiFeed = apiFeed
  	uiFeed.publisherUrl = util.getUrl(apiFeed.publisherUrl)
  	uiFeed.url = util.getUrl(apiFeed.url)
  	uiFeed.publishedOnStr = moment(apiFeed.publishedOn).fromNow()
  	return uiFeed
  },

}
