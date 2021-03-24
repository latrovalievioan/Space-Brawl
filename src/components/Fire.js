import { Container, AnimatedSprite, BLEND_MODES } from "pixi.js";
import Assets from "../core/AssetManager";

/**
 * Represents a fire animaion container.
 * @class
 */
export default class Fire extends Container {
  constructor() {
    super();
    /**
     * Top part of the fire.
     */
    this._top = null;
    /**
     * Bottom part of the fire.
     */
    this._bottom = null;

    this._bottom = new AnimatedSprite(Assets.spritesheets.fire.animations.fire);
    this._bottom.blendMode = BLEND_MODES.HUE;
    this._bottom.alpha = 0.3;
    this._bottom.anchor.set(0.5);
    this.addChild(this._bottom);

    this._top = new AnimatedSprite(Assets.spritesheets.fire.animations.fire);
    this._top.blendMode = BLEND_MODES.ADD_NPM;
    this._top.anchor.set(0.5);
    this.addChild(this._top);

    this.interactive = true;
    this.ignite();
  }

  /**
   * Plays the fire animation.
   * @method
   */
  ignite() {
    this._top.play();
    this._bottom.play();
    this.alpha = 1;
  }

  /**
   * Extinguishes the fire animation.
   * @method
   */
  extinguish() {
    this._top.pause();
    this._bottom.pause();
    this.alpha = 0;
  }
}
