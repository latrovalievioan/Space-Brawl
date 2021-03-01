import { Container, Sprite } from "pixi.js";
import gsap from "gsap/all";
import Scene from "./Scene";
import Slide from "../components/Slide";

export default class Tutorial extends Scene {
  constructor() {
    super();
    this._slides = [];
    this._createBackground();
    this._createSlides();
    this.addChild(this._slides[0]);
  }

  _createBackground() {
    this._background = new Sprite.from("playScene");
    this._background.anchor.set(0.5);
    this.addChild(this._background);
  }
  _createSlides() {
    const slide0 = new Slide("defaultKey", "arrow", "Hello");
    slide0.show();
    this._slides.push(slide0);
  }
}
