describe('Navigation to Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');

        cy.get('a[href*="register"]').click()
    });

    /** We will test login with mocked user data after registration */
})