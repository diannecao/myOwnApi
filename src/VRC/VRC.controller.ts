import {Controller, Post, Body, Get, Param, Patch, Delete} from '@nestjs/common';
import { VRCService } from './VRC.service';
@Controller('VRC')
export class VRCController{
    constructor(private readonly VRCService: VRCService){

    }
    @Post()
    async addVRC(
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number,
        @Body('link') prodLink: string,
        ){
        
        const generatedId = await this.VRCService.insertVRC(
            prodTitle,
            prodDesc, 
            prodPrice,
            prodLink
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
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number,
        @Body('link') prodLink: string
        ) {
        await this.VRCService.updateVRC(prodId, prodTitle, prodDesc, prodPrice, prodLink)
        return null;
    }
    @Delete(':id')
    async removeVRC( @Param('id') prodId: string){
        await this.VRCService.deleteVRC(prodId);
        return null;

    }

}