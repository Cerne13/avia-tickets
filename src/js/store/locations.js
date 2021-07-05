import api from '../services/apiService';

class Locations {
	constructor(api) {
		this.api = api;
		this.countries = null;
		this.cities = null;
		this.shortCitiesList = null;
	}
	async init() {
		const response = await Promise.all([
			this.api.countries(),
			this.api.cities(),
		]);
		const [countries, cities] = response;
		this.countries = this.serializeCountries(countries);
		this.cities = this.serializeCities(cities);
		this.shortCitiesList = this.createShortCitiesList(this.cities);

		return response;
	}

	createShortCitiesList(cities) {
		return Object.entries(cities).reduce((acc, [key]) => {
			acc[key] = null;
			return acc;
		}, {});
	}

	serializeCountries(countries) {
		return countries.reduce((acc, country) => {
			acc[country.code] = country;
			return acc;
		}, {});
	}

	serializeCities(cities) {
		return cities.reduce((acc, city) => {
			const countryName = this.getCountryNameByCode(city.country_code);
			const cityName = city.name || city.name_translations.en;
			const key = `${cityName},${countryName}`;
			acc[key] = city;
			return acc;
		}, {});
	}

	getCountryNameByCode(code) {
		return this.countries[code].name;
	}

	getCitiesByCountryCode(code) {
		return this.cities.filter(city => city.country_code === code);
	}
}
const locations = new Locations(api);

export default locations;
