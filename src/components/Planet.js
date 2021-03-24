import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";
import Rover from "./Rover";
import gsap from "gsap/all";
import { random } from "../core/utils";
import Shield from "./Shield";

/**
 * Represents a planet.
 * @class
 */
export default class Planet extends Container {
  /**
   * @param {{string, number, number, number, Object, Object, Object}} Object
   * @param {string} name
   */
  constructor({ image, x = 0, y = 0, scale, rover, shield, rocket }, name) {
    super();
    this._image = image;
    this._x = x;
    this._y = y;
    this._scale = scale;
    this._roverConfig = rover;
    this._shieldConfig = shield;
    this._rocketConfig = rocket;
    this._createPlanet();
    this.name = name;
  }

  /**
   * Draws a planet on the canvas.
   * @method
   * @private
   */
  _createPlanet() {
    this._body = new Sprite.from(this._image);
    this._body.anchor.set(0.5);
    this._body.x = this._x;
    this._body.y = this._y;
    scaleXY(this._body, this._scale);
    this.addChild(this._body);
    if (this._roverConfig) this._createRover();
    if (this._shieldConfig) this._createShield();
    this._floatAnimation();
  }

  /**
   * Draws a rover.
   * @method
   * @private
   */
  _createRover() {
    this._rover = new Rover(this._roverConfig);
    this._body.addChild(this._rover);
  }

  /**
   * Draws a shield.
   * @method
   * @private
   */
  _createShield() {
    this.shield = new Shield(this._shieldConfig);
    this._body.addChild(this.shield);
  }

  /**
   * Animates the planet so that it "floats".
   * @method
   * @private
   */
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
