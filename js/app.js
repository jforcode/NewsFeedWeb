import Vue from 'vue';
import axios from 'axios';

const app = new Vue({
	el: '#feedApp',
	data: {
		consts: {
			publisher: 'publisher',
			publishedOn: 'publishedOn'
		},
		categories: [{
				value: "Business",
				id: "b",
				selected: false
			},
			{
				value: "Technology",
				id: "t",
				selected: false
			}
		],
		publishers: [{
				id: 1,
				value: "Los Angeles Times",
				selected: false
			},
			{
				id: 2,
				value: "Gamespot",
				selected: false
			}
		],
		searchTerm: "",
		appliedFilters: []
	},
	computed: {

	},
	methods: {
		search: function() {
			alert(this.searchTerm);
		},
		sort: function(sortBy, descOrder) {
			alert(sortBy + " " + descOrder);
		},
		onCategorySelected: function (evt) {
			evt.selected 
				? this.addAppliedFilter('Publisher', evt.value) 
				: this.removeAppliedFilter('Publisher', evt.value);
		},
		onPublisherSelected: function (evt) {
			evt.selected 
				? this.addAppliedFilter('Publisher', evt.value) 
				: this.removeAppliedFilter('Publisher', evt.value); 
		},
		addAppliedFilter: function (type, value) {
			this.appliedFilters.push({ type, value });
		},
		removeAppliedFilter: function (type, value) {
			var ind = this.appliedFilters.findIndex(filter => filter.type === type && filter.value === value);
			if (ind !== -1) {
				this.appliedFilters.splice(ind, 1);
			}
		}
	}
});