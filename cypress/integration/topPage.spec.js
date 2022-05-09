// import dotenv from 'dotenv';
// dotenv.config();
//
// const baseURL = process.env.REACT_APP_API_BASE_URL;

describe('top songs page', () => {
    beforeEach(() => {
        cy.resetDB();
        cy.seedDB();
    });

    it('should click on button and navigate to the top songs page', () => {
        cy.visit('http://localhost:3000');

        cy.intercept('GET', 'http://localhost:5000/recommendations/top/10').as(
            'topSongs'
        );

        cy.contains('Top').click();

        cy.url().should('eq', 'http://localhost:3000/top');

        cy.wait('@topSongs');

        cy.get('article');
    });
});
