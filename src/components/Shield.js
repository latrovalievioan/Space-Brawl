import { Container, Graphics, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";
import Assets from "../core/AssetManager";
import gsap from "gsap/all";

export default class Shield extends Container {
  constructor({ activePart, inactivePart, upperPart, lowerPart, hitBox }) {
    super();
    this._upperPartConfig = upperPart;
    this._lowerPartConfig = lowerPart;
    this._hitBoxConfig = hitBox;
    this.hitBoxRectangles = [];
    this._createHitBox(this._hitBoxConfig.upper);
    this._activePart = this._createShieldParts(activePart, upperPart);
    this._inactivePart = this._createShieldParts(inactivePart, lowerPart);
  }

  _createShieldParts({ image }, { scale, x, y, angle }) {
    const shieldPart = new Sprite.from(image);
    shieldPart.anchor.set(0.5);
    scaleXY(shieldPart, scale);
    shieldPart.x = x;
    shieldPart.y = y;
    shieldPart.angle = angle;
    this.addChild(shieldPart);
    return shieldPart;
  }

  _shieldSwapHandler({ key }) {
    if (
      (key === "ArrowDown" && this._activePart.x === this._upperPartConfig.x) ||
      (key === "ArrowUp" && this._activePart.x === this._lowerPartConfig.x)
    ) {
      Assets.sounds.shield.play();
      this._swapShield();
    }
  }
  _swapShield() {
    const active = this._activePart;
    const inactive = this._inactivePart;
    this._tl = gsap.timeline();
    this._tl
      .to(active, {
        x: inactive.x,
        y: inactive.y,
        angle: inactive.angle - 90,
        duration: 0.3,
        onComplete: this._swapHitBoxes(),
      })
      .to(
        inactive,
        {
          x: active.x,
          y: active.y,
          angle: active.angle + 90,
          duration: 0.3,
        },
        "<"
      );
    // [
    //   active.x,
    //   active.y,
    //   active.angle,
    //   inactive.x,
    //   inactive.y,
    //   inactive.angle,
    // ] = [
    //   inactive.x,
    //   inactive.y,
    //   inactive.angle - 90,
    //   active.x,
    //   active.y,
    //   active.angle + 90,
    // ];
  }

  _swapHitBoxes() {
    const { lower, upper } = this._hitBoxConfig;
    const { rect1, rect2 } =
      this.rectangle1.x === upper.rect1.x ? lower : upper;
    [
      this.rectangle1.x,
      this.rectangle1.y,
      this.rectangle1.angle,
      this.rectangle2.x,
      this.rectangle2.y,
      this.rectangle2.angle,
    ] = [rect1.x, rect1.y, rect1.angle, rect2.x, rect2.y, rect2.angle];
  }

  _createHitBox({ rect1, rect2 }) {
    this.rectangle1 = PIXI.Sprite.from(PIXI.Texture.WHITE);
    this.rectangle1.width = rect1.width;
    this.rectangle1.height = rect1.height;
    this.rectangle1.tint = 0xff0000;
    this.rectangle1.anchor.set(0.5);
    this.rectangle1.x = rect1.x;
    this.rectangle1.y = rect1.y;
    this.rectangle1.angle = rect1.angle;
    this.rectangle1.alpha = 0;
    this.addChild(this.rectangle1);
    this.hitBoxRectangles.push(this.rectangle1);
    this.rectangle2 = PIXI.Sprite.from(PIXI.Texture.WHITE);
    this.rectangle2.width = rect2.width;
    this.rectangle2.height = rect2.height;
    this.rectangle2.tint = 0xffff00;
    this.rectangle2.anchor.set(0.5);
    this.rectangle2.x = rect2.x;
    this.rectangle2.y = rect2.y;
    this.rectangle2.angle = rect2.angle;
    this.rectangle2.alpha = 0;
    this.addChild(this.rectangle2);
    this.hitBoxRectangles.push(this.rectangle2);
  }
}
