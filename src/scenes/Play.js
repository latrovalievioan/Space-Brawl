import { Sprite } from "pixi.js";
import Scene from "./Scene";
import config from "../config";
import Planet from "../components/Planet";
import { scaleXY } from "../core/utils";
import Assets from "../core/AssetManager";
import Rocket from "../components/Rocket";
import { detectCollision } from "../core/utils";

export default class Play extends Scene {
  constructor() {
    super();
  }
  async onCreated() {
    // Assets.sounds.battleMusic.play();
    this._createBackground();
    this._createPlanets();
    this._createRocket();
    this.update();
  }

  _createBackground() {
    this._background = new Sprite.from("playScene");
    this._background.anchor.set(0.5);
    scaleXY(this._background, config.backgroundImage.scale);
    this._background.y += 55;
    this.addChild(this._background);
  }

  _createPlanets() {
    this._blueBigPlanet = new Planet(config.planets.blueBig);
    this.addChild(this._blueBigPlanet);
    this._redBigPlanet = new Planet(config.planets.redBig, true);
    this.addChild(this._redBigPlanet);
    this._smallBluePlanet = new Planet(config.planets.smallBlue);
    this.addChild(this._smallBluePlanet);
    this._smallRedPlanet = new Planet(config.planets.smallRed);
    this.addChild(this._smallRedPlanet);
  }

  _createRocket() {
    this._rocket = new Rocket(config.rocket);
    this.addChild(this._rocket);
  }

  update() {
    if (detectCollision(this._rocket, this._blueBigPlanet._rover)) {
      this._blueBigPlanet._rover._healthBar.loseHealth(config.planets.blueBig);
      this.removeChild(this._rocket);
      this._createRocket();
    }
    requestAnimationFrame(() => this.update());
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    // eslint-disable-line no-unused-vars
  }
}
