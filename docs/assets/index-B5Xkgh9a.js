import{P as t}from"./phaser-CmFXOKba.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const s of t)if("childList"===s.type)for(const t of s.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();class e extends Phaser.GameObjects.Sprite{constructor(t,e,s){super(t,e,s,"player"),this.setOrigin(.5,.5),this.scene.add.existing(this),this.scene.physics.add.existing(this),this.setScale(.75),this.invincible=!1}init(){this.body.setSize(this.width/2,.75*this.height,!0),this.scene.time.delayedCall(5e3,(()=>this.body.setVelocity(0,500)),null,this),this.scene.time.delayedCall(3e3,(()=>this.body.setCollideWorldBounds(!0,0,1,!0)),null,this),this.scene.tweens.add({targets:this,x:{from:0,to:this.scene.width/2},duration:3e3,onComplete:null}),this.scene.anims.create({key:"player",frames:this.scene.anims.generateFrameNumbers("player",{start:0,end:2}),frameRate:6}),this.play({key:"player",repeat:-1})}damage(){this.invincible=!0,this.scene.tweens.add({targets:this,angle:{from:0,to:720},duration:500,onComplete:null}),this.scene.time.delayedCall(500,(()=>{this.invincible=!1}),null,this)}spin(){this.scene.tweens.add({targets:this,angle:{from:0,to:720},duration:2e3,repeat:-1,onComplete:null})}}class s{constructor(t){this.scene=t,this.scene.time.delayedCall(5e3,(()=>this.init()),null,this),this.generateStars(),this.generateBounds(),this.generateArrows()}init(){this.generateEnemy()}generateStars(){this.scene.stars&&new i(this.scene),this.scene.time.delayedCall(Phaser.Math.Between(10,30),(()=>this.generateStars()),null,this)}generateBounds(){new h(this.scene,1200,this.scene.worldTop),new h(this.scene,1200,this.scene.worldBottom)}generateArrows(){const t=this.scene.width,e=this.scene.height;new a(this.scene,t-t/8,e-e/5),new a(this.scene,t/8,e-e/5).setFlipX(!0)}generateEnemy(){const t=(this.scene.score<0||Math.floor(this.scene.score/5)%2==0?-1:1)<0?779:21;this.scene.enemies.add(new r(this.scene,t,Phaser.Math.Between(this.scene.worldTop+30,this.scene.worldBottom-30))),this.scene.time.delayedCall(Math.max((this.scene.easy?1e3:800)-5*this.scene.score,400),(()=>{this.generateEnemy()}),null,this)}}class i extends Phaser.GameObjects.Rectangle{constructor(t,e,s){super(t,800,s||Phaser.Math.Between(t.worldTop,t.worldBottom),2,2,16777215),t.add.existing(this),this.init()}init(){this.setAlpha(1),this.scene.tweens.add({targets:this,x:{from:this.scene.width+1,to:-1},duration:2e3/this.scale,onComplete:()=>{this.destroy()}}),this.scene.tweens.add({targets:this,duration:Phaser.Math.Between(400,1e3),delay:0,alpha:.25,repeat:-1,yoyo:!0})}}class h extends Phaser.GameObjects.Rectangle{constructor(t,e,s){super(t,e,s,800,2,16777215),t.add.existing(this),this.init()}init(){this.scene.tweens.add({targets:this,x:{from:1200,to:400},duration:2e3/this.scale,onComplete:null}),this.scene.tweens.add({targets:this,duration:400,delay:0,alpha:0,repeat:-1,yoyo:!0})}}class a extends Phaser.GameObjects.Sprite{constructor(t,e,s){super(t,e,s,"arrow"),this.setOrigin(.5,.5),this.scene.add.existing(this),this.setScale(1.5)}}class r extends Phaser.GameObjects.Sprite{constructor(t,e,s){super(t,e,s,"enemy"),this.setOrigin(.5),t.add.existing(this),t.physics.add.existing(this),this.body.setAllowGravity(!1),this.setScale(.6),this.leftPause=this.displayWidth/2,this.rightPause=t.width-this.leftPause,this.direction=e<t.center_width?1:-1,this.start=this.direction>0?this.leftPause:this.rightPause,this.end=this.direction>0?this.rightPause:this.leftPause,this.init()}init(){this.body.setSize(.75*this.width,.75*this.height,!0),this.scene.tweens.add({targets:this,x:{from:this.start-this.direction*this.displayWidth,to:this.start},duration:100,onComplete:null}),this.scene.time.delayedCall(700,(()=>this.animate()),null,this)}animate(){this.scene&&(this.scene.tweens.add({targets:this,x:{from:this.start,to:this.end},duration:1290,onComplete:()=>{this.destroy()}}),this.scene.tweens.add({targets:this,angle:{from:0,to:1e3*this.direction},duration:3e3,onComplete:null}))}}class n extends Phaser.Scene{constructor(){super({key:"game"}),this.player=null,this.score=-5,this.scoreText=null,this.lives=3,this.livesText=null,this.movingLeft=!1,this.movingRight=!1,this.pointerDown=!1,this.stars=!0,this.velocityX=0,this.extraLife=!1,this.easy=!1}init(t){this.name=t.name,this.number=t.number}preload(){this.registry.set("score",0),this.load.bitmapFont("arcade","assets/fonts/arcade.png","assets/fonts/arcade.xml"),this.load.spritesheet("player","./assets/images/player.png",{frameWidth:64,frameHeight:72}),this.load.spritesheet("enemy","./assets/images/enemy.png",{frameWidth:70,frameHeight:70}),this.load.spritesheet("arrow","./assets/images/arrow.png",{frameWidth:62,frameHeight:65}),this.score=-5,this.lives=3,this.stars=!0,this.hardStars=!0,this.velocityX=0,this.movingLeft=!1,this.movingRight=!1,this.pointerDown=!1}create(){this.width=this.sys.game.config.width,this.height=this.sys.game.config.height,this.center_width=this.width/2,this.center_height=this.height/2,this.worldTop=this.width/16,this.worldBottom=this.width/2,this.cameras.main.setBackgroundColor(0),this.physics.world.setBounds(0,this.worldTop,this.width,this.worldBottom-this.worldTop,!0,!0,!0,!0),this.enemies=this.add.group(),this.pointers=this.add.group(),this.generator=new s(this),this.LEFT=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),this.RIGHT=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),this.A=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),this.D=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),this.S=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),this.player=new e(this,this.center_width,250),this.player.init(),this.scoreText=this.add.bitmapText(this.width/8,25,"arcade","Score: 0",15).setOrigin(.5),this.livesText=this.add.bitmapText(this.width-this.width/8,25,"arcade","Lives: "+this.lives,15).setOrigin(.5),this.add.bitmapText(this.center_width,25,"arcade","The Gravitron",40).setOrigin(.5),this.timerText=this.add.bitmapText(this.center_width,this.height/5*4,"arcade",-this.score,50).setOrigin(.5),this.message=this.add.bitmapText(this.center_width,this.height/16*10,"arcade","Avoid the enemies!",25).setOrigin(.5),this.subMessage=this.add.bitmapText(this.center_width,this.height/16*11,"arcade","controls: LEFT, RIGHT, A, D",15).setOrigin(.5),this.physics.world.on("worldbounds",((t,e,s,i,h)=>{(e||s)&&t.gameObject.toggleFlipY()})),this.physics.add.overlap(this.player,this.enemies,this.hitObstacle,(()=>!0),this),this.updateScoreEvent=this.time.addEvent({delay:1e3,callback:()=>this.updateScore(),callbackScope:this,loop:!0})}hitObstacle(t,e){this.player.invincible||(this.player.damage(),this.cameras.main.shake(250,.025),this.updateLives(),2===this.lives&&this.message.setText("I said AVOID the enemies!"),1===this.lives&&this.message.setText("last chance!"),this.lives<=0&&(this.extraLife||(this.updateScoreEvent.destroy(),this.finishScene()),this.message.setText("I'll let you have one more"),this.extraLife=!1))}update(){Phaser.Input.Keyboard.JustDown(this.S)&&(this.stars=!this.stars);const t=Phaser.Input.Keyboard.JustDown(this.LEFT)||Phaser.Input.Keyboard.JustDown(this.A),e=Phaser.Input.Keyboard.JustUp(this.LEFT)||Phaser.Input.Keyboard.JustUp(this.A),s=Phaser.Input.Keyboard.JustDown(this.RIGHT)||Phaser.Input.Keyboard.JustDown(this.D),i=Phaser.Input.Keyboard.JustUp(this.RIGHT)||Phaser.Input.Keyboard.JustUp(this.D);this.input.activePointer.isDown?(this.input.activePointer.x>this.center_width&&(this.pointerRight=!0,this.pointerLeft=!1,this.velocityX=500,this.player.setFlipX(!1)),this.input.activePointer.x<this.center_width&&(this.pointerRight=!1,this.pointerLeft=!0,this.velocityX=-500,this.player.setFlipX(!0))):(this.pointerRight=!1,this.pointerLeft=!1,this.movingLeft||this.movingRight||(this.velocityX=0)),s&&this.moveRight(),t&&this.moveLeft(),i&&(this.movingRight=!1,this.movingLeft?this.moveLeft():this.stopX()),e&&(this.movingLeft=!1,this.movingRight?this.moveRight():this.stopX()),this.player.body.setVelocityX(this.velocityX)}moveRight(){this.movingRight=!0,this.velocityX=500,this.player.setFlipX(!1)}moveLeft(){this.movingLeft=!0,this.velocityX=-500,this.player.setFlipX(!0)}stopX(){this.pointerRight=!1,this.pointerLeft=!1,this.movingRight=!1,this.movingLeft=!1,this.velocityX=0}finishScene(){this.stopX(),this.registry.set("score",this.score),this.scene.start("gameover")}updateScore(){switch(this.score++,this.score){case 5:this.message.setText("WATCH OUT! ON THE LEFT!");break;case 10:this.message.setText("we're just getting started");break;case 20:this.message.setText("is this getting faster?");break;case 30:this.message.setText("YOU WIN!");break;case 32:this.message.setText("jk, it never ends...");break;case 34:this.message.setText("it just gets harder and harder");break;case 45:this.message.setText("how long can you last?");break;case 80:this.message.setText("are you cheating?")}this.score<0?this.timerText.setText(-this.score):(this.timerText.setText(null),this.scoreText.setText("Score: "+this.score))}updateLives(t=1){this.lives-=t,this.livesText.setText("Lives: "+this.lives)}}class o extends Phaser.Scene{constructor(){super({key:"gameover"}),this.retryable=!0}create(){this.width=this.sys.game.config.width,this.height=this.sys.game.config.height,this.center_width=this.width/2,this.center_height=this.height/2,this.cameras.main.setBackgroundColor(0),this.player=new e(this,this.center_width,this.height/8*3),this.player.spin(),this.add.bitmapText(this.center_width,this.height/4,"arcade","Score: "+this.registry.get("score"),25).setOrigin(.5),this.add.bitmapText(this.center_width,this.center_height,"arcade","GAME OVER",45).setOrigin(.5),this.retryable&&this.time.delayedCall(1e3,(()=>this.showRestart()),null,this)}startGame(){this.player.destroy(),this.scene.start("game")}showRestart(){const t=this.add.bitmapText(this.center_width,this.height/4*3,"arcade","Press SPACE or Click to restart!",15).setOrigin(.5).setAlpha(0);this.tweens.add({targets:t,duration:500,delay:0,alpha:1,repeat:-1,yoyo:!0}),this.input.keyboard.on("keydown-SPACE",this.startGame,this),this.input.on("pointerdown",(t=>this.startGame()),this)}}const d={width:800,height:800,scale:{mode:t.Scale.FIT,autoCenter:t.Scale.CENTER_BOTH},autoRound:!1,parent:"game-container",physics:{default:"arcade",arcade:{gravity:{y:0},fps:300,debug:!1}},scene:[n,o]};new t.Game(d);
