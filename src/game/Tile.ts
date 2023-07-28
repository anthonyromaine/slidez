import TextureKeys from "../constants/TextureKeys";
import {
  TileFont,
  TileFontOffset,
  TileScale,
} from "../constants/TileConstants";
import Game from "../scenes/Game";

export default class Tile extends Phaser.GameObjects.Container {
  private tileSprite: Phaser.GameObjects.Sprite;
  private tileText: Phaser.GameObjects.Text;
  readonly tileNum: number;

  constructor(scene: Game, x: number, y: number, tileNum: number) {
    super(scene, x, y);
    this.tileNum = tileNum;
    this.tileSprite = this.scene.add
      .sprite(0, 0, TextureKeys.Tile)
      .setScale(TileScale[scene.difficulty]);

    this.tileText = scene.add
      .text(0, TileFontOffset[scene.difficulty], String(tileNum), {
        fontFamily: "Oswald",
        fontSize: TileFont[scene.difficulty],
        color: "#000000",
      })
      .setOrigin(0.5, 0.5);

    this.add(this.tileSprite);
    this.add(this.tileText);

    this.tileSprite.setInteractive();
    this.tileSprite.on("pointerdown", this.moveTile, this);

    if (tileNum === scene.emptyTileNum) {
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
    const scene = this.scene as Game;
    scene.emitter.emit("tilepressed", this);
  }
}
