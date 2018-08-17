import Vue from 'vue';
import axios from 'axios';

const apiUrl = 'http://localhost:8080';
const filterLimit = 5;

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

	// TODO: loading of feeds should be throttled
	methods: {
		search: function() {
			this.loadFeeds();
		},

		sort: function(sortBy, descOrder) {
			this.sortBy = sortBy;
			this.descOrder = descOrder;

			this.loadFeeds();
		},

		onCategorySelected: function(category) {
			category.selected ?
				this.addCategoryFilter(category.value) :
				this.removeCategoryFilter(category.value);

			this.loadFeeds();
		},

		onPublisherSelected: function(publisher) {
			publisher.selected ?
				this.addPublisherFilter(publisher.displayStr) :
				this.removePublisherFilter(publisher.displayStr);

			this.loadFeeds();
		},

		addCategoryFilter: function (value) {
			this.appliedFilters.categories.push(value);			
		},

		addPublisherFilter: function (value) {
			this.appliedFilters.publishers.push(value);
			this.mapSelectedPubs[value] = true;
		},

		removeCategoryFilter: function (value) {
			var ind = this.appliedFilters.categories.findIndex(category => category === value);
			if (ind !== -1) {
				this.appliedFilters.categories.splice(ind, 1);
			}
		},

		removePublisherFilter: function (value) {
			var ind = this.appliedFilters.publishers.findIndex(publisher => publisher === value);
			if (ind !== -1) {
				this.appliedFilters.publishers.splice(ind, 1);
				delete this.mapSelectedPubs[value];
			}
		},

		selectPublishersFromDialog: function() {
			this.allPublishers.forEach(publisher => {
				var uiPubDisplayStr = publisher.displayStr;
				if (publisher.selected) {
					if (!this.mapSelectedPubs[uiPubDisplayStr]) {
						this.addPublisherFilter(uiPubDisplayStr);
					}
					var mainUiPub = this.publishers.find(uiPublisher => uiPublisher.displayStr === uiPubDisplayStr);
					if (mainUiPub) {
						mainUiPub.selected = true;
					}
				}
			});

			this.loadFeeds();
			allPubsDialog.close();
		},

		closeAllPubsDialog: function() {
			allPubsDialog.close();
		},

		loadAllPublishers: async function() {
			var result = await this.fetchPublishers();

			var i = 1;
			this.countPublishers = result.data.countAllPublishers;
			this.allPublishers = result.data.publishers.map(apiPublisher => {
				var uiPublisher = getUiPublisher(apiPublisher, i++);
				uiPublisher.selected = this.mapSelectedPubs[uiPublisher.displayStr];
				return uiPublisher;
			});

			allPubsDialog.showModal();
		},

		loadCategories: async function () {
			var result = await this.fetchCategories();

			this.categories = result.data.map(getUiCategory);	
		},

		loadPublishers: async function () {
			var result = await this.fetchPublishers(filterLimit);

			var i = 1;
			this.countPublishers = result.data.countAllPublishers;
			this.publishers = result.data.publishers.map(apiPublisher => getUiPublisher(apiPublisher, i++));
		},

		loadFeeds: async function () {
			var result = await this.fetchFeeds()

			this.countAllFeeds = result.data.countAllFeeds;
			this.feeds = result.data.feeds.map(getUiFeed);			
		},

		fetchCategories: function() {
			return axios.get(apiUrl + '/categories');
		},

		fetchPublishers: function(limit) {
			return limit > 0
				? axios.get(apiUrl + '/publishers', { params: { limit } })
				: axios.get(apiUrl + '/publishers');
		},

		fetchFeeds: function() {
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

		this.loadCategories();
		this.loadPublishers();
		this.loadFeeds();
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