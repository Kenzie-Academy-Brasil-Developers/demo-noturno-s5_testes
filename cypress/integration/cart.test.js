describe("Cart flow", () => {
  it("should have 2 products in the cart", () => {
    cy.visit("http://localhost:3001/");
    cy.viewport(1440, 900);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    //ações
    cy.get(":nth-child(1) > div > button > span").click();
    cy.get(":nth-child(2) > div > button > span").click();
    cy.contains(/carrinho/i).click();

    //verificações
    cy.get(".MuiTableBody-root > tr").should("have.length", 2);
    cy.contains(/xiaomi/i);
    cy.contains(/samsung/i);
  });

  it("should finish the order and go to Login", () => {
    //ações
    cy.contains(/finalizar o pedido/i).click();
    cy.get("input").should("have.length", 2);
    cy.contains(/ENVIAR/i);
  });
});

context("Login flow", () => {
  it("should not go to login, because no credentials", () => {
    cy.intercept("POST", "/sessions", {
      statusCode: 200,
      body: {
        access: "jwt-token",
      },
    });

    cy.get(".MuiButtonBase-root").click();

    cy.get('[data-testid="submitButton"]').click();
    cy.get('[data-testid="passwordTestId"] > .MuiFormHelperText-root').should(
      "have.text",
      "Mínimo de 4 dígitos"
    );
  });

  it("should not go to login, because wrong credentials", () => {
    cy.get(
      '[data-testid="userNameTestId"] > .MuiInputBase-root > .MuiInputBase-input'
    ).type("allalallalalalalalalalalalalala");

    cy.get(
      '[data-testid="passwordTestId"] > .MuiInputBase-root > .MuiInputBase-input'
    ).type("316516489461641916");

    cy.get(".MuiButtonBase-root").click();

    cy.get('[data-testid="submitButton"]').click();

    cy.contains("Usuário ou senha incorretas!");
  });

  it("should login and go to dashboard", () => {
    cy.get(
      '[data-testid="userNameTestId"] > .MuiInputBase-root > .MuiInputBase-input'
    )
      .clear()
      .type("kenzinho");
    cy.get(
      '[data-testid="passwordTestId"] > .MuiInputBase-root > .MuiInputBase-input'
    )
      .clear()
      .type("1234");
    cy.contains(/ENVIAR/i).click();
  });
});
