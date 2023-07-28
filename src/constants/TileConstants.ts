import Phaser from "phaser";
import Difficulty from "./Difficulty";

export const TileSize: Record<Difficulty, number> = {
  [Difficulty.Normal]: 160,
  [Difficulty.Hard]: 100,
};

export const TilePositions: Record<Difficulty, Phaser.Math.Vector2[]> = {
  [Difficulty.Normal]: [
    new Phaser.Math.Vector2(-1, -1),
    new Phaser.Math.Vector2(0, -1),
    new Phaser.Math.Vector2(1, -1),
    new Phaser.Math.Vector2(-1, 0),
    new Phaser.Math.Vector2(0, 0),
    new Phaser.Math.Vector2(1, 0),
    new Phaser.Math.Vector2(-1, 1),
    new Phaser.Math.Vector2(0, 1),
    new Phaser.Math.Vector2(1, 1),
  ],
  [Difficulty.Hard]: [
    new Phaser.Math.Vector2(-2, -2),
    new Phaser.Math.Vector2(-1, -2),
    new Phaser.Math.Vector2(0, -2),
    new Phaser.Math.Vector2(1, -2),
    new Phaser.Math.Vector2(2, -2),
    new Phaser.Math.Vector2(-2, -1),
    new Phaser.Math.Vector2(-1, -1),
    new Phaser.Math.Vector2(0, -1),
    new Phaser.Math.Vector2(1, -1),
    new Phaser.Math.Vector2(2, -1),
    new Phaser.Math.Vector2(-2, 0),
    new Phaser.Math.Vector2(-1, 0),
    new Phaser.Math.Vector2(0, 0),
    new Phaser.Math.Vector2(1, 0),
    new Phaser.Math.Vector2(2, 0),
    new Phaser.Math.Vector2(-2, 1),
    new Phaser.Math.Vector2(-1, 1),
    new Phaser.Math.Vector2(0, 1),
    new Phaser.Math.Vector2(1, 1),
    new Phaser.Math.Vector2(2, 1),
    new Phaser.Math.Vector2(-2, 2),
    new Phaser.Math.Vector2(-1, 2),
    new Phaser.Math.Vector2(0, 2),
    new Phaser.Math.Vector2(1, 2),
    new Phaser.Math.Vector2(2, 2),
  ],
};

export const TileScale: Record<Difficulty, number> = {
  [Difficulty.Normal]: 0.3,
  [Difficulty.Hard]: 0.5,
};

export const TileFont: Record<Difficulty, string> = {
  [Difficulty.Normal]: "96px",
  [Difficulty.Hard]: "72px",
};
