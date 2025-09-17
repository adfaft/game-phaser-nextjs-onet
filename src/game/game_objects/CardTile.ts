export class CardTile {

    sprite: Phaser.GameObjects.GameObject | Phaser.GameObjects.Rectangle;
    text: Phaser.GameObjects.GameObject | Phaser.GameObjects.Text;

    constructor(name: string, scene: Phaser.Scene, 
        x: number, y: number, scale: number
    ) {        
        this.sprite = scene.add.rectangle(x, y, 120, 80, 0xFFFFFF, 0.0);

        this.sprite.setDataEnabled();
        this.sprite.setData(name, name);

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
    }
}