import { Container, AnimatedSprite, BLEND_MODES } from "pixi.js";
import Assets from "../core/AssetManager";

export default class Explosion extends Container {
  constructor() {
    super();

    this._body = null;
    this._bottom = null;
    this._body = new AnimatedSprite(
      Assets.spritesheets.explosion.animations.explosion
    );
    this._body.blendMode = BLEND_MODES.ADD_NPM;
    this._body.anchor.set(0.5);
    this.addChild(this._body);

    this.interactive = true;
    this.ignite();
  }

  ignite() {
    this._body.play();
    this.alpha = 1;
  }

  extinguish() {
    this._body.pause();
    this.alpha = 0;
  }
}
