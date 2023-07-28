import Difficulty from "../constants/Difficulty";
import SceneKeys from "../constants/SceneKeys";
import { TilePositions, TileSize } from "../constants/TileConstants";
import Tile from "../game/Tile";

type InitData = {
  difficulty: Difficulty;
};

export default class Game extends Phaser.Scene {
  private timerText!: Phaser.GameObjects.Text;
  private tiles!: Phaser.GameObjects.Group;
  public difficulty!: Difficulty;
  public emptyTileNum!: number;
  public emitter!: Phaser.Events.EventEmitter;

  constructor() {
    super(SceneKeys.Game);
  }

  preload() {}

  init(data: InitData) {
    this.difficulty = data.difficulty;
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    this.emptyTileNum = TilePositions[this.difficulty].length;
    this.timerText = this.add
      .text(width * 0.5, height * 0.1, "00:00", {
        fontSize: "132px",
        fontFamily: "Oswald",
      })
      .setOrigin(0.5);

    this.tiles = this.add.group();

    // make board out of tiles
    let positions: number[] = this.getRandomBoard();

    for (let i = 0; i < TilePositions[this.difficulty].length; i++) {
      const newX =
        TilePositions[this.difficulty][i].x * TileSize[this.difficulty] +
        width * 0.5;
      const newY =
        TilePositions[this.difficulty][i].y * TileSize[this.difficulty] +
        height * 0.5;
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
    this.updateTileStatus();
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
    const board = this.initBoard(this.emptyTileNum);
    for (let i = board.length - 1; i > 0; i--) {
      const j = Phaser.Math.Between(0, i);
      const temp = board[i];
      board[i] = board[j];
      board[j] = temp;
    }

    if (!this.isSolvable(board)) {
      // if the empty tile is not in the first two positions then swap
      if (board[0] != this.emptyTileNum && board[1] != this.emptyTileNum) {
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
    let numberOfInversions = 0;

    for (let i = 0; i < board.length - 1; i++) {
      if (board[i] !== this.emptyTileNum) {
        for (let j = i + 1; j < board.length; j++) {
          if (board[j] !== this.emptyTileNum && board[i] > board[j]) {
            numberOfInversions++;
          }
        }
      }
    }

    return numberOfInversions % 2 == 0;
  }

  private moveTile(tile: Tile) {
    if (tile.tileNum === this.emptyTileNum) {
      return;
    }

    const emptyTile: Tile = (this.tiles.getChildren() as Tile[]).find(
      (t) => t.tileNum === this.emptyTileNum,
    )!;

    const newPos = this.newPos(tile, emptyTile);
    // only move tile if emptyTile is perpendicular to it
    if (newPos !== Phaser.Math.Vector2.ZERO) {
      // swap position of tiles
      emptyTile.x = tile.x;
      emptyTile.y = tile.y;
      this.tweens.add({
        targets: tile,
        x: tile.x + TileSize[this.difficulty] * newPos.x,
        y: tile.y + TileSize[this.difficulty] * newPos.y,
        duration: 750,
        onComplete: this.handleWin,
        onCompleteParams: [this],
      });
    }
  }

  private newPos(tile: Tile, emptyTile: Tile): Phaser.Math.Vector2 {
    let diffPos = new Phaser.Math.Vector2(
      (emptyTile.x - tile.x) / TileSize[this.difficulty],
      (emptyTile.y - tile.y) / TileSize[this.difficulty],
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

    for (let i = 0; i < tiles.length; i++) {
      const newX =
        TilePositions[this.difficulty][tiles[i].tileNum - 1].x *
          TileSize[this.difficulty] +
        this.scale.width * 0.5;
      const newY =
        TilePositions[this.difficulty][tiles[i].tileNum - 1].y *
          TileSize[this.difficulty] +
        this.scale.height * 0.5;
      if (tiles[i].x === newX && tiles[i].y === newY) {
        tiles[i].correct();
      } else {
        tiles[i].incorrect();
      }
    }
  }

  private hasWon() {
    let tiles = this.tiles.getChildren() as Tile[];
    let won = true;

    for (let i = 0; i < tiles.length; i++) {
      const newX =
        TilePositions[this.difficulty][tiles[i].tileNum - 1].x *
          TileSize[this.difficulty] +
        this.scale.width * 0.5;
      const newY =
        TilePositions[this.difficulty][tiles[i].tileNum - 1].y *
          TileSize[this.difficulty] +
        this.scale.height * 0.5;
      if (tiles[i].x !== newX || tiles[i].y !== newY) {
        won = false;
      }
    }

    return won;
  }

  private handleWin(_tween: Phaser.Tweens.Tween, _target: any, scene: Game) {
    if (scene.hasWon()) {
      scene.scene.start(SceneKeys.Win, {
        completionTime: scene.formatTime(scene.time.now - scene.time.startTime),
      });
    }
  }

  private initBoard(size: number) {
    const newBoard = [];
    for (let i = 1; i <= size; i++) {
      newBoard.push(i);
    }

    return newBoard;
  }
}
