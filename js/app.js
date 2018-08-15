import mdc from './mdc.js';
import Vue from 'vue';
import axios from 'axios';

const app = new Vue({
	el: '#feedApp',
	data: {
		searchTerm: '',
		searchBarVisible: false,
		feeds: []	
	},
	methods: {
		showSortDialog: function (evt) {
			mdc.sortDialog.lastFocusedTarget = evt.target;
			mdc.sortDialog.show();
		},
		showFilterDialog: function (evt) {
			mdc.filterDialog.lastFocusedTarget = evt.target;
			mdc.filterDialog.show();
		},
		search: function () {
			alert(this.searchTerm);
		}
	},
	created: function () {
		axios
			.get('http://127.0.0.1:8080/feed')
			.then(response => {
				this.feeds = response.data;
			})
			.catch(error => {
				console.log(error);
			});
	}
});