/// <reference types="cypress" />

describe('Image search', () => {
  beforeEach(() => {
    cy.intercept('photos?page=1').as('defaultSearchResults');

    cy.visit('/').wait('@defaultSearchResults', {
      timeout: Cypress.config('defaultCommandTimeout'),
    });

    cy.get('[data-testid="search-input"]').as('searchInput');
    cy.get('[data-test-id="image-gallery"] img').as('imageGallery');
  });

  it('should not return any images when search term is invalid', () => {
    cy.intercept('search/photos?query=jehrjehrjehrjkerae+').as(
      'invalidSearchResults'
    );

    cy.get('@searchInput')
      .type('jehrjehrjehrjkerae {enter}')
      .wait('@invalidSearchResults', {
        timeout: Cypress.config('defaultCommandTimeout'),
      })
      .then(() => cy.contains('No content found').should('be.visible'));

    cy.get('@imageGallery').should('not.exist');
  });

  it('should return images when search term is valid', () => {
    cy.intercept('search/photos?query=pancakes+').as('validSearchResults');

    cy.get('@searchInput')
      .type('pancakes {enter}')
      .wait('@validSearchResults', {
        timeout: Cypress.config('defaultCommandTimeout'),
      });

    cy.get('@imageGallery').should('be.visible').and('have.length', 10);
  });

  it('should have the correct values and styling', () => {
    cy.get('h1.header').should('have.text', 'ReactSplash');
    cy.get('h2.sub.header').should(
      'have.text',
      'The internet’s source of freely usable images. Well, powered by unsplash API...'
    );
    cy.get('[data-testid="search-input"]').should(
      'have.attr',
      'placeholder',
      'Search free high-resolution photos'
    );
    cy.get('.search.icon');
  });
});