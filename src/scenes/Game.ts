import SceneKeys from "../constants/SceneKeys";

export default class Game extends Phaser.Scene {
  private timerText!: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKeys.Game);
  }

  preload() {}

  create() {
    this.timerText = this.add
      .text(this.scale.width * 0.5, this.scale.height * 0.1, "00:00", {
        fontSize: "132px",
        fontFamily: "Oswald",
      })
      .setOrigin(0.5);

    console.log(this.time.scene);
  }

  private updateTimer(time: number) {
    this.timerText.text = this.formatTime(time);
  }

  update(time: number, delta: number): void {
    this.updateTimer(time - this.time.startTime);
  }

  private formatTime(ms: number) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    // const hours = Math.floor((ms / 1000 / 60 / 60) % 24);

    return [
      //   hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  }
}
