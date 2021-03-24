import { Container, AnimatedSprite, BLEND_MODES } from "pixi.js";
import Assets from "../core/AssetManager";

/**
 * Represents an explosion.
 * @class
 */
export default class Explosion extends Container {
  constructor() {
    super();
    /**
     * Represents the animaton of the explosion.
     */
    this._body = null;
    this._body = new AnimatedSprite(
      Assets.spritesheets.explosion.animations.explosion
    );
    this._body.blendMode = BLEND_MODES.ADD_NPM;
    this._body.anchor.set(0.5);
    this.addChild(this._body);

    this.interactive = true;
    this.ignite();
  }

  /**
   * Plays the animation.
   * @method
   */
  ignite(a) {
    this._body.play();
    this.alpha = 1;
  }

  /**
   * Pauses the animation.
   * @method
   */
  extinguish() {
    this._body.pause();
    this.alpha = 0;
  }
}
