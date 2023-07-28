import SceneKeys from "../constants/SceneKeys";
import TextureKeys from "../constants/TextureKeys";

type InitData = {
  completionTime: string;
};

export default class Win extends Phaser.Scene {
  private completionTime!: string;
  constructor() {
    super(SceneKeys.Win);
  }

  init(data: InitData) {
    this.completionTime = data.completionTime;
  }

  create() {
    const { width, height } = this.scale;

    // background card
    this.add.image(width * 0.5, height * 0.5, TextureKeys.UICard).setScale(0.4);

    // Win Text
    this.add
      .text(width * 0.5, height * 0.37, "YOU WIN!", {
        fontFamily: "Oswald",
        fontSize: "132px",
        color: "#000000",
      })
      .setOrigin(0.5, 0.5);

    // Completion Time Text
    this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.5,
        this.completionTime,
        {
          fontFamily: "Oswald",
          fontSize: "128px",
          color: "#73CD4B",
        },
      )
      .setOrigin(0.5, 0.5);

    // Add Play Again button and text
    const playAgainButton = this.add
      .image(width * 0.5, height * 0.64, TextureKeys.BlueButton)
      .setScale(0.4, 0.4);
    this.add
      .text(width * 0.5, height * 0.635, "PLAY AGAIN", {
        fontSize: "72px",
        fontFamily: "Oswald",
      })
      .setOrigin(0.5, 0.5);

    playAgainButton.setInteractive();
    // add listener and event to restart the game
    playAgainButton.on(
      "pointerdown",
      () => {
        this.scene.start(SceneKeys.MainMenu);
      },
      this,
    );
  }
}
