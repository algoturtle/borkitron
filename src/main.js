import Phaser from "phaser";
import Game from "./scenes/game";
import GameOver from "./scenes/gameover";
/*
This is the main configuration file for the game.
*/
const config = {
  width: 800,
  height: 400,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  autoRound: false,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      //debug: true,
    },
  },
  scene: [Game, GameOver],
};

const game = new Phaser.Game(config);
