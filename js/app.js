import Vue from 'vue';
import axios from 'axios';

const apiUrl = 'http://localhost:8080';
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

const app = new Vue({
	el: '#feedApp',

	data: {
		consts: {
			publisher: 'Publisher',
			category: 'Category'
		},

		allPubsDialog: null,

		categories: [],

		countPublishers: 0,
		publishers: [],
		allPublishers: [],
		mapSelectedPubs: {},

		sortBy: 'publishedOn',
		descOrder: true,

		searchTerm: '',
		appliedFilters: {
			categories: [],
			publishers: []
		},
		currPageNum: 1,

		countAllFeeds: 0,
		feeds: []
	},

	methods: {
		search: function() {
			this.fetchFeed();
		},

		sort: function(sortBy, descOrder) {
			this.sortBy = sortBy;
			this.descOrder = descOrder;

			this.fetchFeed();
		},

		onCategorySelected: function(category) {
			category.selected ?
				this.addAppliedFilter(this.consts.category, category.value) :
				this.removeAppliedFilter(this.consts.category, category.value);
		},

		onPublisherSelected: function(publisher) {
			publisher.selected ?
				this.addAppliedFilter(this.consts.publisher, publisher.displayStr) :
				this.removeAppliedFilter(this.consts.publisher, publisher.displayStr);
		},

		addAppliedFilter: function(type, value) {
			if (type === this.consts.publisher) {
				this.appliedFilters.publishers.push(value);
				this.mapSelectedPubs[value] = true;

			} else if (type === this.consts.category) {
				this.appliedFilters.categories.push(value);
			}
		},

		removeAppliedFilter: function(type, value) {
			if (type === this.consts.publisher) {
				var ind = this.appliedFilters.publishers.findIndex(publisher => publisher === value);
				if (ind !== -1) {
					this.appliedFilters.publishers.splice(ind, 1);
					delete this.mapSelectedPubs[value];
				}

			} else if (type === this.consts.category) {
				var ind = this.appliedFilters.categories.findIndex(category => category === value);
				if (ind !== -1) {
					this.appliedFilters.categories.splice(ind, 1);
				}
			}
		},

		loadAllPublishers: function() {
			this.fetchPublishers()
				.then(result => {
					var i = 1;
					this.countPublishers = result.data.countAllPublishers;
					this.allPublishers = result.data.publishers.map(apiPublisher => {
						var uiPublisher = getUiPublisher(apiPublisher, i++);
						uiPublisher.selected = this.mapSelectedPubs[uiPublisher.displayStr];
						return uiPublisher;
					});

					allPubsDialog.showModal();

				})
				.catch(err => console.log(err));
		},

		selectPublishersFromDialog: function() {
			this.allPublishers.forEach(publisher => {
				var uiPubDisplayStr = publisher.displayStr;
				if (publisher.selected) {
					if (!this.mapSelectedPubs[uiPubDisplayStr]) {
						this.addAppliedFilter(this.consts.publisher, uiPubDisplayStr);
					}
					var mainUiPub = this.publishers.find(uiPublisher => uiPublisher.displayStr === uiPubDisplayStr);
					if (mainUiPub) {
						mainUiPub.selected = true;
					}
				}
			});

			allPubsDialog.close();
		},

		closeAllPubsDialog: function() {
			allPubsDialog.close();
		},

		fetchCategories: function() {
			return axios.get(apiUrl + '/categories');
		},

		fetchPublishers: function(limit) {
			return limit > 0
				? axios.get(apiUrl + '/publishers', { params: { limit } })
				: axios.get(apiUrl + '/publishers');
		},

		fetchFeed: function() {
			var params = {
				sort: {
					sortBy: this.sortBy,
					descOrder: this.descOrder
				},
				filter: {
					categoryIds: this.appliedFilters.categories,
					publishers: this.appliedFilters.publishers
				},
				page: this.currPageNum,
				srch: this.searchTerm
			};
			console.log(params);
			return axios.post(apiUrl + '/feed', params);
		}
	},

	computed: {
		isAnyFilterApplied: function () {
			return this.appliedFilters.categories.length !== 0 
				|| this.appliedFilters.publishers.length !== 0;
		}
	},

	created: function() {
		this.allPubsDialog = document.querySelector('#allPubsDialog');

		this.fetchCategories()
			.then(result => {
				this.categories = result.data.map(getUiCategory);
			});

		this.fetchPublishers(5)
			.then(result => {
				var i = 1;
				this.countPublishers = result.data.countAllPublishers;
				this.publishers = result.data.publishers.map(apiPublisher => getUiPublisher(apiPublisher, i++));
			});

		this.fetchFeed()
			.then(result => {
				this.countAllFeeds = result.data.countAllFeeds;
				this.feeds = result.data.feeds.map(getUiFeed);
			});
	}
});


function getUiCategory(apiCategory) {
	return {
		value: apiCategory.value,
		id: apiCategory.id,
		selected: false
	};
}

function getUiPublisher(apiPublisher, id) {
	return {
		id,
		publisher: apiPublisher.publisher,
		publisherUrl: apiPublisher.publisherUrl,
		selected: false,
		displayStr: apiPublisher.publisher + ' (' + apiPublisher.publisherUrl + ')'
	};
}

function getUiFeed(apiFeed) {
	var uiFeed = apiFeed;
	uiFeed.publishedOnStr = new Date(apiFeed.publishedOn).toString();
	return uiFeed;
}