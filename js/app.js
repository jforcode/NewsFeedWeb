import Vue from 'vue';
import axios from 'axios';

const apiUrl = 'http://localhost:8080';

const app = new Vue({
	el: '#feedApp',

	data: {
		allPubsDialog: null,

		categories: [],

		countPublishers: 0,
		publishers: [],
		allPublishers: [],
		mapSelectedPubs: {},

		searchTerm: '',
		appliedFilters: [],

		countFeed: 0,
		feed: []
	},

	methods: {
		search: function() {
			alert(this.searchTerm);
		},

		sort: function(sortBy, descOrder) {
			alert(sortBy + ' ' + descOrder);
		},

		onCategorySelected: function(category) {
			category.selected ?
				this.addAppliedFilter('Category', category.value) :
				this.removeAppliedFilter('Category', category.value);
		},

		onPublisherSelected: function(publisher) {
			publisher.selected ?
				this.addAppliedFilter('Publisher', this.getPublisherUiStr(publisher)) :
				this.removeAppliedFilter('Publisher', this.getPublisherUiStr(publisher));
		},

		addAppliedFilter: function(type, value) {
			this.appliedFilters.push({ type, value });
			if (type === 'Publisher') {
				this.mapSelectedPubs[value] = true;
			}
		},

		removeAppliedFilter: function(type, value) {
			var ind = this.appliedFilters.findIndex(filter => filter.type === type && filter.value === value);
			if (ind !== -1) {
				this.appliedFilters.splice(ind, 1);
				if (type === 'Publisher') {
					delete this.mapSelectedPubs[value];
				}
			}
		},

		getPublisherUiStr: function({ publisher, publisherUrl }) {
			return publisher + ' (' + publisherUrl + ')';
		},

		loadAllPublishers: function() {
			axios
				.get(apiUrl + '/publishers')
				.then(result => {
					var i = 1;
					this.countPublishers = result.data.countAllPublishers;
					this.allPublishers = result.data.publishers.map(apiPublisher => {
						var uiPublisher = getUiPublisher(apiPublisher, i++);
						var uiPubDisplayStr = this.getPublisherUiStr(uiPublisher);
						uiPublisher.selected = this.mapSelectedPubs[uiPubDisplayStr];
						return uiPublisher;
					});

					allPubsDialog.showModal();

				})
				.catch(err => console.log(err));
		},

		selectPublishersFromDialog: function() {
			this.allPublishers.forEach(publisher => {
				var uiPubDisplayStr = this.getPublisherUiStr(publisher);
				if (publisher.selected) {
					if (!this.mapSelectedPubs[uiPubDisplayStr]) {
						this.addAppliedFilter('Publisher', uiPubDisplayStr);
					}
					var mainUiPub = this.publishers.find(uiPublisher => this.getPublisherUiStr(uiPublisher) === uiPubDisplayStr);
					if (mainUiPub) {
						mainUiPub.selected = true;
					}
				}
			});

			allPubsDialog.close();
		},

		closeAllPubsDialog: function() {
			allPubsDialog.close();
		}
	},

	created: function() {
		this.allPubsDialog = document.querySelector('#allPubsDialog');

		axios
			.get(apiUrl + '/categories')
			.then(result => {
				this.categories = result.data.map(getUiCategory);
			});

		axios
			.get(apiUrl + '/publishers', { params: { limit: 5 } })
			.then(result => {
				var i = 1;
				this.countPublishers = result.data.countAllPublishers;
				this.publishers = result.data.publishers.map(apiPublisher => getUiPublisher(apiPublisher, i++));
			});
	}
});

function getUiCategory(apiCategory) {
	return {
		value: apiCategory.value,
		id: apiCategory.id,
		selected: true
	};
}

function getUiPublisher(apiPublisher, id) {
	return {
		id,
		publisher: apiPublisher.publisher,
		publisherUrl: apiPublisher.publisherUrl,
		selected: false
	};
}