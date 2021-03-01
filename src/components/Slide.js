import { Container, Sprite } from "pixi.js";
import gsap from "gsap/all";

export default class Slide extends Container {
  constructor(keyImage, arrow = null, message) {
    super();
    this._keyImage = keyImage;
  }

  show() {
    this._createImage();
  }

  _createImage() {
    this._keyImage = new Sprite.from(this._keyImage);
    this._keyImage.anchor.set(0.5);
    this.addChild(this._keyImage);
  }
}
