import { Sprite } from "pixi.js";
import Scene from "./Scene";
import gsap from "gsap";
import { fit } from "../core/utils";
import config from "../config";
import Planet from "../components/Planet";

export default class Play extends Scene {
  constructor() {
    super();
  }
  async onCreated() {
    this._createBackground();
    this._createPlanets();
  }

  _createBackground() {
    this._background = new Sprite.from("playScene");
    this._background.anchor.set(0.5);
    fit(this._background, config.view, true);
    this.addChild(this._background);
  }

  _createPlanets() {
    const blueBigPlanet = new Planet(config.planets.blueBig);
    this.addChild(blueBigPlanet);
    const redBigPlanet = new Planet(config.planets.redBig);
    this.addChild(redBigPlanet);
    const smallBluePlanet = new Planet(config.planets.smallBlue);
    this.addChild(smallBluePlanet);
    const smallRedPlanet = new Planet(config.planets.smallRed);
    this.addChild(smallRedPlanet);
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
