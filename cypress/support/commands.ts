/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      visit(
        url: string,
        options?: Partial<Cypress.VisitOptions>
      ): Chainable<Element>;
    }
  }
}

Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
  originalFn(`${Cypress.env("DEV_URL")}${url}`, { ...options });
});

export {};
