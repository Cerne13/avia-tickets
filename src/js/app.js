import '../css/style.css';
import locations from './store/locations';
import './plugins';
import formUI from './views/form';
import currencyUI from './views/currency';

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
		const origin = locations.getCityCodeByKey(formUI.originValue);
		const destination = locations.getCityCodeByKey(formUI.destinationValue);
		const depart_date = formUI.departDateValue;
		const return_date = formUI.returnDateValue;
		const currency = currencyUI.currencyValue;

		console.log(origin, destination, depart_date, return_date);

		await locations.fetchTickets({
			origin,
			destination,
			depart_date,
			return_date,
			currency,
		});
	}
});
