describe('Creating List', () => {
    
    before(() => {
      cy.setToken();
      cy.visit('https://trello.com/jsmithtester100/boards');
      cy.createBoard();
    });

    it('should create new list', () => {  
      cy.createNewList();
      cy.dragDropCreatedList();
      cy.deleteList();
    });

    after(() => {
      cy.deleteBoard();
    });
  });