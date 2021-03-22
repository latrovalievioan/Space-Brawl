import Assets from "../core/AssetManager";
import Scene from "./Scene";
import { Sprite, Text, filters, Graphics } from "pixi.js";
import config from "../config";
import gsap from "gsap/all";

export default class Loading extends Scene {
  constructor() {
    super();
    this._config = config.scenes.Loading;
    this._createBackground();
    this._createLogo();
    this._createLoadingBar();
    this._createLoadMeter();
  }

  _createBackground() {
    this._background = new Sprite.from(Assets.images["play-scene"]);
    this._background.anchor.set(0.5);
    const blurFilter = new filters.BlurFilter();
    this._background.filters = [blurFilter];
    blurFilter.blur = this._config.backgroundBlur;
    this.addChild(this._background);
  }

  _createLogo() {
    this._logo = new Sprite.from(Assets.images.ooo);
    this._logo.anchor.set(0.5);
    this.addChild(this._logo);
  }

  _createLoadingBar() {
    this._loadingBar = new Graphics();
    this._loadingBar.lineStyle(2, 0xffffff, 1, 0);
    this._loadingBar.drawRoundedRect(
      this._config.loadingBar.x,
      this._config.loadingBar.y,
      this._config.loadingBar.width,
      this._config.loadingBar.height,
      this._config.loadingBar.radius
    );
    this._loadingBar.pivot.x = this._config.loadingBar.width / 2;
    this._loadingBar.pivot.y = this._config.loadingBar.height / 2;
    this._loadingBar.y = window.innerHeight / 6.5;
    this._loadingBar.endFill();
    this.addChild(this._loadingBar);
  }

  _createLoadMeter(val) {
    this._loadMeter = new Graphics();
    this._loadMeter.beginFill(0xffffff);
    this._loadMeter.drawRoundedRect(
      this._config.loadMeter.x,
      this._config.loadMeter.y,
      val,
      this._config.loadMeter.height,
      this._config.loadMeter.radius
    );
    this._loadMeter.pivot.y = this._config.loadMeter.height / 2;
    this._loadMeter.y = window.innerHeight / 6.5;
    this._loadMeter.endFill();
    this.addChild(this._loadMeter);
  }

  get finish() {
    return new Promise((res) => setTimeout(res, this._config.hideDelay));
  }

  preload() {
    const images = {
      planet1: Assets.images["planet-1"],
      planet2: Assets.images["planet-2"],
      planet3: Assets.images["planet-3"],
      planet4: Assets.images["planet-4"],
      playScene: Assets.images["play-scene"],
      rocket: Assets.images.rocket,
      rover: Assets.images.rover,
      health: Assets.images["rover-health-bar"],
      shadow: Assets.images["rover-shadow"],
      shieldActive: Assets.images["shield-active"],
      shieldInactive: Assets.images["shield-inactive"],
      star: Assets.images.star,
      wins: Assets.images.wins,
      player1: Assets.images["1"],
      player2: Assets.images["2"],
      arrow: Assets.images.arrow,
      defaultKey: Assets.images["key-default"],
      longKey: Assets.images["key-long"],
      healthMeter: Assets.images.healthMeter,
      fire: Assets.images.fire,
      explosion: Assets.images.explosion,
      redWins: Assets.images.redWins,
      blueWins: Assets.images.blueWins,
      replayButton: Assets.images.replayButton,
      countdownCircle: Assets.images.countdownCircle,
      countdownFill: Assets.images.countdownFill,
      one: Assets.images["1"],
      two: Assets.images["2"],
      three: Assets.images["3"],
      gameInstructions: Assets.images.gameInstructions,
      title: Assets.images.title,
      nextButton: Assets.images.nextButton,
      arrowInstructions: Assets.images.arrowInstructions,
      upArrow: Assets.images.upArrow,
      downArrow: Assets.images.downArrow,
      longButton: Assets.images["key-long"],
      spacebarInstructions: Assets.images.spacebarInstructions,
      playButton: Assets.images.playButton,
    };
    const sounds = {
      fight: Assets.sounds.fight,
      beep: Assets.sounds.beep,
      shootRight: Assets.sounds.shootRocketRight,
      shootLeft: Assets.sounds.shootRocketLeft,
      explosionL: Assets.sounds.explosionL,
      explosionR: Assets.sounds.explosionR,
      bounceR: Assets.sounds.bounceRight,
      bounceL: Assets.sounds.bounceLeft,
    };

    return super.preload({ images, sounds });
  }

  onResize(width, height) {
    // eslint-disable-line no-unused-vars
    // this.width = width;
    // this.height = height;
  }

  onLoadProgress(val) {
    this.removeChild(this._loadMeter);
    this._createLoadMeter((val / 100) * this._config.loadMeter.width);
  }
}
