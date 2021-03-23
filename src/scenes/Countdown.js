import { Sprite } from "pixi.js";
import Scene from "./Scene";
import config from "../config";
import Planet from "../components/Planet";
import { scaleXY } from "../core/utils";
import Assets from "../core/AssetManager";
import gsap from "gsap/all";

/**
 * Represents the countdown before the main game scene appears.
 * @class
 */
export default class Countdown extends Scene {
  constructor() {
    super();
    this.name = "countdown";
  }
  /**
   * Initializes the scene.
   * @method
   * @async
   */
  async onCreated() {
    this._createBackground();
    this._createPlanets();
    this._createCountdownCircle();
    this._animate();
  }

  /**
   * Draws the background image from a sprite.
   * @method
   * @private
   */
  _createBackground() {
    this._background = new Sprite.from("playScene");
    this._background.anchor.set(0.5);
    scaleXY(this._background, config.backgroundImage.scale);
    this.addChild(this._background);
  }

  /**
   * Draws the planets for the scene.
   * @method
   * @private
   */
  _createPlanets() {
    this._blueBigPlanet = new Planet(config.planets.blueBig, "blueBig");
    this.addChild(this._blueBigPlanet);
    this._redBigPlanet = new Planet(config.planets.redBig, "redBig");
    this.addChild(this._redBigPlanet);
    this.addChild(new Planet(config.planets.smallBlue, "blueSmall"));
    this.addChild(new Planet(config.planets.smallRed, "redSmall"));
  }

  /**
   * Draws the countdown circle.
   * @method
   * @private
   */
  _createCountdownCircle() {
    this._outerCircle = new Sprite.from("countdownCircle");
    this._innerCircle = new Sprite.from("countdownFill");
    this._outerCircle.anchor.set(0.5);
    this._innerCircle.anchor.set(0.5);
    this._innerCircle.scale.y = 1.1;
    this._outerCircle.alpha = 0;
    this._innerCircle.alpha = 0;
    this.addChild(this._outerCircle);
    this.addChild(this._innerCircle);
  }

  /**
   * Draws a countdown number.
   * @param {string} name
   * @returns PIXI Object
   */
  _createNumber(name) {
    const num = new Sprite.from(name);
    num.anchor.set(0.5);
    num.alpha = 0;
    this.addChild(num);
    return num;
  }

  /**
   * Animates the countdown numbers.
   * @method
   * @private
   */
  _animate() {
    this._timeline = gsap.timeline();
    this._timeline.to([this._outerCircle, this._innerCircle], {
      alpha: 1,
      duration: 1,
      ease: "none",
    });

    for (const name of ["three", "two", "one"]) {
      const numberSprite = this._createNumber(name);
      this._timeline
        .set(numberSprite, {
          alpha: 1,
        })
        .call(() => Assets.sounds.beep.play())
        .from(numberSprite.scale, {
          x: 0,
          y: 0,
          ease: "bounce",
          duration: 1,
        })
        .to(numberSprite, {
          alpha: 0,
          duration: 0.5,
        });
    }
    this._timeline.to([this._outerCircle.scale, this._innerCircle.scale], {
      x: 0,
      y: 0,
    });
  }

  get finish() {
    return this._timeline.play();
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
