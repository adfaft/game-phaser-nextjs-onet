import { game_manager } from '../engine/manager';
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText : Phaser.GameObjects.Text;
    playAgainText : Phaser.GameObjects.Text;
    backMenuText : Phaser.GameObjects.Text;

    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameOverText = this.add.text(512, 300, 'Total Score : ' + game_manager.score, {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
        

        // replay button
        this.playAgainText = this.add.text(250, 600, 'Play Again', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
        this.playAgainText.setInteractive();
        


        // main menu button
        this.backMenuText = this.add.text(780, 600, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
        this.backMenuText.setInteractive();
        
        
        this.registerEvent();

        EventBus.emit('current-scene-ready', this);
    }

    registerEvent(){

        this.playAgainText.once('pointerdown', () => { this.startGameScene(); }, this);
        this.backMenuText.once('pointerdown', () => { this.startMainMenuScene(); }, this);

    }

    startMainMenuScene() {
        this.scene.start("MainMenu");
    }

    startGameScene() {
        this.scene.start("Game");
    }

    // changeScene ()
    // {
    //     this.scene.start('MainMenu');
    // }
}
