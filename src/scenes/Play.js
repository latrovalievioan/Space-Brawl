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
    this._createPlanets();
    this._turns = {
      RED_BIG: "redBig",
      BLUE_BIG: "blueBig",
    };
    this._player = "redBig";
    this._currentPlayer = this._turns.BLUE_BIG;
    this._targetPlanet = this._redBigPlanet;

    this._update();
    document.addEventListener("keydown", (e) => {
      this._redBigPlanet.shield._shieldSwapHandler(e);
    });
    return this._startTurn();
  }

  _createBackground() {
    this._background = new Sprite.from("playScene");
    this._background.anchor.set(0.5);
    scaleXY(this._background, config.backgroundImage.scale);
    this.addChild(this._background);
  }

  _createPlanets() {
    this._blueBigPlanet = new Planet(config.planets.blueBig);
    this.addChild(this._blueBigPlanet);
    this._redBigPlanet = new Planet(config.planets.redBig);
    this.addChild(this._redBigPlanet);
    this._smallBluePlanet = new Planet(config.planets.smallBlue);
    this.addChild(this._smallBluePlanet);
    this._smallRedPlanet = new Planet(config.planets.smallRed);
    this.addChild(this._smallRedPlanet);
  }

  _createRocket(rocketConfig) {
    this._rocket = new Rocket(rocketConfig);
    this.addChild(this._rocket);
    return this._rocket.animateRocket();
  }

  _swapShieldRandomiser5000() {
    if (Math.round(random(0.25, 1))) this._blueBigPlanet.shield._swapShield();
  }

  async _startTurn() {
    const handler = async (e) => {
      if (e.key === " ") {
        setTimeout(() => this._swapShieldRandomiser5000(), 1000);
        await this._createRocket(config.planets[this._currentPlayer].rocket);
        this.removeChild(this._rocket);
        this._currentPlayer = this._turns.BLUE_BIG;
        this._startTurn();
      } else {
        document.addEventListener("keydown", (e) => handler(e), { once: true });
      }
    };
    if (this._currentPlayer === this._player) {
      setTimeout(() => this._swapShieldRandomiser5000(), 500);
      document.addEventListener("keydown", (e) => handler(e), { once: true });
    } else if (this._currentPlayer !== this._player) {
      setTimeout(async () => {
        await this._createRocket(config.planets[this._currentPlayer].rocket);
        this.removeChild(this._rocket);
        this._currentPlayer = this._turns.RED_BIG;
        this._startTurn();
      }, 2000);
    }
  }

  _checkRoverHit() {
    if (
      this._rocket &&
      detectCollision(this._rocket, this._targetPlanet._rover)
    ) {
      this._targetPlanet._rover._healthBar.loseHealth(config.planets.redBig);
      this.removeChild(this._rocket);
      this._targetPlanet =
        this._targetPlanet === this._redBigPlanet
          ? this._blueBigPlanet
          : this._redBigPlanet;
    }
  }

  _checkShieldHit() {
    if (this._rocket)
      this._targetPlanet.shield.hitBoxRectangles.forEach((rectangle) => {
        if (detectCollision(this._rocket, rectangle)) {
          this.removeChild(this._rocket);
          this._targetPlanet =
            this._targetPlanet === this._redBigPlanet
              ? this._blueBigPlanet
              : this._redBigPlanet;
        }
      });
  }

  _checkHealth() {
    if (this._redBigPlanet._rover._healthBar._currentHealth === 0) {
      console.log("blue wins");
    } else if (this._blueBigPlanet._rover._healthBar._currentHealth === 0) {
      console.log("red wins");
    }
  }
  /// problem here!
  _update() {
    this._checkRoverHit();
    this._checkShieldHit();
    this._checkHealth();
    setTimeout(() => this._update(), 100);
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
