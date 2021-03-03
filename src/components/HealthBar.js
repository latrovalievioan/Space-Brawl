import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";

export default class HealthBar extends Container {
  constructor(config) {
    super();
    this._frameConfig = config;
    this._createFrame(this._frameConfig);
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
}
