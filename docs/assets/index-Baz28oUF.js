import{P as t}from"./phaser-CmFXOKba.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const s of t)if("childList"===s.type)for(const t of s.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();class e extends Phaser.GameObjects.Sprite{constructor(t,e,s){super(t,e,s,"bork2"),this.setOrigin(.5),this.scene.add.existing(this),this.scene.physics.add.existing(this),this.body.setCollideWorldBounds(!0,0,1,!0),this.setScale(.75),this.invincible=!1,this.init()}init(){this.scene.time.delayedCall(2e3,(()=>this.body.setVelocity(0,500)),null,this),this.scene.anims.create({key:"bork2",frames:this.scene.anims.generateFrameNumbers("bork2",{start:0,end:2}),frameRate:6}),this.play({key:"bork2",repeat:-1})}damage(){this.invincible=!0,this.scene.time.delayedCall(500,(()=>{this.invincible=!1}),null,this)}}class s{constructor(t){this.scene=t,this.scene.time.delayedCall(2e3,(()=>this.init()),null,this),this.generateStars()}init(){this.generateViking()}generateStars(){this.scene.stars&&new i(this.scene),this.scene.time.delayedCall(Phaser.Math.Between(10,30),(()=>this.generateStars()),null,this)}generateViking(){const t=(this.scene.score<0||Math.floor(this.scene.score/5)%2==0?-1:1)<0?788:12,e=Phaser.Math.Between(32,this.scene.height-32);this.scene.vikings.add(new h(this.scene,t,e)),this.scene.time.delayedCall(this.scene.easy?800:600,(()=>{this.generateViking()}),null,this)}}class i extends Phaser.GameObjects.Rectangle{constructor(t,e,s){super(t,e||Phaser.Math.Between(0,t.height),s||Phaser.Math.Between(0,t.height),2,2,16777215),t.add.existing(this),this.init()}init(){this.scene.tweens.add({targets:this,x:{from:800,to:0},duration:2e3/this.scale,onComplete:()=>{this.destroy()}})}}class h extends Phaser.GameObjects.Sprite{constructor(t,e,s){super(t,e,s,"viking"),t.add.existing(this),t.physics.add.existing(this),this.body.setAllowGravity(!1),this.setScale(.6),this.init()}init(){this.scene.time.delayedCall(700,(()=>this.animate()),null,this)}animate(){if(!this.scene)return;const t=this.x<this.scene.width/2?12:788,e=this.x<this.scene.width/2?788:12;this.scene.tweens.add({targets:this,x:{from:t,to:e},duration:1290,onComplete:()=>{this.destroy()}}),this.scene.tweens.add({targets:this,angle:{from:t,to:e},duration:3e3,onComplete:null})}}Phaser.GameObjects.Rectangle;class a extends Phaser.Scene{constructor(){super({key:"game"}),this.player=null,this.score=-2,this.scoreText=null,this.lives=3,this.livesText=null,this.movingLeft=!1,this.movingRight=!1,this.pointerDown=!1,this.extraLife=!1,this.easy=!1,this.stars=!0,this.velocityX=0}init(t){this.name=t.name,this.number=t.number}preload(){this.registry.set("score",0),this.load.bitmapFont("arcade","assets/fonts/arcade.png","assets/fonts/arcade.xml"),this.load.spritesheet("bork2","./assets/images/bork2.png",{frameWidth:64,frameHeight:72}),this.load.spritesheet("viking","./assets/images/viking.png",{frameWidth:70,frameHeight:70}),this.score=-2,this.lives=3,this.extraLife=!1,this.easy=!1,this.stars=!0}create(){this.width=this.sys.game.config.width,this.height=this.sys.game.config.height,this.center_width=this.width/2,this.center_height=this.height/2,this.cameras.main.setBackgroundColor(0),this.vikings=this.add.group(),this.pointers=this.add.group(),this.generator=new s(this),this.LEFT=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),this.RIGHT=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),this.A=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),this.D=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),this.M=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),this.H=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H),this.S=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),this.player=new e(this,this.center_width,this.center_height),this.scoreText=this.add.bitmapText(this.width/16,this.height/16,"arcade","Score: "+this.score,15),this.livesText=this.add.bitmapText(this.width-this.width/8,this.height/16,"arcade","Lives: "+this.lives,15),this.physics.world.on("worldbounds",((t,e,s,i,h)=>{const{gameObject:a}=t;e?a.setFlipY(!1):s&&a.setFlipY(!0)})),this.physics.add.overlap(this.player,this.vikings,this.hitObstacle,(()=>!0),this),this.updateScoreEvent=this.time.addEvent({delay:1e3,callback:()=>this.updateScore(),callbackScope:this,loop:!0})}hitObstacle(t,e){this.player.invincible||(this.player.damage(),this.cameras.main.shake(250,.05),this.updateLives(),this.lives<=0&&(this.extraLife||(this.updateScoreEvent.destroy(),this.finishScene()),this.extraLife=!1))}update(){Phaser.Input.Keyboard.JustDown(this.M)&&(this.easy=!this.easy),Phaser.Input.Keyboard.JustDown(this.H)&&(this.extraLife=!0),Phaser.Input.Keyboard.JustDown(this.S)&&(this.stars=!this.stars);const t=Phaser.Input.Keyboard.JustDown(this.LEFT)||Phaser.Input.Keyboard.JustDown(this.A),e=Phaser.Input.Keyboard.JustUp(this.LEFT)||Phaser.Input.Keyboard.JustUp(this.A),s=Phaser.Input.Keyboard.JustDown(this.RIGHT)||Phaser.Input.Keyboard.JustDown(this.D),i=Phaser.Input.Keyboard.JustUp(this.RIGHT)||Phaser.Input.Keyboard.JustUp(this.D);this.input.activePointer.isDown?(this.input.activePointer.x>this.center_width&&(this.pointerRight=!0,this.pointerLeft=!1,this.velocityX=500,this.player.setFlipX(!1)),this.input.activePointer.x<this.center_width&&(this.pointerRight=!1,this.pointerLeft=!0,this.velocityX=-500,this.player.setFlipX(!0))):(this.pointerRight=!1,this.pointerLeft=!1,this.movingLeft||this.movingRight||(this.velocityX=0)),s&&this.moveRight(),t&&this.moveLeft(),i&&(this.movingRight=!1,this.movingLeft?this.moveLeft():this.stopX()),e&&(this.movingLeft=!1,this.movingRight?this.moveRight():this.stopX()),this.player.body.setVelocityX(this.velocityX)}moveRight(){this.movingRight=!0,this.velocityX=500,this.player.setFlipX(!1)}moveLeft(){this.movingLeft=!0,this.velocityX=-500,this.player.setFlipX(!0)}stopX(){this.pointerRight=!1,this.pointerLeft=!1,this.movingRight=!1,this.movingLeft=!1,this.velocityX=0}finishScene(){this.stopX(),this.registry.set("score",this.score),this.scene.start("gameover")}updateScore(t=1){this.score+=t,this.scoreText.setText("Score: "+this.score)}updateLives(t=1){this.lives-=t,this.livesText.setText("Lives: "+this.lives)}}class r extends Phaser.Scene{constructor(){super({key:"gameover"})}create(){this.width=this.sys.game.config.width,this.height=this.sys.game.config.height,this.center_width=this.width/2,this.center_height=this.height/2,this.cameras.main.setBackgroundColor(0),this.add.bitmapText(this.center_width,100,"arcade",this.registry.get("score"),25).setOrigin(.5),this.add.bitmapText(this.center_width,this.center_height,"arcade","GAME OVER",45).setOrigin(.5),this.add.bitmapText(this.center_width,250,"arcade","Press SPACE or Click to restart!",15).setOrigin(.5),this.input.keyboard.on("keydown-SPACE",this.startGame,this),this.input.on("pointerdown",(t=>this.startGame()),this)}showLine(t,e){let s=this.introLayer.add(this.add.bitmapText(this.center_width,e,"pixelFont",t,25).setOrigin(.5).setAlpha(0));this.tweens.add({targets:s,duration:2e3,alpha:1})}startGame(){this.scene.start("game")}}const n={width:800,height:400,scale:{mode:t.Scale.FIT,autoCenter:t.Scale.CENTER_BOTH},autoRound:!1,parent:"game-container",physics:{default:"arcade",arcade:{gravity:{y:0}}},scene:[a,r]};new t.Game(n);
