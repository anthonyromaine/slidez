import SceneKeys from "../constants/SceneKeys";
import TextureKeys from "../constants/TextureKeys";
export default class MainMenu extends Phaser.Scene {
  constructor() {
    super(SceneKeys.MainMenu);
  }

  preload() {}

  create() {
    this.add
      .image(
        this.scale.width * 0.5,
        this.scale.height * 0.5,
        TextureKeys.BlueButton,
      )
      .setScale(0.5, 0.5);
  }
}
