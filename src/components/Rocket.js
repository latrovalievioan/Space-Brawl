import gsap from "gsap/gsap-core";
import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";
import MotionPathPlugin from "../../node_modules/gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

export default class Rocket extends Container {
  constructor({ body, flame }) {
    super();
    // this._paths = [Assets.images.path1];
    this._bodyConfig = body;
    this._flameConfig = flame;
    this._createBody(this._bodyConfig);
    this._animateRocket();
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
  _animateRocket() {
    gsap.to(this._body, {
      motionPath: {
        path: "M1021,113 L1,1",
        align: this._body,
      },
      duration: 10,
      ease: "easeNone",
    });
  }
}
