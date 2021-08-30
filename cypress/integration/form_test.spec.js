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
	});
});
