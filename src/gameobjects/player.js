class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "zerker");
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.collideWorldBounds = true;
    this.body.setBounce(0, 1);
    this.body.setVelocity(0, 500);
    this.setScale(0.75);
    this.invincible = false;
  }
}

export default Player;
