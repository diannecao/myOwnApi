import {Controller, Post, Body, Get, Param, Patch, Delete} from '@nestjs/common';
import { VRCService } from './VRC.service';
@Controller('VRC')
export class VRCController{
    constructor(private readonly VRCService: VRCService){

    }
    @Post()
    async addVRC(
        @Body('title') prodTitle: string, 
        @Body('type') prodType: string,
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number,
        @Body('link') prodLink: string,
        @Body('image') prodImage: string
        ){
        
        const generatedId = await this.VRCService.insertVRC(
            prodTitle,
            prodType,
            prodDesc, 
            prodPrice,
            prodLink,
            prodImage
            );
        return {id: generatedId}; 
    }
    @Get()
    async getAllVRC(){
        const vrcs = await this.VRCService.getVRC();
        return vrcs;


    }
    @Get(':id')
    getVRC(@Param('id') prodId: string){
        return this.VRCService.getSingleVRC(prodId);

    }

   @Patch(':id')
    async updateVRC(
        @Param('id') prodId: string, 
        @Body('title') prodTitle: string, 
        @Body('type') prodType: string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number,
        @Body('link') prodLink: string,
        @Body('image') prodImage: string
        ) {
        await this.VRCService.updateVRC(prodId, prodTitle, prodType, prodDesc, prodPrice, prodLink, prodImage)
        return null;
    }
    @Delete(':id')
    async removeVRC( @Param('id') prodId: string){
        await this.VRCService.deleteVRC(prodId);
        return null;

    }

   @Get('type/electronics')
    async getAllE(){
        const electronics = await this.VRCService.getAllE();
        return electronics;
    }

    @Get('type/kit')
    async getAllKit(){
        const kits = await this.VRCService.getAllKit();
        return kits;
    }

    @Get('type/game')
    async getAllGame(){
        const games = await this.VRCService.getAllGame();
        return games;
    }

    @Get('type/motion')
    async getAllMotion(){
        const motions = await this.VRCService.getAllMotion();
        return motions;
    }
}