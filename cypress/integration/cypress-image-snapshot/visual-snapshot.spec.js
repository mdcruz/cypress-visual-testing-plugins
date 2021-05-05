/// <reference types="cypress" />

describe('Image search with Mock API', () => {
    it('should look ok visually with static data', () => {
        cy.intercept('search/photos?query=mock+', { fixture: 'unsplash.json' });

        cy.visit('/');
        cy.get('[data-testid="search-input"]').type('mock {enter}');

        cy.matchImageSnapshot();
    });
  });