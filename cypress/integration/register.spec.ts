describe('Navigation to Register', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');

        cy.get('a[href*="register"]').click()
    });

    /** Register user using Mock data soon */
})