import gsap from "gsap/gsap-core";
import { Container, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";
import MotionPathPlugin from "../../node_modules/gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

export default class Rocket extends Container {
  constructor({ body, flame }) {
    super();
    this._paths = ["M1 1L1021 113"];
    this._bodyConfig = body;
    this._flameConfig = flame;
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        this._createBody(this._bodyConfig);
        this._animateRocket();
      }
    });
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
    this._tl = gsap.timeline();
    this._tl.to(this._body, {
      motionPath: {
        path: this._paths[0],
        align: this._body,
        // autoRotate: true,
      },
      duration: 2,
      ease: "none",
    });
    // this._tl.pause();
    this._tl.reverse(3);

    // this._tl.play();
  }
}
