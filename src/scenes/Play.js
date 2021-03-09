import { Rectangle, Sprite } from "pixi.js";
import Scene from "./Scene";
import config from "../config";
import Planet from "../components/Planet";
import { scaleXY } from "../core/utils";
import Assets from "../core/AssetManager";
import Rocket from "../components/Rocket";
import { random, detectCollision } from "../core/utils";

export default class Play extends Scene {
  async onCreated() {
    // Assets.sounds.battleMusic.play();
    this._createBackground();
    this._players = [];
    this._createPlanets();
    this._shieldSwapListener();
    this._currentTurn = this._players[1];
    this._targetPlanet = this._players[0];
    this._player = this._redBigPlanet;
    this._turn(this._currentTurn);
  }

  async _turn(player) {
    if (player !== this._player) {
      await this._shootRocket(player._rocketConfig);
      this.removeChild(this._rocket);
      this._currentTurn =
        this._currentTurn === this._blueBigPlanet
          ? this._redBigPlanet
          : this._blueBigPlanet;
      this._turn(this._currentTurn);
    } else {
      document.addEventListener(
        "keydown",
        async ({ key }) => {
          if (key === " ") {
            await this._shootRocket(player._rocketConfig);
            this.removeChild(this._rocket);
            this._currentTurn =
              this._currentTurn === this._blueBigPlanet
                ? this._redBigPlanet
                : this._blueBigPlanet;
            this._turn(this._currentTurn);
          }
        },
        { once: true }
      );
    }
  }

  _shootRocket(config) {
    this._rocket = new Rocket(config);
    this.addChild(this._rocket);
    return this._rocket.animateRocket((body) => this._onAnimationUpdate(body));
  }

  _onAnimationUpdate(body) {
    if (detectCollision(body, this._targetPlanet._rover)) {
      this.removeChild(this._rocket);
      this._blueBigPlanet._rover._healthBar.loseHealth(
        config.planets[this._targetPlanet.name]
      );
    }
  }

  _shieldSwapListener() {
    document.addEventListener("keydown", (e) => {
      this._redBigPlanet.shield._shieldSwapHandler(e);
    });
  }
  _createBackground() {
    this._background = new Sprite.from("playScene");
    this._background.anchor.set(0.5);
    scaleXY(this._background, config.backgroundImage.scale);
    this.addChild(this._background);
  }

  _createPlanets() {
    this._blueBigPlanet = new Planet(config.planets.blueBig, "blueBig");
    this.addChild(this._blueBigPlanet);
    this._players.push(this._blueBigPlanet);
    this._redBigPlanet = new Planet(config.planets.redBig, "redBig");
    this.addChild(this._redBigPlanet);
    this._players.push(this._redBigPlanet);
    this.addChild(new Planet(config.planets.smallBlue, "blueSmall"));
    this.addChild(new Planet(config.planets.smallRed, "redSmall"));
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
