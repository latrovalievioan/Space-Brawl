import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";
import Rover from "./Rover";
import gsap from "gsap/all";
import { random } from "../core/utils";
import Shield from "./Shield";

export default class Planet extends Container {
  constructor({ image, x = 0, y = 0, scale, rover, shield }) {
    super();
    this._image = image;
    this._x = x;
    this._y = y;
    this._scale = scale;
    this._roverConfig = rover;
    this._shieldConfig = shield;
    this._createPlanet();
  }

  _createPlanet() {
    this._body = new Sprite.from(this._image);
    this._body.anchor.set(0.5);
    this._body.x = this._x;
    this._body.y = this._y;
    scaleXY(this._body, this._scale);
    this.addChild(this._body);
    if (this._roverConfig) this._createRover();
    if (this._shieldConfig) this._createShield();
    // this._floatAnimation();
  }

  _createRover() {
    this._rover = new Rover(this._roverConfig);
    this._body.addChild(this._rover);
  }
  _createShield() {
    this.shield = new Shield(this._shieldConfig);
    this._body.addChild(this.shield);
  }

  _floatAnimation() {
    this._tl = gsap.timeline();
    this._tl.to(this, {
      x: `+=${random(-20, 20)}`,
      y: `-=${random(-20, 20)}`,
      repeat: -1,
      yoyo: true,
      ease: "none",
      duration: random(1.5, 3),
    });
  }
}
