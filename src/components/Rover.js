import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";
import HealthBar from "./HealthBar";

/**
 * Represents a rover.
 * @class
 */
export default class Rover extends Container {
  /**
   *
   * @param {{Object,Object,Object,Object,Object}} Object - Config object.
   */
  constructor({ body, shadow, healthBar, healthMeter, health }) {
    super();
    this._bodyConfig = body;
    this._shadowConfig = shadow;
    this._healthBarConfig = healthBar;
    this._healthMeterConfig = healthMeter;
    this.fullHealth = health.fullHealth;
    this._createRoverBody(this._bodyConfig);
    this._createRoverShadow(this._shadowConfig);
    this._createHealthBar();
  }

  /**
   * Draws the rover's body.
   * @param {{string,number,number,number,number}} Object - Config.
   * @method
   * @private
   */
  _createRoverBody({ image, scale = 1, x = 0, y = 0, angle = 0 }) {
    this._body = new Sprite.from(image);
    this._body.anchor.set(0.5);
    scaleXY(this._body, scale);
    this._body.x = x;
    this._body.y = y;
    this._body.angle = angle;
    this.addChild(this._body);
  }

  /**
   * Draws the rover's shadow.
   * @param {{string,number,number,number,number}} Object - Config.
   * @method
   * @private
   */
  _createRoverShadow({ image, scale, x, y, angle }) {
    this._shadow = new Sprite.from(image);
    this._shadow.anchor.set(0.5);
    scaleXY(this._shadow, scale);
    this._shadow.x = x;
    this._shadow.y = y;
    this._shadow.angle = angle;
    this.addChild(this._shadow);
  }

  /**
   * Draws the rover's healthbar.
   * @method
   * @private
   */
  _createHealthBar() {
    this._healthBar = new HealthBar(
      this._healthBarConfig,
      this._healthMeterConfig,
      this.fullHealth
    );
    this.addChild(this._healthBar);
  }
}
