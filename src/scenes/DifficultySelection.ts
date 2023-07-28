import Difficulty from "../constants/Difficulty";
import SceneKeys from "../constants/SceneKeys";
import TextureKeys from "../constants/TextureKeys";

export default class DifficultySelection extends Phaser.Scene {
  constructor() {
    super(SceneKeys.DifficultySelection);
  }

  create() {
    const { width, height } = this.scale;

    // normal button
    const normalButton = this.add
      .image(width * 0.5, height * 0.45, TextureKeys.GreenButton)
      .setScale(0.4, 0.4)
      .setInteractive();
    this.add
      .text(width * 0.5, height * 0.445, Difficulty.Normal, {
        fontSize: "72px",
        fontFamily: "Oswald",
      })
      .setOrigin(0.5, 0.5);

    // hard button
    const hardButton = this.add
      .image(width * 0.5, height * 0.6, TextureKeys.OrangeButton)
      .setScale(0.4, 0.4)
      .setInteractive();
    this.add
      .text(width * 0.5, height * 0.595, Difficulty.Hard, {
        fontSize: "72px",
        fontFamily: "Oswald",
      })
      .setOrigin(0.5, 0.5);

    normalButton.on("pointerdown", () => {
      this.scene.start(SceneKeys.Game, { difficulty: Difficulty.Normal });
    });

    hardButton.on("pointerdown", () => {
      this.scene.start(SceneKeys.Game, { difficulty: Difficulty.Hard });
    });
  }
}
