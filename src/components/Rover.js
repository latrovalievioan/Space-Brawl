import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";

export default class Rover extends Container {
  constructor({ body, shadow, healthBar }) {
    super();
    (this._bodyConfig = body),
      (this._shadowConfig = shadow),
      (this._healthBarConfig = healthBar);
    this._createRoverBody(this._bodyConfig);
  }

  _createRoverBody({ image, scale = 1, x = 0, y = 0, angle = 0 }) {
    this._body = new Sprite.from(image);
    this._body.anchor.set(0.5);
    scaleXY(this._body, scale);
    this._body.x = x;
    this._body.y = y;
    this._body.angle = angle;
    this.addChild(this._body);
  }
}
