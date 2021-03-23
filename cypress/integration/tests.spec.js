/// <reference types="cypress"/>

describe("tests", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:8080");
  });

  it("should have a loading scene", () => {
    cy.getPixiStage()
      .getPixiElementByName("loading")
      .then((element) => {
        expect(element).to.exist;
      });
  });
  it("should have a tutorial scene", () => {
    cy.getPixiStage()
      .getPixiElementByName("tutorial")
      .then((element) => {
        expect(element).to.exist;
      });
  });
  it("should have all tutorial elements", () => {
    cy.getPixiStage()
      .getPixiElementByName("tutorial")
      .then((element) => {
        expect(element._gameInstructions).to.exist;
        expect(element._title).to.exist;
        expect(element._nextButton).to.exist;
        expect(element._playButton).to.exist;
        expect(element._arrowInstructions).to.exist;
        expect(element._upArrow).to.exist;
        expect(element._spacebar).to.exist;
        expect(element._spacebarInstructions).to.exist;
        expect(element._timeline).to.exist;
      });
  });
  it("should have a countdown scene", () => {
    cy.getPixiStage()
      .getPixiElementByName("nextButton")
      .then((element) => {
        element.emit("click");
        element.emit("click");
      });
    cy.getPixiStage()
      .getPixiElementByName("playButton")
      .then((element) => {
        element.emit("click");
      });
    cy.getPixiStage()
      .getPixiElementByName("countdown")
      .then((element) => {
        expect(element).to.exist;
      });
  });

  it("should restart the game after replay button is clicked", () => {
    cy.getPixiStage()
      .getPixiElementByName("nextButton")
      .then((element) => {
        element.emit("click");
        element.emit("click");
      });
    cy.getPixiStage()
      .getPixiElementByName("playButton")
      .then((element) => {
        element.emit("click");
      });
    cy.wait(10000);
    cy.getPixiStage()
      .getPixiElementByName("playScene")
      .then((playscene) => {
        playscene.emit("game_over", { name: "blueBig" });
      });
    cy.getPixiStage()
      .getPixiElementByName("replayButton")
      .then((element) => {
        element.emit("click");
      });
    cy.getPixiStage()
      .getPixiElementByName("game")
      .then((game) => {
        expect(game.currentScene.name).to.eq("playScene");
      });
  });
});
