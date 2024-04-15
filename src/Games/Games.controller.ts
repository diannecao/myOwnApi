import {Controller, Post, Body, Get, Param, Patch, Delete} from '@nestjs/common';
import { GamesService } from './Games.service';
@Controller('Games')
export class GamesController{
    constructor(private readonly GamesService: GamesService){

    }
    @Post()
    async addGames(
        @Body('title') prodTitle: string, 
        @Body('year') prodYear: number,
        @Body('game') prodGame: string,
        @Body('image') prodImage: string,
        
        
        ){
        
        const generatedId = await this.GamesService.insertGames(
            prodTitle,
            prodYear,
            prodGame,
            prodImage
            );
        return {id: generatedId}; 
    }
    @Get()
    async getAllGames(){
        const games = await this.GamesService.getGames();
        return games;


    }
    @Get(':id')
    getGames(@Param('id') prodId: string){
        return this.GamesService.getSingleGames(prodId);

    }

   @Patch(':id')
    async updateGames(
        @Param('id') prodId: string, 
        @Body('title') prodTitle: string, 
        @Body('year') prodYear: number, 
        @Body('game') prodGame: string, 
        @Body('image') prodImage: string
        ) {
        await this.GamesService.updateGames(prodId, prodTitle, prodYear, prodGame, prodImage)
        return null;
    }
    @Delete(':id')
    async removeGames( @Param('id') prodId: string){
        await this.GamesService.deleteGames(prodId);
        return null;

    }

}