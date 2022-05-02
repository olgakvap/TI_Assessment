require('@4tw/cypress-drag-drop')
const data = require('../fixtures/data.json');

const btnCreate = 'button[aria-label="Create board or Workspace"]';
const btnCreateBoard = 'button[data-test-id="header-create-board-button"]';
const inputTitleBoard = 'input[data-test-id="create-board-title-input"]';
const btnSubmit = 'button[data-test-id="create-board-submit-button"]';
const menuBoardsInBoard = '[href="/workspace52660575"] > ._2mVOf7xFr_C22S';
const btnYourBoard = '.board-tile-details-sub-container';
const btnAddList = 'a.js-open-add-list span.placeholder';
const inputTitleList = 'input[name="name"]';
const btnAddList2 = 'input[value="Add list"]';
const btnListActions = '#board > div:nth-child(3) a[aria-label="List actions"]';
const btnArchiveList = 'a.js-close-list';
const arrayOfLists = '#board > div div > textarea'
const btnOpenMenu = '._1e3OHas5aNG1hj > svg';
const createdList = '#board > div:nth-child(4) > .list';
const listN3TextArea = '#board > div:nth-child(3)  div > textarea';
const listN3 = '#board > div:nth-child(3) > .list';
const boardHeader = 'h1.board-header-btn-text';
const btnPermissionLevel = '#permission-level > .board-header-btn-text';
const permissionPublic = 'a.js-select[name="public"]';
const btnPermissionSubmit ='button.js-submit';
const btnActionsDelete = 'li:nth-child(1) div._2G_o1L4qKjQzj9 button';
const btnCloseBoard = 'button[aria-label="Close board..."]';
const btnTitleClose = 'button[title="Close"]';
const btnDeleteBoard = 'button[data-test-id="close-board-delete-board-button"]';
const btnConfirmDeleteBoard = 'button[data-test-id="close-board-delete-board-confirm-button"]';
const menuBoards = 'a[data-test-id="home-team-boards-tab"]';
const btnCreateFirstBoard = 'div._3Omg7YRThEerYp button';


Cypress.Commands.add("setToken", () => { 
    cy.setCookie('token', '624de6fa54d45034bf6613d1%2FHsYFSLGPhNHUbuD0th5L0XUdM8npTYMozDZfAQnu9DgLUdiOldbYNezoVBPAiCAo');
});

Cypress.Commands.add("createBoard", () => { 
    cy.get(btnCreate).should('be.visible');
    cy.get(btnCreate).click();
    cy.get(btnCreateBoard).click();
    cy.get(inputTitleBoard).type(data.boardName);
    cy.get(btnSubmit).click();
    cy.get(boardHeader).should('have.text', data.boardName);
});

Cypress.Commands.add("makeBoardPublic", () => { 
    cy.reload();
    cy.get(btnOpenMenu).click();
    cy.get(menuBoardsInBoard).click();
    cy.get(btnYourBoard).click();
    cy.get(btnPermissionLevel).click();
    cy.get(permissionPublic).click();
    cy.get(btnPermissionSubmit).click();
});

Cypress.Commands.add("createNewList", () => {
    cy.reload(); 
    cy.get(btnOpenMenu).click();
    cy.get(menuBoardsInBoard).click();
    cy.get(btnYourBoard).click();
    cy.get(btnAddList).click();
    cy.get(inputTitleList).type(data.createdListName);
    cy.get(btnAddList2).click();
});

Cypress.Commands.add("dragDropCreatedList", () => { 
    cy.get(createdList).trigger("mousedown", {
        which: 1
    });
    cy.get(listN3).trigger("mousemove", {force: true});
    cy.get(listN3)
        .trigger("mousemove", {force: true})
        .trigger("mouseup", {force: true});
    cy.get(listN3TextArea).should('have.text', data.createdListName);
});

Cypress.Commands.add("deleteList", () => { 
    cy.get(btnListActions).click();
    cy.get(btnArchiveList).click();
    cy.get(arrayOfLists).each(($el, index, $list) => {
        $el.text() != data.createdListName;
        cy.get($el).should('not.have.text', data.createdListName);
    })
});

Cypress.Commands.add("deleteBoard", () => { 
    cy.reload();
    cy.get(btnActionsDelete).click({ force: true });
    cy.get(btnCloseBoard).click();
    cy.get(btnTitleClose).click();
    cy.get(btnDeleteBoard).click();
    cy.get(btnConfirmDeleteBoard).click();
    cy.get(menuBoards).click();
    cy.get(btnCreateFirstBoard).should('have.text', 'Create your first board');
});