/// <reference types="cypress" />

describe('Image search with Mock API', () => {
    it('should look ok visually with static data', () => {
        cy.intercept('photos?page=1').as('defaultSearchResults');

        cy.visit('/').wait('@defaultSearchResults', {
            timeout: Cypress.config('defaultCommandTimeout'),
        });

        cy.intercept('search/photos?query=mock+', { fixture: 'unsplash.json' }).as('mockedResults');

        cy.get('[data-testid="search-input"]')
          .type('mock {enter}')
          .wait('@mockedResults', {
            timeout: Cypress.config('defaultCommandTimeout'),
        });

        cy.matchImageSnapshot();
    });
  });