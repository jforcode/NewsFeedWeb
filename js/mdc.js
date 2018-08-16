import {MDCTopAppBar} from '@material/top-app-bar/index';
import {MDCTextField} from '@material/textfield';
import {MDCDialog} from '@material/dialog';

const topAppBarEle = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarEle);
const textField = new MDCTextField(document.querySelector('.mdc-text-field'));

const sortDialog = new MDCDialog(document.querySelector('#sortDialog'));
const filterDialog = new MDCDialog(document.querySelector('#filterDialog'));

	sortDialog.listen('MDCDialog:accept', () => {
		console.log('accepted');
	})

	sortDialog.listen('MDCDialog:cancel', () => {
		console.log('cancelled');
	})


	filterDialog.listen('MDCDialog:accept', () => {
		console.log('accepted');
	})

	filterDialog.listen('MDCDialog:cancel', () => {
		console.log('cancelled');
	})

module.exports = {
	sortDialog,
	filterDialog
}