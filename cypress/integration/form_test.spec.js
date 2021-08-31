describe('Form', () => {
	it('On the homepage form is visible', () => {
		cy.visit('http://localhost:9000');
		cy.get('[data-hook="mainForm"]').should('be.visible');
	});

	it('When typing a value into origin city autocomplete, the autocomplete is visible and has the typed in value', () => {
		cy.get('[data-hook="autocompleteOrigin"]').as('autocompleteOrigin');

		cy.get('@autocompleteOrigin').should('be.visible');
		cy.get('@autocompleteOrigin').type('Одесса');
		cy.get('@autocompleteOrigin').should('have.value', 'Одесса');
	});

	it('When typing a value into destination city autocomplete, the autocomplete is visible and has the typed in value', () => {
		cy.get('[data-hook="autocompleteDestination"]').as(
			'autocompleteDestination'
		);

		cy.get('@autocompleteDestination').should('be.visible');
		cy.get('@autocompleteDestination').type('Киев');
		cy.get('@autocompleteDestination').should('have.value', 'Киев');
	});

	it('When clicking depart datepicker, the modal opens', () => {
		cy.get('[data-hook="datepickerDepartInput"]').as(
			'datepickerDepartInput'
		);
		cy.get('[data-hook="datepickerDepartWrap"] .datepicker-container').as(
			'modalWindow'
		);

		cy.get('@datepickerDepartInput').click();
		cy.get('@modalWindow').should('be.visible');
	});

	it('After selecting departure date it should be displayed in the input field in correct format', () => {
		cy.get(
			'[data-hook="datepickerDepartWrap"] .datepicker-container .is-today'
		).as('today');
		cy.get(
			'[data-hook="datepickerDepartWrap"] .datepicker-container .btn-flat'
		).as('modalButtons');
		cy.get('[data-hook="datepickerDepartInput"]').as(
			'datepickerDepartInput'
		);

		cy.get('@today').click();
		cy.get('@today').should('have.class', 'is-selected');
		cy.get('@modalButtons').contains('Ok').click();

		cy.get('@datepickerDepartInput').then($input => {
			const val = $input.val();
			expect(val).to.match(/^\d{4}-\d{2}$/);
		});
	});

	it('When clicking return datepicker, the modal opens', () => {
		cy.get('[data-hook="datepickerReturnInput"]').as(
			'datepickerReturnInput'
		);
		cy.get('[data-hook="datepickerReturnWrap"] .datepicker-container').as(
			'modalWindow'
		);

		cy.get('@datepickerReturnInput').click();
		cy.get('@modalWindow').should('be.visible');
	});

	it('After selecting return date it should be displayed in the input field in correct format', () => {
		cy.get(
			'[data-hook="datepickerReturnWrap"] .datepicker-container td[data-day="28"]'
		).as('28');
		cy.get(
			'[data-hook="datepickerReturnWrap"] .datepicker-container .btn-flat'
		).as('modalButtons');
		cy.get('[data-hook="datepickerReturnInput"]').as(
			'datepickerReturnInput'
		);

		cy.get('@28').click();
		cy.get('@28').should('have.class', 'is-selected');
		cy.get('@modalButtons').contains('Ok').click();

		cy.get('@datepickerReturnInput').then($input => {
			const val = $input.val();
			expect(val).to.match(/^\d{4}-\d{2}$/);
		});
	});

	it('When selecting currency from header dropdown it should be cnanged and visible', () => {
		cy.get('[data-hook="currencySelect"] .dropdown-trigger').as(
			'currencyTrigger'
		);
		cy.get('[data-hook="currencySelect"] .dropdown-content li').as(
			'currencyItem'
		);

		cy.get('@currencyTrigger').click();
		cy.get('@currencyItem').contains('Euro').click();
		cy.get('@currencyTrigger').should('have.value', 'Euro');
	});
});
