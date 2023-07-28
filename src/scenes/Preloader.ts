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
    this.load.image(TextureKeys.BlueOutlineButton, "BlueOutlineButton.png");
    this.load.image(TextureKeys.GreenButton, "GreenButton.png");
    this.load.image(TextureKeys.UICard, "UICard.png");
    this.add.text(0, 0, "A", {
      font: "1px Oswald",
    });
    this.add.text(0, 0, "A", {
      font: "1px Semplicita",
    });
  }

  create() {
    this.scene.start(SceneKeys.MainMenu);
  }
}
