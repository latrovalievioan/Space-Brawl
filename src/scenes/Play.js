import { Rectangle, Sprite } from "pixi.js";
import Scene from "./Scene";
import config from "../config";
import Planet from "../components/Planet";
import { scaleXY } from "../core/utils";
import Assets from "../core/AssetManager";
import Rocket from "../components/Rocket";
import { random, detectCollision } from "../core/utils";

export default class Play extends Scene {
  static get events() {
    return {
      GAME_OVER: "game_over",
    };
  }

  async onCreated() {
    // Assets.sounds.battleMusic.play();
    this._createBackground();
    this._createPlanets();
    this._shieldSwapListener();
    this._currentTurn = this._redBigPlanet;
    this._targetPlanet = this._blueBigPlanet;
    this._player = this._redBigPlanet;
    this._bot = this._blueBigPlanet;
    this._turn(this._currentTurn);
  }

  async _turn(player) {
    if (player !== this._player) {
      await this._shootRocket(player._rocketConfig);
    } else if (player === this._player) {
      document.addEventListener("keydown", (e) => this._shootHandler(e), {
        once: true,
      });
    }
  }

  _onAnimationUpdate(body) {
    this._roverCollisionDetection(body);
    this._shieldCollisionDetection(body);
    this._randomizeBotShield();
  }
  _randomizeBotShield() {
    if (this._bot.shield._tl && this._bot.shield._tl.isActive()) return;
    else if (Math.floor(random(0, 100)) === 0) this._bot.shield._swapShield();
  }
  _roverCollisionDetection(body) {
    if (detectCollision(body, this._targetPlanet._rover)) {
      this._targetPlanet._rover._healthBar.loseHealth(
        config.planets[this._targetPlanet.name]
      );
      this._checkHealth();
      this._changeTurn();
      this._clearAnimation();
      this._turn(this._currentTurn);
    }
  }

  _checkHealth() {
    if (this._targetPlanet._rover._healthBar._currentHealth === 0) {
      localStorage.setItem("loser", this._targetPlanet.name);
      this.emit(Play.events.GAME_OVER);
    }
  }

  _shieldCollisionDetection(body) {
    this._targetPlanet.shield.hitBoxRectangles.forEach((rectangle) => {
      if (detectCollision(body, rectangle)) {
        this._clearAnimation();
        const shootFrom = this._targetPlanet;
        this._changeTarget();
        this._shootRocket(shootFrom._rocketConfig);
      }
    });
  }

  _changeTarget() {
    this._targetPlanet =
      this._targetPlanet === this._redBigPlanet
        ? this._blueBigPlanet
        : this._redBigPlanet;
  }
  _changeTurn() {
    this._currentTurn =
      this._currentTurn === this._redBigPlanet
        ? this._blueBigPlanet
        : this._redBigPlanet;
    if (this._targetPlanet === this._currentTurn) {
      this._changeTarget();
    }
  }

  _clearAnimation() {
    this._rocket._tl.clear();
    this.removeChild(this._rocket);
  }

  async _shootHandler({ key }) {
    if (key === " ") {
      await this._shootRocket(this._player._rocketConfig);
    } else {
      document.addEventListener("keydown", (e) => this._shootHandler(e), {
        once: true,
      });
    }
  }
  _shootRocket(config) {
    this._rocket = new Rocket(config);
    this.addChild(this._rocket);

    ///////
    const { x, y } = this._targetPlanet._rover._body.toLocal(
      this._targetPlanet._rover,
      this
    );

    /////////
    return this._rocket.animateRocket(
      (body) => this._onAnimationUpdate(body),
      this._targetPlanet
    );
  }

  _shieldSwapListener() {
    document.addEventListener("keydown", (e) => {
      this._redBigPlanet.shield._shieldSwapHandler(e);
      // this._blueBigPlanet.shield._shieldSwapHandler(e); <--- debugging only!
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
    this._redBigPlanet = new Planet(config.planets.redBig, "redBig");
    this.addChild(this._redBigPlanet);
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
