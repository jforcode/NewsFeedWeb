import Vue from 'vue';
import axios from 'axios';

const app = new Vue({
	el: '#feedApp',
	data: {
		searchTerm: ""
	},
	methods: {
		search: function () {
			alert(this.searchTerm);
		}
	}
});