import TextureKeys from "../constants/TextureKeys";

export default class Tile extends Phaser.GameObjects.Container {
  static readonly SIZE: number = 160;
  private tileSprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, tileNum: number) {
    super(scene, x, y);

    this.tileSprite = this.scene.add
      .sprite(0, 0, TextureKeys.Tile)
      .setScale(0.5);

    const tileText = scene.add
      .text(0, -10, String(tileNum), {
        fontFamily: "Oswald",
        fontSize: "96px",
        // color: "#35baf3",
        color: "#000000",
      })
      .setOrigin(0.5, 0.5);

    this.add(this.tileSprite);
    this.add(tileText);

    if (tileNum === 9) {
      this.visible = false;
    }
  }

  preUpdate() {}
}
