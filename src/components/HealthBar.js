import { Container, Sprite, filters } from "pixi.js";
import { scaleXY } from "../core/utils";
import gsap from "gsap/all";

/**
 * Represents the health bar and meter of the rover.
 * @class
 */
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

  /**
   * Draws the frame of the healthbar.
   * @param {{string, number, number, number, number}} Object
   */
  _createFrame({ image, scale, x, y, angle }) {
    this._frame = new Sprite.from(image);
    this._frame.anchor.set(0.5);
    scaleXY(this._frame, scale);
    this._frame.x = x;
    this._frame.y = y;
    this._frame.angle = angle;
    this.addChild(this._frame);
  }
  /**
   * Draws the meter corresponding to the rover's health value.
   * @param {{string, number, number, number, number}} Object
   */
  _createMeter({ image, scale, x, y, angle }) {
    this._meter = new Sprite.from(image);
    this._meter.anchor.set(0.5);
    scaleXY(this._meter, scale);
    this._meter.x = x;
    this._meter.y = y;
    this._meter.angle = angle;
    this.addChild(this._meter);
  }

  /**
   * Scales the meter according to the value of the rover's health.
   * @param {{number}} Object
   */
  loseHealth({ damage }) {
    this._currentHealth -= damage;
    gsap.to(this._meter.scale, {
      x: `${this._currentHealth / 100}`,
    });
  }
}
