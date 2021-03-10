import gsap from "gsap/gsap-core";
import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";
import { random } from "../core/utils";
import MotionPathPlugin from "../../node_modules/gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

export default class Rocket extends Container {
  constructor({ body, flame, paths }) {
    super();
    this._bodyConfig = body;
    this._flameConfig = flame;
    this._path = paths[Math.floor(random(0, paths.length))];
    // this._path = paths[7]; // debugging only
    this._createBody(this._bodyConfig);
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

  animateRocket(onAnimationUpdate) {
    this._tl = gsap.timeline();
    this._tl.to(this._body, {
      motionPath: {
        path: this._path[0],
        align: this._body,
        autoRotate: 1.7,
        useRadians: true,
      },
      duration: this._path[2],
      ease: "none",
      onUpdate: () => onAnimationUpdate(this._body),
    });

    return this._tl.play();
  }
}
