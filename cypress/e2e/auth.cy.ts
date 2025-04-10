describe("Auth flow", () => {
  it("allows user to sign up and access app", () => {
    cy.visit("/signup");
    cy.get('input[placeholder="Name"]').type("Test User");
    cy.get('input[placeholder="Email"]').type("testuser@example.com");
    cy.get('input[placeholder="Password"]').type("Test@1234");
    cy.contains("Create an Account").click();
    cy.url().should("not.include", "about:blank");
    cy.contains("Welcome to the application.").should("exist");
  });

  it("allows user to login again", () => {
    cy.visit("/signin");
    cy.get('input[placeholder="Your email"]').type("testuser@example.com");
    cy.get('input[placeholder="Your password"]').type("Test@1234");
    cy.contains("Login").click();
    cy.contains("Welcome to the application.").should("exist");
  });

  // Clean up test user to run tests next time successfully
  after(() => {
    cy.request("DELETE", `${Cypress.env("API_URL")}/users`, {
      email: "testuser@example.com",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
