import { Container, Sprite } from "pixi.js";
import gsap from "gsap/all";
import Scene from "./Scene";

export default class Tutorial extends Scene {
  constructor() {
    super();
    this._createBackground();
  }

  _createBackground() {
    this._background = new Sprite.from("playScene");
    this._background.anchor.set(0.5);
    this.addChild(this._background);
  }
}
