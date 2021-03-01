import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";

export default class Shield extends Container {
  constructor({ activePart, inactivePart, upperPart, lowerPart }) {
    super();
    this._activePartConfig = activePart;
    this._inactivePartConfig = inactivePart;
    this._upperPartConfig = upperPart;
    this._lowerPartConfig = lowerPart;
    this._createActivePart(this._activePartConfig, this._upperPartConfig);
    this._createInactivePart(this._inactivePartConfig, this._lowerPartConfig);
  }
  _createActivePart({ image }, { scale = 0, x = 0, y = 0, angle = 0 }) {
    this._activePart = new Sprite.from(image);
    this._activePart.anchor.set(0.5);
    scaleXY(this._activePart, scale);
    this._activePart.x = x;
    this._activePart.y = y;
    this._activePart.angle = angle;
    this.addChild(this._activePart);
  }
  _createInactivePart({ image }, { scale = 0, x = 0, y = 0, angle = 0 }) {
    this._inactivePart = new Sprite.from(image);
    this._inactivePart.anchor.set(0.5);
    scaleXY(this._inactivePart, scale);
    this._inactivePart.x = x;
    this._inactivePart.y = y;
    this._inactivePart.angle = angle;
    this.addChild(this._inactivePart);
  }
}
