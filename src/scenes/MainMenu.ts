import SceneKeys from "../constants/SceneKeys";
import TextureKeys from "../constants/TextureKeys";
export default class MainMenu extends Phaser.Scene {
  private startButton!: Phaser.GameObjects.Image;

  constructor() {
    super(SceneKeys.MainMenu);
  }

  preload() {}

  create() {
    this.startButton = this.add
      .image(
        this.scale.width * 0.5,
        this.scale.height * 0.55,
        TextureKeys.BlueButton,
      )
      .setScale(0.4, 0.4)
      .setOrigin(0.5);

    // create button text
    this.add
      .text(this.scale.width * 0.5, this.scale.height * 0.545, "START", {
        fontSize: "72px",
        fontFamily: "Oswald",
      })
      .setOrigin(0.5);

    // create title text
    this.add
      .text(this.scale.width * 0.5, this.scale.height * 0.24, "SLIDEZ", {
        fontSize: "164px",
        fontFamily: "Semplicita",
        color: "#0c3e54",
      })
      .setOrigin(0.5);

    this.startButton.setInteractive();
    this.startButton.on("pointerdown", () => {
      this.scene.start(SceneKeys.Game);
    });
  }
}
