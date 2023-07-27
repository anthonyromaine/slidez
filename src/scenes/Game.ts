import SceneKeys from "../constants/SceneKeys";
import TilePositions from "../constants/TilePositions";
import Tile from "../game/Tile";

export default class Game extends Phaser.Scene {
  private timerText!: Phaser.GameObjects.Text;
  private tiles!: Phaser.GameObjects.Group;

  public emitter!: Phaser.Events.EventEmitter;

  constructor() {
    super(SceneKeys.Game);
  }

  preload() {}

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    this.timerText = this.add
      .text(width * 0.5, height * 0.1, "00:00", {
        fontSize: "132px",
        fontFamily: "Oswald",
      })
      .setOrigin(0.5);

    this.tiles = this.add.group();

    // make board out of tiles
    let positions: number[] = this.getRandomBoard();

    for (let i = 0; i < TilePositions.length; i++) {
      const newX = TilePositions[i].x * Tile.SIZE + width * 0.5;
      const newY = TilePositions[i].y * Tile.SIZE + height * 0.5;
      const newTile = new Tile(this, newX, newY, positions[i]);

      this.add.existing(newTile);
      this.tiles.add(newTile);
    }

    this.emitter = new Phaser.Events.EventEmitter();

    this.emitter.on("tilepressed", this.moveTile, this);
  }

  private updateTimer(time: number) {
    this.timerText.text = this.formatTime(time);
  }

  update(time: number, _delta: number): void {
    this.updateTimer(time - this.time.startTime);
    const hasWon = this.updateTileStatus();

    console.log(hasWon);
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

  private getRandomBoard() {
    const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const emptyTile = 9;
    for (let i = board.length - 1; i > 0; i--) {
      const j = Phaser.Math.Between(0, i);
      const temp = board[i];
      board[i] = board[j];
      board[j] = temp;
    }

    if (!this.isSolvable(board)) {
      // if the empty tile is not in the first two positions then swap
      if (board[0] != emptyTile && board[1] != emptyTile) {
        const temp = board[0];
        board[0] = board[1];
        board[1] = temp;
      } else {
        // else swap the last two positions
        const temp = board[board.length - 2];
        board[board.length - 2] = board[board.length - 1];
        board[board.length - 1] = temp;
      }
    }

    return board;
  }

  private isSolvable(board: number[]) {
    const emptyTile = 9;
    let numberOfInversions = 0;

    for (let i = 0; i < board.length - 1; i++) {
      if (board[i] !== emptyTile) {
        for (let j = i + 1; j < board.length; j++) {
          if (board[j] !== emptyTile && board[i] > board[j]) {
            numberOfInversions++;
          }
        }
      }
    }

    return numberOfInversions % 2 == 0;
  }

  private moveTile(tile: Tile) {
    if (tile.tileNum === 9) {
      return;
    }

    const emptyTile: Tile = (this.tiles.getChildren() as Tile[]).find(
      (t) => t.tileNum === 9,
    )!;

    const newPos = this.newPos(tile, emptyTile);
    // only move tile if emptyTile is perpendicular to it
    if (newPos !== Phaser.Math.Vector2.ZERO) {
      // swap position of tiles
      emptyTile.x = tile.x;
      emptyTile.y = tile.y;
      this.tweens.add({
        targets: tile,
        x: tile.x + Tile.SIZE * newPos.x,
        y: tile.y + Tile.SIZE * newPos.y,
        duration: 750,
      });
    }
  }

  private newPos(tile: Tile, emptyTile: Tile): Phaser.Math.Vector2 {
    let diffPos = new Phaser.Math.Vector2(
      (emptyTile.x - tile.x) / Tile.SIZE,
      (emptyTile.y - tile.y) / Tile.SIZE,
    );

    const { RIGHT, LEFT, DOWN, UP, ZERO } = Phaser.Math.Vector2;

    if (diffPos.x === RIGHT.x && diffPos.y === RIGHT.y) {
      return RIGHT;
    } else if (diffPos.x === LEFT.x && diffPos.y === LEFT.y) {
      return LEFT;
    } else if (diffPos.x === DOWN.x && diffPos.y === DOWN.y) {
      return DOWN;
    } else if (diffPos.x === UP.x && diffPos.y === UP.y) {
      return UP;
    } else {
      return ZERO;
    }
  }

  private updateTileStatus() {
    let tiles = this.tiles.getChildren() as Tile[];
    let hasWon = true;

    for (let i = 0; i < tiles.length; i++) {
      const newX =
        TilePositions[tiles[i].tileNum - 1].x * Tile.SIZE +
        this.scale.width * 0.5;
      const newY =
        TilePositions[tiles[i].tileNum - 1].y * Tile.SIZE +
        this.scale.height * 0.5;
      if (tiles[i].x === newX && tiles[i].y === newY) {
        tiles[i].correct();
      } else {
        tiles[i].incorrect();
        hasWon = false;
      }
    }

    return hasWon;
  }
}
