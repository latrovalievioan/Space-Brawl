import gsap from "gsap/gsap-core";
import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";
import { random } from "../core/utils";
import Fire from "./Fire";
import MotionPathPlugin from "../../node_modules/gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

export default class Rocket extends Container {
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
  _createBody({ image, scale = 1, x = 0, y = 0, angle = 0 }) {
    this._body = new Sprite.from(image);
    this._body.anchor.set(0.5);
    scaleXY(this._body, scale);
    this._body.x = x;
    this._body.y = y;
    this._body.angle = angle;
    this.addChild(this._body);
  }
  _createFire({ scale, x, y, angle }) {
    this._fire = new Fire();
    scaleXY(this._fire, scale);
    this._fire.x = x;
    this._fire.y = y;
    this._fire.angle = angle;
    this._body.addChild(this._fire);
  }

  generatePoint1(x, y) {
    return {
      x: Math.round(random(this._body.x, x / 2)),
      y: Math.round(random(this._body.y - 600, 600)),
    };
  }

  generatePoint2(x, y) {
    return {
      x: Math.round(random(this._body.x + x, x)),
      y: Math.round(random(this._body.y, y)),
    };
  }

  _createHitBox() {
    this.hitBox = PIXI.Sprite.from(PIXI.Texture.WHITE);
    this.hitBox.width = 20;
    this.hitBox.height = 30;
    this.hitBox.tint = 0x000000;
    this.hitBox.anchor.set(0.5);
    this.hitBox.x = 0;
    this.hitBox.y = -3;
    this.hitBox.alpha = 0;
    this._body.addChild(this.hitBox);
  }

  animateRocket(onAnimationUpdate, targetPlanet) {
    let targetPoint = new PIXI.Point(0, 0);
    targetPoint = targetPlanet._rover._body.toLocal(targetPoint, this);
    if (targetPlanet.name === "redBig") {
      targetPoint.x = -targetPoint.x;
      targetPoint.y = -targetPoint.y;
    }

    this._tl.to(this._body, {
      motionPath: {
        path: [
          this.generatePoint1(targetPoint.x, targetPoint.y),
          this.generatePoint2(targetPoint.x, targetPoint.y),
          { x: targetPoint.x, y: targetPoint.y },
        ],
        align: this._body,
        autoRotate: 1.7,
        useRadians: true,
      },
      duration: 2,
      ease: "none",
      onUpdate: () => onAnimationUpdate(this._body),
    });
    return this._tl.play();
  }
}
