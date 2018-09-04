const apiUrl = process.env.apiUrl

export default {
  fetchFeeds: function ({ searchTerm, sortBy, selectedFilters, pageNumToLoad }) {
    var catFilters = this.appliedFilters.getFilters(this.consts.category)
    var categoryIds = catFilters ? catFilters.map(filter => filter.key) : []

    var pubFilters = this.appliedFilters.getFilters(this.consts.publisher)
    var publishers = pubFilters ? pubFilters.map(filter => filter.key) : []

    var params = {
      sort: {
        sortBy: this.sorter.sortBy,
        descOrder: this.sorter.descOrder
      },
      filter: {
        categoryIds,
        publishers
      },
      page,
      srch: this.searchTerm
    }

    return axios.post(apiUrl + '/feed', params)
  },

  fetchFilters: function () {

  },

  getUiFeed(apiFeed) {
  	var uiFeed = apiFeed;
  	uiFeed.publisherUrl = util.getUrl(apiFeed.publisherUrl);
  	uiFeed.url = util.getUrl(apiFeed.url);
  	uiFeed.publishedOnStr = moment(apiFeed.publishedOn).fromNow();
  	return uiFeed;
  }

}
