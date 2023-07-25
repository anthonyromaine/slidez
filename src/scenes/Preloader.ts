import SceneKeys from "../constants/SceneKeys";
import TextureKeys from "../constants/TextureKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    this.load.image(TextureKeys.Tile, "Tile.png");
    this.load.image(TextureKeys.TileCorrect, "TileCorrect.png");
    this.load.image(TextureKeys.BlueButton, "BlueButton.png");
  }

  create() {
    this.scene.start(SceneKeys.MainMenu);
  }
}
