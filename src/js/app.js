import locations from './store/locations';

locations.init().then(res => {
	console.log(res);
	console.log(locations);

	const peruArr = locations.getCitiesByCountryCode('PE');
	console.log(peruArr);
});
