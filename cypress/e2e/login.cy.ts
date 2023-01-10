export default describe("Login", () => {
  it("Login via Google", () => {
    cy.visit("/");

    cy.get("#signin").should("be.visible");

    // Check the window for Cypress (also has browser log)
    // should be populated in both here and in application
    cy.window().then((win) =>
      console.log({ "Is Cypress Init Cypress": win.Cypress })
    );

    cy.get("#signin").click();

    cy.get('button[type="submit"]').contains("Google").click({ force: true });

    cy.origin("https://accounts.google.com/", () => {
      cy.get("#identifierId").type(Cypress.env("GOOGLE_LOGIN_EMAIL"));
      cy.get("span").contains("Next").click();
      cy.wait(3000);
      Cypress.on(
        "uncaught:exception",
        (err) => !err.message.includes("ResizeObserver loop limit exceeded")
      );
      cy.get("[name='password']").type(Cypress.env("GOOGLE_LOGIN_PASSWORD"));
      cy.get("span").contains("Next").click();
      cy.wait(3000);
    });

    cy.get("#logged-in").should("be.visible");

    // Check the window for Cypress again (also has browser log)
    // this time it will be undefined both here and in the application?
    cy.window().then((win) =>
      console.log({ "Is Cypress Init Cypress": win.Cypress })
    );

    cy.wait(1000);

    cy.reload();

    // Check the window for Cypress again (also has browser log)
    // this time it will be defined once again
    cy.window().then((win) =>
      console.log({ "Is Cypress Init Cypress": win.Cypress })
    );
  });
});
