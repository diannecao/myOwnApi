import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Games } from './Games.model'
import { GamesModule } from './Games.module';

@Injectable()
export class GamesService{
    private Games: Games[] = [];

    constructor(@InjectModel('Games') private readonly GamesModel: Model<Games>){

    }

    async insertGames(title: string, year: number, games :string, image: string){
       // const prodId = Math.random().toString();
        const newGames = new this.GamesModel({
            title, 
            year,
            game: games, 
            image,
        });
        const result = await newGames.save();
        console.log(result);
        return result.id as string;
    }
    async getGames(){
        
        const Games = await this.GamesModel.find().exec( );
        //console.log(result);
        return Games.map((prod)=> ({
            id: prod.id, 
            title: prod.title, 
            year: prod.year, 
            games: prod.game,
            image: prod.image

        }));

    }

    async getSingleGames(GamesId: string){
        const Games = await this.findGames(GamesId);
        return {id: Games.id, 
        title: Games.title,
        year: Games.year,
        games: Games.game,
        image: Games.image
    }; 
    } 

   async updateGames(GamesId: string, title: string, year: number, games: string, image: string){
        
        const updatedGames = await this.findGames(GamesId);
        

        console.log(title)
        if( title){
            updatedGames.title = title;

        }
        if( year){
            updatedGames.year = year;

        }
        if( games){
            updatedGames.game = games;

        }
        if( image){
            updatedGames.image = image;

        }
        updatedGames.save();
        
         
    }
    async deleteGames(prodId: string){
      const result = await this.GamesModel.deleteOne({_id: prodId}).exec();
      if(result.deletedCount === 0){
        throw new NotFoundException('Could not find game 222');  
      }
    }
    private async findGames(id: string): Promise<Games> {
        let Games;

        try{
            Games = await this.GamesModel.findById(id).exec();

        }catch(error){
            throw new NotFoundException('Could not find game error 222');  

        }
       
        // const productIndex = this.products.findIndex((prod) => prod.id == id);
        // const product= this.products[productIndex];
        if(!Games){
            throw new NotFoundException('Could not find product not found');  
        }
        return Games; 
    }

    
}