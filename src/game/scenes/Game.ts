import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { CardTile } from '../game_objects/CardTile';
import { Manager } from '../engine/manager';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    endText: Phaser.GameObjects.Text;
    scoreText: Phaser.GameObjects.Text;

    manager: Manager;

    static EVENT_UPDATE_SCORE = 'update-score';

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.manager = new Manager();

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        // generate tiles
        this.addGameTiles();

        this.endText = this.add.text(512, 660, "End Game",  {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
        .setOrigin(0.5).setDepth(1);
        this.endText.setInteractive();
        this.endText.once('pointerdown', () => { this.startEndGameScene(); }, this);

        this.scoreText = this.add.text(950, 30, "" + this.manager.score,  {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
        .setOrigin(0.5).setDepth(1);

        EventBus.emit('current-scene-ready', this);

        this.registerEvent();
    }

    registerEvent(){

        EventBus.on(CardTile.EVENT_CHOOSEN, (card: CardTile) => {
            this.manager.addToBucket(card);
        })

        EventBus.on(Game.EVENT_UPDATE_SCORE, (manager: Manager) => {
            this.scoreText.setText(""+manager.score);
        });
    }
    

    startEndGameScene() {
        this.scene.start('GameOver');
    }

    addGameTiles() {

        const scale = 0.5;
        const gap = 16;
        const tile_width = 120;
        const tile_height = 80;
        const total_x = 12;
        const total_y = 8;
        
        const begin_x = ( ( tile_width * scale ) + ( 1024 - ( ( (tile_width * scale) + gap) * 12)  ) ) / 2;
        const begin_y = 80 + ( ( tile_height * scale ) / 2 );

        for ( let i = 0; i < total_x * total_y; i++) {
            new CardTile("" + i % (total_x * total_y / 2) , this, 
                begin_x +   ( ( i % total_x ) * ( ( tile_width * scale ) + gap ) ), 
                begin_y +  ( ( Math.floor( i / total_x) ) * ( ( tile_height * scale ) + gap ) ),
                scale  
            );
        }
    }

    // changeScene ()
    // {
    //     this.scene.start('GameOver');
    // }
}
