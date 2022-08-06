describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testuser',
      name: 'Test McTestFace',
      password: 'correctpassword'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('input.login-username')
    cy.get('input.login-password')
  })
  it('Login fails successfully', function() {
    cy.get('input.login-username')
      .type('testuser')
    cy.get('input.login-password')
      .type('incorrectpassword')
    cy.contains('login').click()
    cy.get('div.error').should('contain', 'wrong username or password')
  })
  it('Login succeeds with correct credentials', function() {
    cy.get('input.login-username')
      .type('testuser')
    cy.get('input.login-password')
      .type('correctpassword')
    cy.contains('login').click()
    cy.get('div.info').should('contain', 'Welcome, Test McTestFace')
  })
})