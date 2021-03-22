import Play from "./scenes/Play";
import Win from "./scenes/Win";
import Loading from "./scenes/Loading";
import Tutorial from "./scenes/Tutorial";
import Countdown from "./scenes/Countdown";
import { Container } from "pixi.js";
import fire from "./static/fire.json";
import Assets from "./core/AssetManager";
import explosion from "./static/explosion.json";

/**
 * Main game stage, manages scenes/levels.
 *
 * @extends {PIXI.Container}
 */
export default class Game extends Container {
  static get events() {
    return {
      SWITCH_SCENE: "switch_scene",
    };
  }

  /**
   * @param {PIXI.Sprite} background
   */
  constructor({ background } = {}) {
    super();

    this._background = background;
    this.currentScene = null;
  }
  async start() {
    await this.switchScene(Loading, { scene: "loading" });
    await this.currentScene.finish;
    // await Assets.prepareSpritesheets([
    //   { texture: "explosion", data: explosion },
    //   { texture: "fire", data: fire },
    // ]);
    // Assets.sounds.fight.play();
    // Assets.sounds.fight.loop(true);
    // await this.switchScene(Tutorial, { scene: "tutorial" });
    // await this.currentScene.finish;
    // await this.switchScene(Countdown, { scene: "cd" });
    // await this.currentScene.finish;
    // this.switchScene(Play, { scene: "play" });
    // this.setupSceneTransition();
  }

  setupSceneTransition() {
    this.currentScene.once(Play.events.GAME_OVER, () => {
      this.switchScene(Win, { scene: "win" });
      this.currentScene.once(Win.events.REPLAY, () => {
        this.switchScene(Play, { scene: "play" });
        this.setupSceneTransition();
      });
    });
  }

  /**
   * @param {Function} constructor
   * @param {String} scene
   */
  switchScene(constructor, scene) {
    this.removeChild(this.currentScene);
    this.currentScene = new constructor();
    this.currentScene.background = this._background;
    this.addChild(this.currentScene);

    this.emit(Game.events.SWITCH_SCENE, { scene });

    return this.currentScene.onCreated();
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    if (this.currentScene === null) return;

    this.currentScene.onResize(width, height);
  }
}
