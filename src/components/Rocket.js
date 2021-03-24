import gsap from "gsap/gsap-core";
import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";
import { random } from "../core/utils";
import Fire from "./Fire";
import MotionPathPlugin from "../../node_modules/gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

/**
 * Represents a rocket that flies by randomly generated bezier path to its target.
 * @class
 */
export default class Rocket extends Container {
  /**
   * @param {{Object,Object}} Object - Config Objects.
   */
  constructor({ body, flame }) {
    super();
    this._tl = gsap.timeline();
    this._bodyConfig = body;
    this._flameConfig = flame;
    this._createBody(this._bodyConfig);
    this._createFire(this._flameConfig);
    this.sortableChildren = true;
    this._createHitBox();
  }

  /**
   * Draws the body of the rocket.
   * @param {{string, number,number,number,number}} Object
   * @method
   * @private
   */
  _createBody({ image, scale = 1, x = 0, y = 0, angle = 0 }) {
    this.body = new Sprite.from(image);
    this.body.anchor.set(0.5);
    scaleXY(this.body, scale);
    this.body.x = x;
    this.body.y = y;
    this.body.angle = angle;
    this.addChild(this.body);
  }
  /**
   * Draws the fire of the engine of the rocket.
   * @param {{number,number,number,number}} Object
   */
  _createFire({ scale, x, y, angle }) {
    this._fire = new Fire();
    scaleXY(this._fire, scale);
    this._fire.x = x;
    this._fire.y = y;
    this._fire.angle = angle;
    this.body.addChild(this._fire);
  }

  /**
   * Generates the first point of the bezier path of the rocket animation.
   * @param {number} x
   * @returns Object {x: number, y: number}
   * @method
   * @private
   */
  generatePoint1(x) {
    return {
      x: Math.round(random(this.body.x, x / 2)),
      y: Math.round(random(this.body.y - 600, 600)),
    };
  }

  /**
   * Generates the second point of the bezier path of the rocket animation.
   * @param {number} x
   * @param {number} y
   * @returns Object {x: number, y: number}
   * @method
   * @private
   */
  generatePoint2(x, y) {
    return {
      x: Math.round(random(this.body.x + x, x)),
      y: Math.round(random(this.body.y, y)),
    };
  }

  /**
   * Draws the hitbox of the rocket.
   * @method
   * @private
   */
  _createHitBox() {
    this.hitBox = PIXI.Sprite.from(PIXI.Texture.WHITE);
    this.hitBox.width = 20;
    this.hitBox.height = 30;
    this.hitBox.tint = 0x000000;
    this.hitBox.anchor.set(0.5);
    this.hitBox.x = 0;
    this.hitBox.y = -3;
    this.hitBox.alpha = 0;
    this.body.addChild(this.hitBox);
  }

  /**
   * Animates the rocket's flight.
   * @param {Function} onAnimationUpdate
   * @param {Object} targetPlanet
   * @returns Promise.
   * @method
   * @public
   */
  animateRocket(onAnimationUpdate, targetPlanet) {
    let targetPoint = new PIXI.Point(0, 0);
    targetPoint = targetPlanet._rover._body.toLocal(targetPoint, this);
    if (targetPlanet.name === "redBig") {
      targetPoint.x = -targetPoint.x;
      targetPoint.y = -targetPoint.y;
    }

    this._tl.to(this.body, {
      motionPath: {
        path: [
          this.generatePoint1(targetPoint.x, targetPoint.y),
          this.generatePoint2(targetPoint.x, targetPoint.y),
          { x: targetPoint.x, y: targetPoint.y },
        ],
        align: this.body,
        autoRotate: 1.7,
        useRadians: true,
      },
      duration: 2,
      ease: "none",
      onUpdate: () => onAnimationUpdate(this),
    });
    return this._tl.play();
  }
}
