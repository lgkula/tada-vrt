import * as common from "../pages/common/common";

describe('Navigation Bar - Visual Tests', () => {
    it('Navigation Bar Component', () => {
        cy.intercept('GET', '/api/tonnageList*').as('getTonnageList');

        cy.visit('/');
        common.inactivePace().should('exist')
        cy.get('#enterEmailFormEmail', { timeout: 10000 }).should('be.visible').type('user1@stresstest.com', { delay: 100 });
        cy.get('#enterEmailFormSubmit').should('be.visible').click();
        cy.get('#password', { timeout: 10000 }).should('be.visible').type('Qweasd12@', { delay: 100 });
        cy.get('#submitLogin').should('be.visible').click();
        cy.contains('button', 'Accept').click();
        cy.get("div[class^='SideNav_headerTitle_']", { timeout: 30000 }).should('be.visible');
        common.inactivePace().should('exist')
        cy.get('#sideNav').matchImageSnapshot({
            blackout: [
                '.clock',
                '[class^="UserMenu_sideNavHeaderSettings_"]'
            ],
        });
    });
});