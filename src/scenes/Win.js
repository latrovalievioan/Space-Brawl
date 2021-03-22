import Assets from "../core/AssetManager";
import Scene from "./Scene";
import { Sprite, filters } from "pixi.js";
import config from "../config";
import gsap from "gsap/all";
import { scaleXY } from "../core/utils";

/**
 * Represents the end screen scene of the game.
 * @class
 */
export default class Win extends Scene {
  /**
   *
   * @param {String} loser - The name of the loosing planet.
   */
  constructor(loser) {
    super();
    this._loser = loser;
    this._config = config.scenes.Win;
    this._createBackground();
    this._createTitle();
    this._createButton();
    this._createStars();
    this._animateIn();
  }
  static get events() {
    return {
      REPLAY: "replay",
    };
  }
  /**
   * Draws the background of the scene from a sprite.
   * @method
   * @private
   */
  _createBackground() {
    this._background = new Sprite.from(Assets.images["play-scene"]);
    this._background.anchor.set(0.5);
    const blurFilter = new filters.BlurFilter();
    this._background.filters = [blurFilter];
    blurFilter.blur = this._config.backgroundBlur;
    this.addChild(this._background);
  }

  /**
   * Draws the title acconding to the winner of the previous scene.
   * @method
   * @private
   */
  _createTitle() {
    const sprite = this._loser === "blueBig" ? "redWins" : "blueWins";
    this._title = Sprite.from(sprite);
    this._title.anchor.set(0.5);
    this.addChild(this._title);
  }

  /**
   * Draws a replay button from sprite.
   * @method
   * @private
   */
  _createButton() {
    this._button = new Sprite.from("replayButton");
    this._button.anchor.set(0.5);
    this._button.interactive = true;
    this._button.buttonMode = true;
    this._button.on("click", () => {
      this.emit(Win.events.REPLAY);
    });
    this._button.y = 330;
    this.addChild(this._button);
  }

  /**
   * Draws stars.
   * @method
   * @private
   */
  _createStars() {
    for (const { x, y, angle, scale } of this._config.starsCoordinates) {
      const star = new Sprite.from("star");
      star.anchor.set(0.5);
      star.x = x;
      star.y = y;
      star.angle = angle;
      scaleXY(star, scale);
      this.addChild(star);
    }
  }

  /**
   * Animates the beggining of the scene.
   * @method
   * @private
   */
  _animateIn() {
    gsap
      .timeline()
      .from(this._title.scale, {
        x: 0,
        y: 0,
        ease: "bounce",
        duration: 1,
      })
      .from(this._button, {
        y: -600,
        ease: "bounce",
        duration: 1,
      });
  }
}
