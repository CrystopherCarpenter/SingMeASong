describe('add a song', () => {
    beforeEach(() => {
        cy.resetDB();
    });

    it('should add a song successfully', () => {
        const song = {
            name: 'On Melancholy Hill',
            youtubeLink: 'https://www.youtube.com/watch?v=p00v9ZFhWJM',
        };

        cy.visit('http://localhost:3000');

        cy.contains('No recommendations yet');

        cy.get('input[placeholder="Name"]').type(song.name);
        cy.get('input[placeholder="https://youtu.be/..."]').type(
            song.youtubeLink
        );

        cy.intercept('POST', 'http://localhost:5000/recommendations').as(
            'insert'
        );

        cy.get('button').click();

        cy.wait('@insert');

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

        cy.get('[id="down"]').click();

        cy.wait('@downvote');

        cy.get('div').contains('0');
    });
});

describe('top songs page', () => {
    beforeEach(() => {
        cy.resetDB();
        cy.seedDB();
    });
});
