describe('add a song page', () => {
    beforeEach(() => {
        cy.resetDB();
    });

    it('should click score up one time in a song and down until the song get deleted', () => {
        const name = 'On Melancholy Hill';
        const youtubeLink = 'https://www.youtube.com/watch?v=04mfKJWDSzI';

        cy.request('POST', 'http://localhost:5000/recommendations', {
            name,
            youtubeLink,
        }).then(() => {
            cy.visit('http://localhost:3000');

            cy.get('article');

            cy.intercept(
                'POST',
                'http://localhost:5000/recommendations/*/upvote'
            ).as('upvote');

            cy.get('[id="up"]').click();

            cy.wait('@upvote');

            cy.get('div').contains('1');

            cy.intercept(
                'POST',
                'http://localhost:5000/recommendations/*/downvote'
            ).as('downvote');

            for (let i = 0; i <= 6; i++) {
                cy.get('[id="down"]').click();

                cy.wait('@downvote');

                if (i < 6) cy.get('div').contains(`${-i}`);
            }

            cy.contains('No recommendations yet');
        });
    });
});
