/// <reference types="cypress"/>

describe("tests", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:8080");
  });
  it("test", () => {
    cy.getPixiStage().then((stage) => {
      expect(stage).to.exist;
    });
  });
});
