describe('Creating Board', () => {  
  before(() => {
    cy.setToken();
    cy.visit('https://trello.com/jsmithtester100/boards');
  });

  it('should create new board', () => {
    cy.createBoard();
    cy.makeBoardPublic();
    cy.deleteBoard();
  });
});