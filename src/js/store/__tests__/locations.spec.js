import locationInstance, { Locations } from '../locations';
import { formatDate } from '../../helpers/date';
import api, { Api } from '../../services/apiService';

const countries = [{ code: 'UKR', name: 'Ukraine' }];
const cities = [{ country_code: 'UKR', name: 'Odessa', code: 'OD' }];
const airlines = [{ country_code: 'UKR', name: 'Airline', code: 'ALINE' }];

jest.mock('../../services/apiService', () => {
	const mockApi = {
		countries: jest.fn(() =>
			Promise.resolve([{ code: 'UKR', name: 'Ukraine' }])
		),
		cities: jest.fn(() =>
			Promise.resolve([
				{ country_code: 'UKR', name: 'Odessa', code: 'OD' },
			])
		),
		airlines: jest.fn(() =>
			Promise.resolve([
				{
					country_code: 'UKR',
					name: 'Airline',
					code: 'ALINE',
				},
			])
		),
	};

	return {
		Api: jest.fn(() => mockApi),
	};
});

const apiService = new Api();

describe('Locations store tests', () => {
	beforeEach(() => {
		locationInstance.countries =
			locationInstance.serializeCountries(countries);

		locationInstance.cities = locationInstance.serializeCities(cities);
	});

	it('Check if locationInstance is an instance of Locations class', () => {
		expect(locationInstance).toBeInstanceOf(Locations);
	});

	it('Successfully creating locationInstance', () => {
		const instance = new Locations(api, { formatDate });
		expect(instance.countries).toBe(null);
		expect(instance.shortCitiesList).toEqual({});
		expect(instance.formatDate).toEqual(formatDate);
	});

	it('Check correct countries serialization', () => {
		const res = locationInstance.serializeCountries(countries);
		const expectedData = {
			UKR: { code: 'UKR', name: 'Ukraine' },
		};
		expect(res).toEqual(expectedData);
	});

	it('Check countries with incorrect data', () => {
		const res = locationInstance.serializeCountries(null);
		const expectedData = {};
		expect(res).toEqual(expectedData);
	});

	it('Check correct cities serialization', () => {
		const res = locationInstance.serializeCities(cities);
		const expectedData = {
			OD: {
				country_code: 'UKR',
				name: 'Odessa',
				code: 'OD',
				country_name: 'Ukraine',
				full_name: 'Odessa, Ukraine',
			},
		};
		expect(res).toEqual(expectedData);
	});

	it('Check correct getting a city name by code', () => {
		const res = locationInstance.getCityNameByCode('OD');
		expect(res).toBe('Odessa');
	});

	it('Check correct init method call', () => {
		const instance = new Locations(apiService, { formatDate });
		expect(instance.init()).resolves.toEqual([countries, cities, airlines]);
	});
});
