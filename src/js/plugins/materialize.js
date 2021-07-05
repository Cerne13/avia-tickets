import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

// Navbar select init
const select = document.querySelectorAll('select');
M.FormSelect.init(select);

export function getSelectInstance(elem) {
	return M.FormSelect.getInstance(elem);
}

// Autocomplete init
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete, {
	data: {
		Apple: null,
		Microsoft: null,
		Google: 'https://placehold.it/250x250',
	},
});

export function getAutocompleteInstance(elem) {
	return M.Autocomplete.getInstance(elem);
}

// Datepickers init
const datepickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepickers, {
	showClearBtn: true,
});

export function getDatepickerInstance(elem) {
	return M.Datepicker.getInstance(elem);
}
