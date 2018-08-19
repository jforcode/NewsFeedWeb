import Vue from 'vue';
import axios from 'axios';
import fltr from './filters.js';
import util from './util.js';
import moment from 'moment';

const apiUrl = 'http://localhost:8080';
const filterLimit = 5;

const Sorter = function(sortBy, descOrder, sortLabel) {
	this.sortBy = sortBy;
	this.descOrder = descOrder;
	this.sortLabel = sortLabel;
}

const app = new Vue({
	el: '#feedApp',

	data: {
		consts: {
			publisher: 'Publisher',
			category: 'Category'
		},
		sorters: [
			new Sorter('publishedOn', true, 'Latest Posts First'),
			new Sorter('publishedOn', false, 'Oldest Posts First'),
			new Sorter('publisher', false, 'Publisher (A - Z)'),
			new Sorter('publisher', true, 'Publisher (Z - A)')
		],
		loading: {
			feeds: true,
			categories: true,
			publishers: true
		},
		noNetwork: false,
		
		allPubsDialog: null,
		displaySearchTerm: '',

		categories: [],

		countPublishers: 0,
		publishers: [],
		allPublishers: [],
		numSelectedAllPublishers: 0,

		sorter: null,
		searchTerm: '',

		currPageNum: 0,
		lastPageNum: 0,

		countAllFeeds: 0,
		feedPageSize: 0,
		feeds: [],

		appliedFilters: new fltr.FiltersHolder()
	},

	methods: {
		search: function() {
			this.loadFeeds();
		},

		clearSearchTerm: function () {
			this.searchTerm = '';

			this.loadFeeds();
		},

		sort: function(sorter) {
			this.sorter = sorter;

			this.loadFeeds();
		},

		loadPage: function (pageNum) {
			this.loadFeeds(pageNum);
		},

		onCategorySelected: function(category) {
			category.selected ?
				this.addCategoryFilter(category, true) :
				this.removeCategoryFilter(category.id);
		},

		onPublisherSelected: function(publ) {
			publ.selected ?
				this.addPublisherFilter(publ, true) :
				this.removePublisherFilter(publ.publisher);
		},

		onAllPublisherSelected: function (publ) {
			this.numSelectedAllPublishers += publ.selected ? 1 : -1;
		},

		addCategoryFilter: function(category, addOnRemove) {
			var onRemoveHandler = addOnRemove ?
				function() { category.selected = false; } :
				null;
			var filter = new fltr.Filter(this.consts.category, category.id, category.value, null, onRemoveHandler);
			this.appliedFilters.addFilter(filter);
			this.loadFeeds();
		},

		removeCategoryFilter: function(categoryId) {
			this.appliedFilters.removeFilter(this.consts.category, categoryId);

			this.loadFeeds();
		},

		addPublisherFilter: function(publ, addOnRemove) {
			var onRemoveHandler = addOnRemove ?
				function() { publ.selected = false; } :
				null;
			var filter = new fltr.Filter(this.consts.publisher, publ.publisher, publ.publisher, null, onRemoveHandler);
			this.appliedFilters.addFilter(filter);
			this.loadFeeds();
		},

		removePublisherFilter: function(publisher) {
			this.appliedFilters.removeFilter(this.consts.publisher, publisher);
			this.loadFeeds();
		},

		selectPublishersFromDialog: function() {
			this.allPublishers.forEach(publ => {
				var currPubl = this.appliedFilters.getFilter(this.consts.publisher, publ.publisher);
				var sideBarPubl = this.publishers.find(publSide => publSide.publisher === publ.publisher);
				if (publ.selected) {
					console.log('First', currPubl, sideBarPubl);
					if (!currPubl && sideBarPubl) {
						sideBarPubl.selected = true;
						this.addPublisherFilter(sideBarPubl);
					} else if (!currPubl) {
						this.addPublisherFilter(publ);
					}
					console.log('Second', currPubl, sideBarPubl);

				} else if (currPubl) {
					this.removePublisherFilter(publ.publisher);
				}
			});

			this.loadFeeds();
			allPubsDialog.close();
		},

		closeAllPubsDialog: function() {
			this.numSelectedAllPublishers = 0;
			allPubsDialog.close();
		},

		loadAllPublishers: async function() {
			try {
				var result = await this.fetchPublishers();
			} catch (err) {
				this.noNetwork = true;
				return;
			}

			var totalSelected = 0;
			var i = 1;
			this.countPublishers = result.data.countAllPublishers;
			this.allPublishers = result.data.publishers.map(apiPublisher => {
				var uiPublisher = getUiPublisher(apiPublisher, i);
				var filterExists = this.appliedFilters.getFilter(this.consts.publisher, apiPublisher.publisher);
				uiPublisher.selected = !!filterExists;
				totalSelected += uiPublisher.selected ? 1 : 0;
				i++;
				return uiPublisher;
			});

			this.numSelectedAllPublishers = totalSelected;
			allPubsDialog.showModal();
		},

		loadCategories: async function() {
			this.loading.categories = true;
			try {
				var result = await this.fetchCategories();
			} catch (err) {
				this.noNetwork = true;
				return;
			}
			
			this.categories = result.data.map(getUiCategory);
			this.loading.categories = false;
		},

		loadPublishers: async function() {
			this.loading.publishers = true;
			try {
				var result = await this.fetchPublishers(filterLimit);
			} catch (err) {
				this.noNetwork = true;
				return;
			}

			var i = 1;
			this.countPublishers = result.data.countAllPublishers;
			this.publishers = result.data.publishers.map(apiPublisher => getUiPublisher(apiPublisher, i++));
			this.loading.publishers = false;
		},

		loadFeeds: util.debounce(async function(pageNum) {
			this.loading.feeds = true;
			if (!pageNum) {
				pageNum = this.currPageNum;
			}
			
			try {
				var result = await this.fetchFeeds(pageNum)
			} catch (err) {
				this.noNetwork = true;
				return;
			}

			this.noNetwork = false;
			this.countAllFeeds = result.data.countAllFeeds;
			this.feedPageSize = result.data.pageSize;
			this.feeds = result.data.feeds.map(getUiFeed);

			this.currPageNum = pageNum;
			this.lastPageNum = Math.ceil(this.countAllFeeds / this.feedPageSize);

			this.displaySearchTerm = this.searchTerm;
			this.loading.feeds = false;
		}, 500),

		fetchCategories: function() {
			try {
				return axios.get(apiUrl + '/categories');
			} catch (err) {
				throw err;
			}
		},

		fetchPublishers: function(limit) {
			try {
				return limit > 0 ?
					axios.get(apiUrl + '/publishers', { params: { limit } }) :
					axios.get(apiUrl + '/publishers');
			} catch (err) {
				throw err;
			}
		},

		fetchFeeds: function(page) {
			var catFilters = this.appliedFilters.getFilters(this.consts.category);
			var categoryIds = catFilters ? catFilters.map(filter => filter.key) : [];

			var pubFilters = this.appliedFilters.getFilters(this.consts.publisher);
			var publishers = pubFilters ? pubFilters.map(filter => filter.key) : [];

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
			};

			try {
				return axios.post(apiUrl + '/feed', params);
			} catch (err) {
				throw err;
			}
		},
		loadInitialData: function () {
			this.loadCategories();
			this.loadPublishers();
			this.loadFeeds(1);
		}
	},

	computed: {
		isAnyFilterApplied: function() {
			return this.appliedFilters.getCountFilters() > 0;
		},
		resultsDisplay: function() {
			return this.feeds.length > 0 
				? "Showing " + this.feeds.length + " posts"
				: this.loading.feeds
					? "Loading..."
					: "No posts found! Try some other filters!";
		},
		noFeeds: function() {
			return !this.loading.feeds && this.feeds.length === 0;
		},
		paginationVisible: function () {
			return !this.loading.feeds && this.feeds.length > 0;
		},
		firstVisible: function() {
			return !this.loading.feeds && this.currPageNum > 1;
		},
		lastVisible: function () {
			return !this.loading.feeds && this.currPageNum < this.lastPageNum;
		}
	},

	created: function() {		
		this.allPubsDialog = document.querySelector('#allPubsDialog');
		this.sorter = this.sorters[2];

		this.loadInitialData();
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
		publisherUrls: apiPublisher.publisherUrls,
		selected: false
	};
}

function getUiFeed(apiFeed) {
	var uiFeed = apiFeed;
	uiFeed.publisherUrl = util.getUrl(apiFeed.publisherUrl);
	uiFeed.url = util.getUrl(apiFeed.url);
	uiFeed.publishedOnStr = moment(apiFeed.publishedOn).fromNow();
	return uiFeed;
}