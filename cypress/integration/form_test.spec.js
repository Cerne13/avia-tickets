describe('Form', () => {
	it('On the homepage form is visible', () => {
		cy.visit('http://localhost:9000');
		cy.get('[data-hook="mainForm"]').should('be.visible');
	});
});
