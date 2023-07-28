import Phaser from "phaser";

import Preloader from "./scenes/Preloader";
import MainMenu from "./scenes/MainMenu";
import Game from "./scenes/Game";
import Win from "./scenes/Win";
import DifficultySelection from "./scenes/DifficultySelection";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 720,
  height: 1280,
  backgroundColor: "#35baf3",
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
  },
  autoCenter: Phaser.Scale.Center.CENTER_BOTH,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [Preloader, MainMenu, DifficultySelection, Game, Win],
};

export default new Phaser.Game(config);
