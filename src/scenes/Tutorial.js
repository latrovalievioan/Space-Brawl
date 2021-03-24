import { Sprite, filters } from "pixi.js";
import gsap from "gsap/all";
import Scene from "./Scene";
import config from "../config";
import { scaleXY } from "../core/utils";

/**
 * Represents the Tutorial scene. Explains the rules of the game.
 * @class
 */
export default class Tutorial extends Scene {
  constructor() {
    super();
    this.name = "tutorial";
    this._config = config.scenes.Tutorial;
    this._timeline = gsap.timeline();
    this._createBackground();
    this._createTitle(this._config.title);
    this._createGameInstructions();
    this._createNextButton(this._config.button);
    this._animateGameInstruction(this._config);
    this._createArrowInstructions(this._config.arrowInstructions);
    this._createArrows(this._config.arrows);
    this._createSpacebar();
    this._createSpacebarInstructions(this._config.arrowInstructions);
    this._createPlayButton(this._config.button);
  }

  static get events() {
    return {
      finish: "finish",
    };
  }

  /**
   * Draws the background of the scene.
   * @method
   * @private
   */
  _createBackground() {
    const background = new Sprite.from("playScene");
    background.anchor.set(0.5);
    const blurFilter = new filters.BlurFilter();
    background.filters = [blurFilter];
    blurFilter.blur = this._config.backgroundBlur;
    this.addChild(background);
  }

  /**
   * Draws the game instructions (first slide of the tutorial).
   * @method
   * @private
   */
  _createGameInstructions() {
    this._gameInstructions = new Sprite.from("gameInstructions");
    this._gameInstructions.anchor.set(0.5);
    this._gameInstructions.alpha = 0;
    this.addChild(this._gameInstructions);
  }

  /**
   * Draws the title of the game.
   * @param {{number}} Object - Config.
   * @method
   * @private
   */
  _createTitle({ scale }) {
    this._title = new Sprite.from("title");
    const title = this._title;
    title.anchor.set(0.5);
    title.y = -600;
    scaleXY(title, scale);
    this.addChild(this._title);
  }

  /**
   * Draws the "next" button.
   * @method
   * @private
   */
  _createNextButton() {
    this._nextButton = new Sprite.from("nextButton");
    this._nextButton.name = "nextButton";
    const button = this._nextButton;
    button.anchor.set(0.5);
    button.y = window.innerHeight;
    button.interactive = true;
    button.buttonMode = true;
    this.addChild(button);
    button.once("click", () => {
      this._animateButtonInstructions(this._config);
      button.once("click", async () => {
        await this._animateSpacebarInstructions(this._config);
      });
    });
  }

  /**
   * Draws the "play" button.
   * @param {{number}} Object - Config.
   * @method
   * @private
   */
  _createPlayButton({ y }) {
    this._playButton = new Sprite.from("playButton");
    this._playButton.name = "playButton";
    const button = this._playButton;
    button.anchor.set(0.5);
    button.y = y;
    button.x = window.innerWidth;
    button.interactive = true;
    button.buttonMode = true;
    this.addChild(button);
    button.once("click", async () => {
      await this._animateOut();
      this.emit(Tutorial.events.finish);
    });
  }

  /**
   * Draws the arrow instructions (second slide of the tutorial).
   * @param {{number}} Object - Config.
   * @method
   * @private
   */
  _createArrowInstructions({ y }) {
    this._arrowInstructions = new Sprite.from("arrowInstructions");
    const instructions = this._arrowInstructions;
    instructions.anchor.set(0.5);
    instructions.y = y;
    instructions.x = this._arrowInstructions.x;
    instructions.alpha = 0;
    this.addChild(instructions);
  }

  /**
   * Draws the arrow images.
   * @param {{Object, Object}} Object - Config.
   * @method
   * @private
   */
  _createArrows({ up, down }) {
    this._upArrow = new Sprite.from("upArrow");
    const upArrow = this._upArrow;
    upArrow.anchor.set(0.5);
    upArrow.x = -window.innerWidth;
    upArrow.y = up.y;
    scaleXY(upArrow, up.scale);
    this._downArrow = new Sprite.from("downArrow");
    const downArrow = this._downArrow;
    downArrow.anchor.set(0.5);
    downArrow.x = window.innerWidth;
    downArrow.y = down.y;
    scaleXY(downArrow, down.scale);
    this.addChild(upArrow);
    this.addChild(downArrow);
  }

  /**
   * Draws the spacebar image.
   * @method
   * @private
   */
  _createSpacebar() {
    this._spacebar = new Sprite.from("longButton");
    const spacebar = this._spacebar;
    spacebar.anchor.set(0.5);
    spacebar.x = window.innerWidth;
    this.addChild(spacebar);
  }

  /**
   * Draws the spacebar instructions (last slide of the tutorial).
   * @param {{number}} Object - Config.
   */
  _createSpacebarInstructions({ y }) {
    this._spacebarInstructions = new Sprite.from("spacebarInstructions");
    const spacebarInstructions = this._spacebarInstructions;
    spacebarInstructions.anchor.set(0.5);
    spacebarInstructions.y = y;
    spacebarInstructions.x = -window.innerWidth;
    this.addChild(spacebarInstructions);
  }

  /**
   * Animates the first slide of the tutorial.
   * @param {{Object, Object}} Object - Config.
   * @method
   * @private
   */
  _animateGameInstruction({ title: titleConfig, button: buttonConfig }) {
    const tl = this._timeline;
    const title = this._title;
    const next = this._nextButton;
    const gameInstructions = this._gameInstructions;

    tl.to(title, {
      y: titleConfig.y,
      ease: "bounce",
      duration: 2,
    })
      .to(
        gameInstructions,
        {
          duration: 2,
          alpha: 1,
        },
        "<"
      )
      .to(
        next,
        {
          y: buttonConfig.y,
          ease: "bounce",
          duration: 2,
        },
        "<"
      );
  }

  /**
   * Animates the second slide of the tutorial.
   * @param {{Object, Object}} Object - Config.
   * @method
   * @private
   */
  _animateButtonInstructions({
    arrows: { up: upArrowConfig, down: downArrowConfig },
  }) {
    const tl = this._timeline;
    const gameInstructions = this._gameInstructions;
    const arrowInstructions = this._arrowInstructions;
    const upArrow = this._upArrow;
    const downArrow = this._downArrow;
    tl.to(gameInstructions, {
      alpha: 0,
      duration: 1.4,
    })
      .to(
        arrowInstructions,
        {
          alpha: 1,
          duration: 2,
        },
        "-=0.5"
      )
      .to(
        upArrow,
        {
          x: upArrowConfig.x,
          duration: 2,
          ease: "bounce",
        },
        "-=1.5"
      )
      .to(
        downArrow,
        {
          x: downArrowConfig.x,
          duration: 2,
          ease: "bounce",
        },
        "<"
      );
  }

  /**
   * Animates the third slide of the tutorial.
   * @param {{Object}} Object - Config.
   * @method
   * @private
   */
  _animateSpacebarInstructions({ arrowInstructions: instructionsConfig }) {
    const tl = this._timeline;
    const arrowInstructions = this._arrowInstructions;
    const upArrow = this._upArrow;
    const downArrow = this._downArrow;
    const spacebarButton = this._spacebar;
    const instructions = this._spacebarInstructions;
    const next = this._nextButton;
    const playButton = this._playButton;
    tl.to(arrowInstructions, {
      alpha: 0,
      duration: 1.4,
    })
      .to(
        next,
        {
          alpha: 0,
          duration: 0.7,
        },
        "<"
      )
      .to(
        upArrow,
        {
          alpha: 0,
          duration: 0.7,
        },
        "-=0.5"
      )
      .to(
        downArrow,
        {
          alpha: 0,
          duration: 0.7,
        },
        "<"
      )
      .to(instructions, {
        x: instructionsConfig.x,
        ease: "bounce",
        duration: 1,
      })
      .to(
        spacebarButton,
        {
          x: 0,
          ease: "bounce",
          duration: 2,
        },
        "-=1.5"
      )
      .to(
        playButton,
        {
          x: 0,
          ease: "bounce",
          duration: 2,
        },
        "-=1"
      );
  }

  /**
   * Animates out the last slide of the tutorial scene.
   * @returns Promise
   * @method
   * @private
   */
  _animateOut() {
    const spacebarButton = this._spacebar;
    const instructions = this._spacebarInstructions;
    const playButton = this._playButton;
    const title = this._title;
    const tl = this._timeline;
    tl.to(title, {
      y: -window.innerHeight,
      ease: "Elastic.easeIn",
      duration: 2.5,
    })
      .to(
        playButton,
        {
          y: window.innerHeight,
          ease: "Elastic.easeIn",
          duration: 2.5,
        },
        "<"
      )
      .to(
        instructions,
        {
          x: window.innerWidth,
          ease: "Elastic.easeIn",
          duration: 2.5,
        },
        "<"
      )
      .to(
        spacebarButton,
        {
          x: -window.innerWidth,
          ease: "Elastic.easeIn",
          duration: 2.5,
        },
        "<"
      );
    return tl.play();
  }
}
