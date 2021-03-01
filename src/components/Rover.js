import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";

export default class Rover extends Container {
  constructor({ body, shadow, healthBar }) {
    super();
    this._bodyConfig = body;
    this._shadowConfig = shadow;
    this._healthBarConfig = healthBar;
    this._createRoverBody(this._bodyConfig);
    this._createRoverShadow(this._shadowConfig);
    this._createHealthBar(this._healthBarConfig);
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
  _createRoverShadow({ image, scale, x, y, angle }) {
    this._shadow = new Sprite.from(image);
    this._shadow.anchor.set(0.5);
    scaleXY(this._shadow, scale);
    this._shadow.x = x;
    this._shadow.y = y;
    this._shadow.angle = angle;
    this.addChild(this._shadow);
  }
  _createHealthBar({ image, scale, x, y, angle }) {
    this._healthBar = new Sprite.from(image);
    this._healthBar.anchor.set(0.5);
    scaleXY(this._healthBar, scale);
    this._healthBar.x = x;
    this._healthBar.y = y;
    this._healthBar.angle = angle;
    this.addChild(this._healthBar);
  }
}
