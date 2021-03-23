import { Sprite } from "pixi.js";
import Scene from "./Scene";
import config from "../config";
import Planet from "../components/Planet";
import { scaleXY } from "../core/utils";
import Assets from "../core/AssetManager";
import Rocket from "../components/Rocket";
import { random, detectCollision } from "../core/utils";
import Explosion from "../components/Explosion";
import gsap from "gsap/all";

export default class Play extends Scene {
  constructor() {
    super();
    this.name = "playScene";
  }
  static get events() {
    return {
      GAME_OVER: "game_over",
    };
  }

  async onCreated() {
    this._createBackground();
    this._createPlanets();
    this._shieldSwapListener();
    this._currentTurn = this._redBigPlanet;
    this._targetPlanet = this._blueBigPlanet;
    this._playerPlanet = this._redBigPlanet;
    this._bot = this._blueBigPlanet;
    this._startTurn(this._currentTurn);
  }

  _shake() {
    gsap.to(this, {
      y: 5,
      repeat: 5,
      yoyo: true,
      ease: "none",
      duration: 0.09,
    });
  }

  _explode({ x, y }) {
    this._explosion = new Explosion();
    this._explosion.x = x;
    this._explosion.y = y;
    this.addChild(this._explosion);
    setTimeout(() => this.removeChild(this._explosion), 1000);
  }

  _startTurn(planetOnTurn) {
    if (planetOnTurn !== this._playerPlanet) {
      setTimeout(() => {
        this._shootRocket(planetOnTurn._rocketConfig, true);
      }, 1000);
    } else {
      document.addEventListener("keydown", (e) => this._shootHandler(e), {
        once: true,
      });
    }
  }

  _stopRocketSound() {
    Assets.sounds.shootRight.stop();
    Assets.sounds.shootLeft.stop();
  }

  _onAnimationUpdate(rocket) {
    this._roverCollisionDetection(rocket.hitBox);
    this._shieldCollisionDetection(rocket.hitBox);
    this._randomizeBotShield();
  }

  _randomizeBotShield() {
    if (random(0, 100) < 1 && !this._bot.shield.isActive)
      this._bot.shield._swapShield();
  }

  _roverCollisionDetection(hitbox) {
    if (!detectCollision(hitbox, this._targetPlanet._rover)) return;
    this._explode(this._rocket.body);
    this._shake();
    this._stopRocketSound();
    this._explosionSound();
    this._targetPlanet._rover._healthBar.loseHealth(
      config.planets[this._targetPlanet.name]
    );
    this._checkHealth();
    this._changeTurn();
    this._clearRocketAnimation();
    this._startTurn(this._currentTurn);
  }

  _shieldCollisionDetection(hitbox) {
    const hasCollision = this._targetPlanet.shield.hitBoxRectangles.some(
      (rect) => detectCollision(hitbox, rect)
    );
    if (!hasCollision) return;
    this._bounceSound();
    const { x, y, angle } = this._rocket.body;
    this._clearRocketAnimation();
    this._changeTarget();
    const config = {
      body: {
        image: "rocket",
        x,
        y,
        angle,
      },
      flame: this._targetPlanet._rocketConfig.flame,
    };
    this._shootRocket(config);
  }

  _checkHealth() {
    if (this._targetPlanet._rover._healthBar._currentHealth === 0) {
      this.emit(Play.events.GAME_OVER, { name: this._targetPlanet.name });
    }
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

  _clearRocketAnimation() {
    this._rocket._tl.clear();
    this.removeChild(this._rocket);
  }

  _shootHandler({ key }) {
    if (key === " ") {
      this._shootRocket(this._playerPlanet._rocketConfig, true);
    } else {
      document.addEventListener("keydown", (e) => this._shootHandler(e), {
        once: true,
      });
    }
  }

  _shootSound() {
    if (this._targetPlanet.name === "blueBig") {
      Assets.sounds.shootLeft.stop();
      Assets.sounds.shootRight.play();
    } else if (this._targetPlanet.name === "redBig") {
      Assets.sounds.shootRight.stop();
      Assets.sounds.shootLeft.play();
    }
  }

  _bounceSound() {
    if (this._targetPlanet.name === "blueBig") {
      Assets.sounds.bounceL.play();
    } else if (this._targetPlanet.name === "redBig") {
      Assets.sounds.bounceR.play();
    }
  }

  _explosionSound() {
    if (this._targetPlanet.name === "blueBig") {
      Assets.sounds.explosionL.play();
    } else if (this._targetPlanet.name === "redBig") {
      Assets.sounds.explosionR.play();
    }
  }

  _shootRocket(config, fromRover = false) {
    if (fromRover) {
      this._shootSound();
    }

    this._rocket = new Rocket(config);
    this.addChild(this._rocket);
    return this._rocket.animateRocket(
      (body) => this._onAnimationUpdate(body),
      this._targetPlanet
    );
  }

  _shieldSwapListener() {
    document.addEventListener("keydown", (e) => {
      this._redBigPlanet.shield._shieldSwapHandler(e);
    });
  }

  _createBackground() {
    const background = new Sprite.from("playScene");
    background.anchor.set(0.5);
    scaleXY(background, config.backgroundImage.scale);
    this.addChild(background);
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
