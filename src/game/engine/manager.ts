import { EventBus } from "../EventBus";
import { CardTile } from "../game_objects/CardTile";
import { Game } from "../scenes/Game";

export class Manager{

    bucket: CardTile[];
    score: number;

    constructor(){
        this.reset();
    }

    addToBucket(card: CardTile){

        card.setAlphaDown();
        console.log(card.sprite?.getData('id'));

        this.bucket.push(card);
        if( this.bucket.length == 2 ){
            this.processBucket();    
        }
    }

    processBucket(){
        
        if ( this.bucket[0].sprite && this.bucket[1].sprite ){
            if ( this.bucket[0].getName() === this.bucket[1].getName() ) {
                this.score++;

                this.bucket[0].destroy();
                this.bucket[1].destroy();
                
            }else{
                this.bucket[0].resetAlpha();
                this.bucket[1].resetAlpha();
            }            

            this.bucket = [];
            EventBus.emit(Game.EVENT_UPDATE_SCORE, this);
        }
    }

    reset(){
        this.bucket = [];
        this.score = 0;
    }
}

const new_manager = new Manager();

export const game_manager = new_manager;