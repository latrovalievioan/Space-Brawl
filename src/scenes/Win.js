import Assets from "../core/AssetManager";
import Scene from "./Scene";
import { Sprite, Text, filters, Graphics, TilingSprite } from "pixi.js";
import config from "../config";
import gsap from "gsap/all";
import { scaleXY } from "../core/utils";

export default class Win extends Scene {
  constructor() {
    super();
    this._stars = [];
    this._timeline = gsap.timeline();
    this._config = config.scenes.Win;
    this._createBackground();
    this._createTitle();
    this._createButton();
    this._createStars("star");
    this._animateIn();
  }
  static get events() {
    return {
      REPLAY: "replay",
    };
  }

  _createBackground() {
    this._background = new Sprite.from(Assets.images["play-scene"]);
    this._background.anchor.set(0.5);
    const blurFilter = new filters.BlurFilter();
    this._background.filters = [blurFilter];
    blurFilter.blur = this._config.backgroundBlur;
    this.addChild(this._background);
  }

  _createTitle() {
    if (localStorage.getItem("loser") === "blueBig") {
      this._title = new Sprite.from("redWins");
    } else if (localStorage.getItem("loser") === "redBig") {
      this._title = new Sprite.from("blueWins");
    }
    this._title.anchor.set(0.5);
    this.addChild(this._title);
  }

  _createButton() {
    this._button = new Sprite.from("replayButton");
    this._button.anchor.set(0.5);
    this._button.interactive = true;
    this._button.buttonMode = true;
    this._button.on("click", () => {
      this.emit(Win.events.REPLAY);
    });
    this._button.y = 330;
    this.addChild(this._button);
  }

  _createStars(image) {
    this._createStar(image, -350, -300, -25, 0.8);
    this._createStar(image, 350, -300, 25, 0.8);
    this._createStar(image, -430, 0, 30, 0.5);
    this._createStar(image, 430, 0, 30, 0.5);
  }

  _createStar(image, x, y, angle, scale) {
    const star = new Sprite.from(image);
    star.anchor.set(0.5);
    star.x = x;
    star.y = y;
    star.angle = angle;
    scaleXY(star, scale);
    this.addChild(star);
    this._stars.push(star);
  }

  _animateIn() {
    this._timeline
      .from(this._title.scale, {
        x: 0,
        y: 0,
        ease: "bounce",
        duration: 1,
      })
      .from(this._button, {
        y: -600,
        ease: "bounce",
        duration: 1,
      });
  }
}