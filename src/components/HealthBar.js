import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";

export default class HealthBar extends Container {
  constructor(frameConfig, meterConfig, health) {
    super();
    this._frameConfig = frameConfig;
    this._meterConfig = meterConfig;
    this._createFrame(this._frameConfig);
    this._createMeter(this._meterConfig);
    this._fullHealth = health;
    this._currentHealth = this._fullHealth;
  }
  _createFrame({ image, scale, x, y, angle }) {
    this._frame = new Sprite.from(image);
    this._frame.anchor.set(0.5);
    scaleXY(this._frame, scale);
    this._frame.x = x;
    this._frame.y = y;
    this._frame.angle = angle;
    this.addChild(this._frame);
  }
  _createMeter({ image, scale, x, y, angle }) {
    this._meter = new Sprite.from(image);
    this._meter.anchor.set(0.5);
    scaleXY(this._meter, scale);
    this._meter.x = x;
    this._meter.y = y;
    this._meter.angle = angle;
    this.addChild(this._meter);
  }
  loseHealth({ damage }) {
    this._currentHealth -= damage;
    this._meter.scale.x *= this._currentHealth / 100;
  }
}
