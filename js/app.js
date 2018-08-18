import Vue from 'vue';
import axios from 'axios';
import fltr from './filters.js';
import util from './util.js';

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
			new Sorter('publishedOn', true, 'Latest Posts'),
			new Sorter('publishedOn', false, 'Oldest Posts'),
			new Sorter('publisher', false, 'Publisher (A - Z)'),
			new Sorter('publisher', false, 'Publisher (Z - A)')
		],
		loading: {
			feeds: true,
			categories: true,
			publishers: true
		},

		allPubsDialog: null,
		displaySearchTerm: '',

		categories: [],

		countPublishers: 0,
		publishers: [],
		allPublishers: [],

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

			this.loadFeeds();
		},

		onPublisherSelected: function(publ) {
			publ.selected ?
				this.addPublisherFilter(publ, true) :
				this.removePublisherFilter(publ.publisher);

			this.loadFeeds();
		},

		addCategoryFilter: function(category, addOnRemove) {
			var onRemoveHandler = addOnRemove ?
				function() { category.selected = false; } :
				null;
			var filter = new fltr.Filter(this.consts.category, category.id, category.value, null, onRemoveHandler);
			this.appliedFilters.addFilter(filter);
		},

		removeCategoryFilter: function(categoryId) {
			this.appliedFilters.removeFilter(this.consts.category, categoryId);
		},

		addPublisherFilter: function(publ, addOnRemove) {
			var onRemoveHandler = addOnRemove ?
				function() { publ.selected = false; } :
				null;
			var filter = new fltr.Filter(this.consts.publisher, publ.publisher, publ.publisher, null, onRemoveHandler);
			this.appliedFilters.addFilter(filter);
		},

		removePublisherFilter: function(publisher) {
			this.appliedFilters.removeFilter(this.consts.publisher, publisher);
		},

		selectPublishersFromDialog: function() {
			this.allPublishers.forEach(publisher => {});

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
				return uiPublisher;
			});

			allPubsDialog.showModal();
		},

		loadCategories: async function() {
			this.loading.categories = true;
			var result = await this.fetchCategories();

			this.categories = result.data.map(getUiCategory);
			this.loading.categories = false;
		},

		loadPublishers: async function() {
			this.loading.publishers = true;
			var result = await this.fetchPublishers(filterLimit);

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
			var result = await this.fetchFeeds(pageNum)

			this.countAllFeeds = result.data.countAllFeeds;
			this.feedPageSize = result.data.pageSize;
			this.feeds = result.data.feeds.map(getUiFeed);

			this.currPageNum = pageNum;
			this.lastPageNum = this.countAllFeeds / this.feedPageSize;

			this.displaySearchTerm = this.searchTerm;
			this.loading.feeds = false;
		}, 500),

		fetchCategories: function() {
			return axios.get(apiUrl + '/categories');
		},

		fetchPublishers: function(limit) {
			return limit > 0 ?
				axios.get(apiUrl + '/publishers', { params: { limit } }) :
				axios.get(apiUrl + '/publishers');
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

			return axios.post(apiUrl + '/feed', params);
		}
	},

	computed: {
		isAnyFilterApplied: function() {
			return this.appliedFilters.getCountFilters() > 0;
		},
		resultsDisplay: function() {
			return this.feeds.length > 0 ?
				"Showing " + this.currPageNum + util.getNumberSuffix(this.currPageNum) + " of " + this.lastPageNum + " pages" :
				this.loading.feeds ?
				"Loading..." :
				"No posts found! Try some other filters!";
		},
		noFeeds: function() {
			return !this.loading.feeds && this.feeds.length === 0;
		},
		pageLabelVisible: function () {
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
		this.sorter = this.sorters[0];

		this.loadCategories();
		this.loadPublishers();
		this.loadFeeds(1);
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
	uiFeed.publishedOnStr = new Date(apiFeed.publishedOn).toString();
	return uiFeed;
}