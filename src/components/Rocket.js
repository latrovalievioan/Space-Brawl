import gsap from "gsap/gsap-core";
import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";
import { random } from "../core/utils";
import Fire from "./Fire";
import MotionPathPlugin from "../../node_modules/gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

export default class Rocket extends Container {
  constructor({ body, flame, paths }) {
    super();
    this._tl = gsap.timeline();
    this._bodyConfig = body;
    this._flameConfig = flame;
    this._path = paths[Math.floor(random(0, paths.length))];
    // this._path = paths[7]; // debugging only
    this._createBody(this._bodyConfig);
    this._createFire(this._flameConfig);
    this.sortableChildren = true;
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

  animateRocket(onAnimationUpdate, targetPlanet) {
    let point = new PIXI.Point(0, 0);
    point = targetPlanet._rover._body.toLocal(point, this);
    if (targetPlanet.name === "redBig") {
      point.x = -point.x;
      point.y = -point.y;
    }

    this._tl.to(this._body, {
      motionPath: {
        path: [{ x: point.x, y: point.y }],
        align: this._body,
        autoRotate: 1.7,
        useRadians: true,
      },
      duration: 1,
      ease: "none",
      onUpdate: () => onAnimationUpdate(this._body),
    });
    return this._tl.play();
  }
}
