import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";
import gsap from "gsap/all";

/**
 * Represents a shield that has a active and inactive part, which can be switched.
 * @class
 */
export default class Shield extends Container {
  /**
   *
   * @param {Object} Object - Config.
   */
  constructor({ activePart, inactivePart, upperPart, lowerPart, hitBox }) {
    super();
    this._upperPartConfig = upperPart;
    this._lowerPartConfig = lowerPart;
    this._hitBoxConfig = hitBox;
    this.hitBoxRectangles = [];
    this._createHitBox(this._hitBoxConfig.upper);
    this._activePart = this._createShieldPart(activePart, upperPart);
    this._inactivePart = this._createShieldPart(inactivePart, lowerPart);
  }

  /**
   * @returns boolean
   */
  get isActive() {
    return this._tl && this._tl.isActive();
  }

  /**
   * Draws a part of the shield.
   * @param {{string}} Object - Config.
   * @param {{number, number, number, number}} Object - Config.
   * @returns Display Object.
   * @method
   * @private
   */
  _createShieldPart({ image }, { scale, x, y, angle }) {
    const shieldPart = new Sprite.from(image);
    shieldPart.anchor.set(0.5);
    scaleXY(shieldPart, scale);
    shieldPart.x = x;
    shieldPart.y = y;
    shieldPart.angle = angle;
    this.addChild(shieldPart);
    return shieldPart;
  }

  /**
   * Handles shield swapping.
   * @param {string} event
   * @method
   * @private
   */
  _shieldSwapHandler({ key }) {
    if (
      (key === "ArrowDown" && this._activePart.x === this._upperPartConfig.x) ||
      (key === "ArrowUp" && this._activePart.x === this._lowerPartConfig.x)
    ) {
      this._swapShield();
    }
  }
  /**
   * Swaps the active and inactive parts of the shield.
   * @method
   * @private
   */
  async _swapShield() {
    this._swapHitBoxes();
    const active = this._activePart;
    const inactive = this._inactivePart;
    this._tl = gsap.timeline();
    this._tl
      .to(active, {
        x: inactive.x,
        y: inactive.y,
        angle: inactive.angle - 90,
        duration: 0.4,
      })
      .to(
        inactive,
        {
          x: active.x,
          y: active.y,
          angle: active.angle + 90,
          duration: 0.4,
        },
        "<"
      );
  }

  /**
   * Changes the position of the hitboxes of the shield.
   * @method
   * @private
   */
  _swapHitBoxes() {
    const { lower, upper } = this._hitBoxConfig;
    const { rect1, rect2 } =
      this.rectangle1.x === upper.rect1.x ? lower : upper;
    [
      this.rectangle1.x,
      this.rectangle1.y,
      this.rectangle1.angle,
      this.rectangle2.x,
      this.rectangle2.y,
      this.rectangle2.angle,
    ] = [rect1.x, rect1.y, rect1.angle, rect2.x, rect2.y, rect2.angle];
  }

  /**
   * Draws the hit boxes of the shield.
   * @param {{Object,Object}} Object - Config.
   * @method
   * @private
   */
  _createHitBox({ rect1, rect2 }) {
    this.rectangle1 = PIXI.Sprite.from(PIXI.Texture.WHITE);
    this.rectangle1.width = rect1.width;
    this.rectangle1.height = rect1.height;
    this.rectangle1.tint = 0xff0000;
    this.rectangle1.anchor.set(0.5);
    this.rectangle1.x = rect1.x;
    this.rectangle1.y = rect1.y;
    this.rectangle1.angle = rect1.angle;
    this.rectangle1.alpha = 0;
    this.addChild(this.rectangle1);
    this.hitBoxRectangles.push(this.rectangle1);
    this.rectangle2 = PIXI.Sprite.from(PIXI.Texture.WHITE);
    this.rectangle2.width = rect2.width;
    this.rectangle2.height = rect2.height;
    this.rectangle2.tint = 0xffff00;
    this.rectangle2.anchor.set(0.5);
    this.rectangle2.x = rect2.x;
    this.rectangle2.y = rect2.y;
    this.rectangle2.angle = rect2.angle;
    this.rectangle2.alpha = 0;
    this.addChild(this.rectangle2);
    this.hitBoxRectangles.push(this.rectangle2);
  }
}
