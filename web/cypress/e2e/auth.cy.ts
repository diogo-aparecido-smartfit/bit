describe("auth", () => {
  it("user should be able to log in", () => {
    cy.visit("/signin");

    // get the login form
    cy.get('input[type="text"]').type("root");
    cy.get('input[type="password"]').type("root");

    // submit credentials
    cy.get('button[type="submit"]').contains("Login").click();

    cy.contains("Posts List").should("exist");
  });

  it("login should be unsuccessful", () => {
    cy.visit("/signin");

    // get the login form
    cy.get('input[type="text"]').type("incorretUsername");
    cy.get('input[type="password"]').type("incorretPassword");

    // submit credentials
    cy.get('button[type="submit"]').contains("Login").click();

    cy.contains("Posts List").should("not.exist");
  });
});
