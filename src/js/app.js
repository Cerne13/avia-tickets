import '../css/style.css';
import locations from './store/locations';
import './plugins';
import formUI from './views/form';

document.addEventListener('DOMContentLoaded', e => {
	const form = formUI.form;

	//Events
	initApp();

	form.addEventListener('submit', e => {
		e.preventDefault();
		onFormSubmit();
	});

	//Handlers
	async function initApp() {
		await locations.init();
		formUI.setAutocompleteData(locations.shortCitiesList);
	}

	async function onFormSubmit() {
		const origin = formUI.originValue;
		const destination = formUI.destinationValue;
		const depart_date = formUI.departDateValue;
		const return_date = formUI.returnDateValue;

		console.log(origin, destination, depart_date, return_date);
	}
});
