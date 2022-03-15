describe('Navigation to Register and Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });

  it('should navigate to register page', () => {
    // Start from the index page
    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="register"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/register')

    // The new page should contain an h1 with "About page"
    cy.get('h2').contains('Register');
  })

  it('should navigate to login page', () => {
    // Start from the index page
    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="login"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/login')

    // The new page should contain an h1 with "About page"
    cy.get('h2').contains('Login');
  })

  /* Test invalid cases for Register */
  it('Test register page empty fields and existing user', () => {
    cy.get('a[href*="register"]').click()
    // Start from the index page
    // Find a link with an href attribute containing "about" and click it
    cy.get('button[name=submit]')
      .contains("Register")
      .click()

    // The new url should include "/about"
    cy.url().should('include', '/register')

    // The new page should contain an h1 with "About page"
    cy.get('p').contains('All fields must be completed!');

    cy.get("input[name=username]").type("martin2")

    cy.get('button[name=submit]')
      .contains("Register")
      .click()

    cy.get('p').contains('All fields must be completed!');

    cy.get("input[name=username]").clear()
    cy.get("input[name=password]").type("123456")

    cy.get('button[name=submit]')
      .contains("Register")
      .click()

      cy.get('p').contains('All fields must be completed!');
  })

    /* Test invalid cases for Login */
    it('Test Login page empty fields', () => {
      cy.get('a[href*="login"]').click()
      // Start from the index page
      // Find a link with an href attribute containing "about" and click it
      cy.get('button[name=submit]')
        .contains("Login")
        .click()
  
      // The new url should include "/about"
      cy.url().should('include', '/login')
  
      // The new page should contain an h1 with "About page"
      cy.get('p').contains('All fields must be completed!');
  
      cy.get("input[name=username]").type("martin2")
  
      cy.get('button[name=submit]')
        .contains("Login")
        .click()
  
      cy.get('p').contains('All fields must be completed!');
  
      cy.get("input[name=username]").clear()
      cy.get("input[name=password]").type("123456")
  
      cy.get('button[name=submit]')
        .contains("Login")
        .click()
  
      cy.get('p').contains('All fields must be completed!');
    })
})