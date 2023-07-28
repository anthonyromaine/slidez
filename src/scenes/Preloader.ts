import SceneKeys from "../constants/SceneKeys";
import TextureKeys from "../constants/TextureKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    this.load.image(TextureKeys.Tile, "game/Tile.png");
    this.load.image(TextureKeys.TileCorrect, "game/TileCorrect.png");
    this.load.image(TextureKeys.BlueButton, "game/BlueButton.png");
    this.load.image(
      TextureKeys.BlueOutlineButton,
      "game/BlueOutlineButton.png",
    );
    this.load.image(TextureKeys.GreenButton, "game/GreenButton.png");
    this.load.image(TextureKeys.OrangeButton, "game/OrangeButton.png");
    this.load.image(TextureKeys.UICard, "game/UICard.png");
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
