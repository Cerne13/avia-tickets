import locationInstance, { Locations } from '../locations';
import { formatDate } from '../../helpers/date';
import api, { Api } from '../../services/apiService';

const countries = [{ code: 'UKR', name: 'Ukraine' }];

describe('Locations store tests', () => {
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
});
