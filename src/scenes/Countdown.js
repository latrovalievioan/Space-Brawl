import { Rectangle, Sprite } from "pixi.js";
import Scene from "./Scene";
import config from "../config";
import Planet from "../components/Planet";
import { scaleXY } from "../core/utils";
import Assets from "../core/AssetManager";
import Rocket from "../components/Rocket";
import { random, detectCollision } from "../core/utils";
import gsap from "gsap/all";

export default class Play extends Scene {
  async onCreated() {
    this._createBackground();
    this._createPlanets();
    this._createCountdownCircle();
    this._createNumbers();
    this._animate();
  }

  _createBackground() {
    this._background = new Sprite.from("playScene");
    this._background.anchor.set(0.5);
    scaleXY(this._background, config.backgroundImage.scale);
    this.addChild(this._background);
  }

  _createPlanets() {
    this._blueBigPlanet = new Planet(config.planets.blueBig, "blueBig");
    this.addChild(this._blueBigPlanet);
    this._redBigPlanet = new Planet(config.planets.redBig, "redBig");
    this.addChild(this._redBigPlanet);
    this.addChild(new Planet(config.planets.smallBlue, "blueSmall"));
    this.addChild(new Planet(config.planets.smallRed, "redSmall"));
  }

  _createCountdownCircle() {
    this._outerCircle = new Sprite.from("countdownCircle");
    this._innerCircle = new Sprite.from("countdownFill");
    this._outerCircle.anchor.set(0.5);
    this._innerCircle.anchor.set(0.5);
    this._innerCircle.scale.y = 1.1;
    this._outerCircle.alpha = 0;
    this._innerCircle.alpha = 0;
    this.addChild(this._outerCircle);
    this.addChild(this._innerCircle);
  }

  _createNumbers() {
    this._1 = new Sprite.from("one");
    this._1.anchor.set(0.5);
    this._1.alpha = 0;
    this.addChild(this._1);
    this._2 = new Sprite.from("two");
    this._2.anchor.set(0.5);
    this._2.alpha = 0;
    this.addChild(this._2);
    this._3 = new Sprite.from("tree");
    this._3.anchor.set(0.5);
    this._3.alpha = 0;
    this.addChild(this._3);
  }

  _animate() {
    this._timeline = gsap.timeline();
    this._timeline
      .to([this._outerCircle, this._innerCircle], {
        alpha: 1,
        duration: 1,
        ease: "none",
      })
      .set(this._3, {
        alpha: 1,
      })
      .call(() => Assets.sounds.beep.play())
      .from(this._3.scale, {
        x: 0,
        y: 0,
        ease: "bounce",
        duration: 1,
      })
      .to(this._3, {
        alpha: 0,
        duration: 0.5,
      })
      .set(this._2, {
        alpha: 1,
      })
      .call(() => Assets.sounds.beep.play())
      .from(this._2.scale, {
        x: 0,
        y: 0,
        ease: "bounce",
        duration: 1,
      })
      .to(this._2, {
        alpha: 0,
        duration: 0.5,
      })
      .set(this._1, {
        alpha: 1,
      })
      .call(() => Assets.sounds.beep.play())
      .from(this._1.scale, {
        x: 0,
        y: 0,
        ease: "bounce",
        duration: 1,
      })
      .to(this._1, {
        alpha: 0,
        duration: 0.5,
      })
      .to([this._outerCircle.scale, this._innerCircle.scale], {
        x: 0,
        y: 0,
      });
  }

  get finish() {
    return this._timeline.play();
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    // eslint-disable-line no-unused-vars
  }
}
