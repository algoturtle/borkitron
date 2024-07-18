import Player from "../gameobjects/player";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "gameover" });
    this.retryable = true
  }

  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.cameras.main.setBackgroundColor(0x000000);
    this.player = new Player(this, this.center_width, this.height / 8 * 3);
    this.player.spin();

    this.add
      .bitmapText(
        this.center_width,
        this.height / 4,
        "arcade",
        "Score: " + this.registry.get("score"),
        25
      )
      .setOrigin(0.5);
    this.add
      .bitmapText(
        this.center_width,
        this.center_height,
        "arcade",
        "GAME OVER",
        45
      )
      .setOrigin(0.5);

    if (this.retryable) {
      this.time.delayedCall(1000, () => this.showRestart(), null, this);
    }
  }

  startGame() {
    this.player.destroy();
    this.scene.start("game");
  }

  showRestart() {
    const restartText = this.add
      .bitmapText(
        this.center_width,
        this.height / 4 * 3,
        "arcade",
        "Press SPACE or Click to restart!",
        15
      )
      .setOrigin(0.5)
      .setAlpha(0);

    this.tweens.add({
      targets: restartText,
      duration: 500,
      delay: 0,
      alpha: 1,
      repeat: -1,
      yoyo: true,
    });

    this.input.keyboard.on("keydown-SPACE", this.startGame, this);
    this.input.on("pointerdown", (pointer) => this.startGame(), this);
  }
}
