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
  describe('Login', function() {
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
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input.login-username')
        .type('testuser')
      cy.get('input.login-password')
        .type('correctpassword')
      cy.contains('login').click()
    })
    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input.blogform-title')
        .type('Testing is easy: 10 quick tips')
      cy.get('input.blogform-author')
        .type('Cypress')
      cy.get('input.blogform-url')
        .type('localhost')
      cy.contains('create').click()
      cy.get('div.info').should('contain', 'a new blog Testing is easy: 10 quick tips by Cypress added')
      cy.get('div.blogcontainer').should('contain', 'Testing is easy: 10 quick tips Cypress')
    })
  })
  describe('After creating a blog', function() {
    beforeEach(function() {
      cy.get('input.login-username')
        .type('testuser')
      cy.get('input.login-password')
        .type('correctpassword')
      cy.contains('login').click()
      cy.contains('new blog').click()
      cy.get('input.blogform-title')
        .type('Testing is easy: 10 quick tips')
      cy.get('input.blogform-author')
        .type('Cypress')
      cy.get('input.blogform-url')
        .type('localhost')
      cy.contains('create').click()
    })
    it('A blog can be liked', function() {
      cy.contains('Testing is easy: 10 quick tips Cypress').click()
      cy.contains('like').click()
      cy.get('div.blogcontainer').should('contain', 'likes 1')
    })
    it('A blog can be deleted', function() {
      cy.contains('Testing is easy: 10 quick tips Cypress').click()
      cy.contains('remove').click()
      cy.get('div.info').should('contain', 'Blog deleted.')
    })
  })
})