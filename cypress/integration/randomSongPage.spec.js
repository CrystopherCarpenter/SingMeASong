describe('random song page', () => {
    beforeEach(() => {
        cy.resetDB();
        cy.seedDB();
    });

    it('should click on button and navigate to the random song page', () => {
        cy.visit('http://localhost:3000');

        cy.intercept('GET', 'http://localhost:5000/recommendations/*').as(
            'randomSong'
        );

        cy.contains('Random').click();

        cy.wait('@randomSong');

        cy.url().should('eq', 'http://localhost:3000/random');

        cy.get('article');
    });
});
