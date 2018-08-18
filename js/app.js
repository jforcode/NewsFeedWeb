import Vue from 'vue';
import axios from 'axios';
import fltr from './filters.js';
import util from './util.js';

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

		sortBy: 'publishedOn',
		descOrder: true,

		searchTerm: '',
		currPageNum: 1,

		countAllFeeds: 0,
		feeds: [],

		appliedFilters: new fltr.FiltersHolder()
	},

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

		addCategoryFilter: function (category, addOnRemove) {
			var onRemoveHandler = addOnRemove 
				? function () { category.selected = false; }
				: null;
			var filter = new fltr.Filter(this.consts.category, category.id, category.value, null, onRemoveHandler);
			this.appliedFilters.addFilter(filter);
		},

		removeCategoryFilter: function (categoryId) {
			this.appliedFilters.removeFilter(this.consts.category, categoryId);
		},

		addPublisherFilter: function (publ, addOnRemove) {
			var onRemoveHandler = addOnRemove 
				? function () { publ.selected = false; }
				: null;
			var filter = new fltr.Filter(this.consts.publisher, publ.publisher, publ.publisher, null, onRemoveHandler);
			this.appliedFilters.addFilter(filter);
		},

		removePublisherFilter: function (publisher) {
			this.appliedFilters.removeFilter(this.consts.publisher, publisher);
		},

		selectPublishersFromDialog: function() {
			this.allPublishers.forEach(publisher => {
			});

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

		loadFeeds: util.debounce(async function () {
			var result = await this.fetchFeeds()

			this.countAllFeeds = result.data.countAllFeeds;
			this.feeds = result.data.feeds.map(getUiFeed);			
		}, 500),

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
			return this.appliedFilters.getCountFilters() > 0;
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
		publisherUrls: apiPublisher.publisherUrls,
		selected: false
	};
}

function getUiFeed(apiFeed) {
	var uiFeed = apiFeed;
	uiFeed.publishedOnStr = new Date(apiFeed.publishedOn).toString();
	return uiFeed;
}