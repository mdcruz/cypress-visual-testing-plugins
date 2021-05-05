/// <reference types="@applitools/eyes-cypress" />
/// <reference types="cypress" />

describe('Image search', () => {
    it('should look ok visually', () => {
        cy.intercept('photos?page=1').as('defaultSearchResults');

        cy.visit('/').wait('@defaultSearchResults', {
            timeout: Cypress.config('defaultCommandTimeout'),
        });

        cy.eyesOpen({
            appName: 'ReactSplash',
            batchName: 'Image search',
            browser: [{ width: 1024, height: 768 }],
        });
    
        cy.eyesCheckWindow('Image Gallery');
        cy.eyesClose();
    });
  });