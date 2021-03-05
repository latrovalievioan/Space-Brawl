import { Container, Graphics, Sprite } from "pixi.js";
import { scaleXY } from "../core/utils";
import Assets from "../core/AssetManager";

export default class Shield extends Container {
  constructor(
    { activePart, inactivePart, upperPart, lowerPart, hitBox },
    player
  ) {
    super();
    this._player = player;
    this._activePartConfig = activePart;
    this._inactivePartConfig = inactivePart;
    this._upperPartConfig = upperPart;
    this._lowerPartConfig = lowerPart;
    this._hitBoxConfig = hitBox;
    this.hitBoxRectangles = [];
    this._createHitBox(this._hitBoxConfig.upper);
    this._createActivePart(this._activePartConfig, this._upperPartConfig);
    this._createInactivePart(this._inactivePartConfig, this._lowerPartConfig);
    document.addEventListener("keydown", (e) => {
      this._eventHandler(e);
    });
  }
  _createActivePart({ image }, { scale = 0, x = 0, y = 0, angle = 0 }) {
    this._activePart = new Sprite.from(image);
    this._activePart.anchor.set(0.5);
    scaleXY(this._activePart, scale);
    this._activePart.x = x;
    this._activePart.y = y;
    this._activePart.angle = angle;
    this.addChild(this._activePart);
  }
  _createInactivePart({ image }, { scale = 0, x = 0, y = 0, angle = 0 }) {
    this._inactivePart = new Sprite.from(image);
    this._inactivePart.anchor.set(0.5);
    scaleXY(this._inactivePart, scale);
    this._inactivePart.x = x;
    this._inactivePart.y = y;
    this._inactivePart.angle = angle;
    this.addChild(this._inactivePart);
  }

  _eventHandler(e) {
    if (
      (e.key === "ArrowDown" &&
        this._activePart.x === this._upperPartConfig.x) ||
      // &&
      // this._player
      (e.key === "ArrowUp" && this._activePart.x === this._lowerPartConfig.x)
      // &&
      // this._player
    ) {
      Assets.sounds.shield.play();
      this._swapShield();
    }
  }
  _swapShield() {
    this._swapHitBoxes();
    [
      this._activePart.x,
      this._activePart.y,
      this._activePart.angle,
      this._inactivePart.x,
      this._inactivePart.y,
      this._inactivePart.angle,
    ] = [
      this._inactivePart.x,
      this._inactivePart.y,
      this._inactivePart.angle - 90,
      this._activePart.x,
      this._activePart.y,
      this._activePart.angle + 90,
    ];
  }

  _swapHitBoxes() {
    if (this.rectangle1.x === this._hitBoxConfig.upper.rect1.x) {
      [
        this.rectangle1.x,
        this.rectangle1.y,
        this.rectangle1.angle,
        this.rectangle2.x,
        this.rectangle2.y,
        this.rectangle2.angle,
      ] = [
        this._hitBoxConfig.lower.rect1.x,
        this._hitBoxConfig.lower.rect1.y,
        this._hitBoxConfig.lower.rect1.angle,
        this._hitBoxConfig.lower.rect2.x,
        this._hitBoxConfig.lower.rect2.y,
        this._hitBoxConfig.lower.rect2.angle,
      ];
    } else if (this.rectangle1.x === this._hitBoxConfig.lower.rect1.x) {
      [
        this.rectangle1.x,
        this.rectangle1.y,
        this.rectangle1.angle,
        this.rectangle2.x,
        this.rectangle2.y,
        this.rectangle2.angle,
      ] = [
        this._hitBoxConfig.upper.rect1.x,
        this._hitBoxConfig.upper.rect1.y,
        this._hitBoxConfig.upper.rect1.angle,
        this._hitBoxConfig.upper.rect2.x,
        this._hitBoxConfig.upper.rect2.y,
        this._hitBoxConfig.upper.rect2.angle,
      ];
    }
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
    this.addChild(this.rectangle2);
    this.hitBoxRectangles.push(this.rectangle2);
  }
}
