import TextureKeys from "../constants/TextureKeys";
import Game from "../scenes/Game";

export default class Tile extends Phaser.GameObjects.Container {
  static readonly SIZE: number = 160;
  private tileSprite: Phaser.GameObjects.Sprite;
  private tileText: Phaser.GameObjects.Text;
  readonly tileNum: number;

  constructor(scene: Phaser.Scene, x: number, y: number, tileNum: number) {
    super(scene, x, y);
    this.tileNum = tileNum;
    this.tileSprite = this.scene.add
      .sprite(0, 0, TextureKeys.Tile)
      .setScale(0.5);

    this.tileText = scene.add
      .text(0, -10, String(tileNum), {
        fontFamily: "Oswald",
        fontSize: "96px",
        // color: "#35baf3",
        color: "#000000",
      })
      .setOrigin(0.5, 0.5);

    this.add(this.tileSprite);
    this.add(this.tileText);

    this.tileSprite.setInteractive();
    this.tileSprite.on("pointerdown", this.moveTile, this);

    if (tileNum === 9) {
      this.visible = false;
    }
  }

  preUpdate() {}

  correct() {
    this.tileSprite.setTexture(TextureKeys.TileCorrect);
    this.tileText.setColor("#73CD4B");
  }

  incorrect() {
    this.tileSprite.setTexture(TextureKeys.Tile);
    this.tileText.setColor("#000000");
  }

  moveTile() {
    this.scene.emitter.emit("tilepressed", this);
  }
}
