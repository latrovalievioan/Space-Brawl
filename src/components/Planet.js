import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";
import Rover from "./Rover";
import config from "../config";

export default class Planet extends Container {
  constructor({ image, x = 0, y = 0, scale, rover }) {
    super();
    this._image = image;
    this._x = x;
    this._y = y;
    this._scale = scale;
    this._rover = rover;
    this._createPlanet();
  }

  _createPlanet() {
    this._body = new Sprite.from(this._image);
    this._body.anchor.set(0.5);
    this._body.x = this._x;
    this._body.y = this._y;
    scaleXY(this._body, this._scale);
    this.addChild(this._body);
    if (this._rover) this._createRover();
  }

  _createRover() {
    const rover = new Rover(this._rover);
    this._body.addChild(rover);
  }
}
