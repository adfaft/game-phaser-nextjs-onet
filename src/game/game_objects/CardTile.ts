import { v4 } from "uuid";
import { EventBus } from "../EventBus";

export class CardTile {

    static EVENT_CHOOSEN:string = 'game-tile-choosen';

    sprite: Phaser.GameObjects.GameObject | Phaser.GameObjects.Rectangle | null;
    text: Phaser.GameObjects.GameObject | Phaser.GameObjects.Text | null;

    constructor(name: string, scene: Phaser.Scene, 
        x: number, y: number, scale: number
    ) {        
        this.sprite = scene.add.rectangle(x, y, 120, 80, 0xFFFFFF, 0.0);

        this.sprite.once('destroy', this.onSpriteDestroyed, this);

        this.sprite.setInteractive();
        this.sprite.setDataEnabled();
        this.sprite.setData('name', name);
        this.sprite.setData('id', v4());

        this.text = scene.add.text(x, y, name, {
            fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });

        // untuk sementara
        if( "setFillStyle" in this.sprite ){
            const i = parseInt(name);
            const color = 0xFFFFFF / 48 * ( i % 48 );

            this.sprite.setFillStyle(color, 1.0);
            this.sprite.setScale(scale);
        }

        if( "setScale" in this.text ){
            this.text.setScale(scale);
        }

        // add events
        this.registerEvent();
    }

    registerEvent() {        
        if( this.sprite ) {
            this.sprite.off('pointerdown');
            this.sprite.on('pointerdown', () => {                
                EventBus.emit(CardTile.EVENT_CHOOSEN, this);
            }, this );
        }
    }

    destroy(){
        this.sprite?.destroy();
        this.text?.destroy();
    }

    onSpriteDestroyed () {
        this.sprite = null;
        this.text = null
    }

    getName(){
        return this.sprite?.getData('name');
    }

    setAlphaDown(){
        if( this.sprite && "setAlpha" in this.sprite  ){
            this.sprite.setAlpha(0.5);
        }
    }

    resetAlpha(){
        if( this.sprite && "setAlpha" in this.sprite  ){
            this.sprite.setAlpha(1);
        }
    }


}