import '../css/style.css';
import locations from './store/locations';
import './plugins';

locations.init().then(res => {
	console.log(res);
	console.log(locations);

	const peruArr = locations.getCitiesByCountryCode('PE');
	console.log(peruArr);
});
