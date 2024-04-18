import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { VRC } from './VRC.model'
import { VRCModule } from './VRC.module';

@Injectable()
export class VRCService{
    private VRC: VRC[] = [];

    constructor(@InjectModel('VRC') private readonly VRCModel: Model<VRC>){

    }
    async getAllMotion(){
        const motions = await this.VRCModel.find().exec();
        const motion = motions.filter((e)=> e.type === "motion");
        return motion.map(c => ({ id: c.id, 
            type: c.type,
            title: c.title,
            price: c.price,
            description: c.description, 
            link: c.link, 
            image: c.image 
        }));
    }

    async getAllGame(){
        const games = await this.VRCModel.find().exec();
        const game = games.filter((e)=> e.type === "game");
        return game.map(c => ({ id: c.id, 
            type: c.type,
            title: c.title,
            price: c.price,
            description: c.description, 
            link: c.link, 
            image: c.image 
        }));
    }

    async getAllKit(){
        const kits = await this.VRCModel.find().exec();
        const kit = kits.filter((e)=> e.type === "kit");
        return kit.map(c => ({ id: c.id, 
            type: c.type,
            title: c.title,
            price: c.price,
            description: c.description, 
            link: c.link, 
            image: c.image 
        }));
    }

    async getAllE(){
        const electronics = await this.VRCModel.find().exec();
        const elec = electronics.filter((e)=> e.type === "electronics");
        return elec.map(c => ({ id: c.id, 
            type: c.type,
            title: c.title,
            price: c.price,
            description: c.description, 
            link: c.link, 
            image: c.image 
        }));
    }

    async insertVRC(title: string, type: string, desc :string,  price: number, link: string, image: string){
       // const prodId = Math.random().toString();
        const newVRC = new this.VRCModel({
            title, 
            type,
            description: desc, 
            price,
            link,
            image,
        });
        const result = await newVRC.save();
        console.log(result);
        return result.id as string;
    }
    async getVRC(){
        
        const VRC = await this.VRCModel.find().exec( );
        //console.log(result);
        return VRC.map((prod)=> ({
            id: prod.id, 
            type: prod.type,
            title: prod.title, 
            description: prod.description, 
            price: prod.price,
            link: prod.link,
            image: prod.image

        }));

    }

    async getSingleVRC(VRCId: string){
        const VRC = await this.findVRC(VRCId);
        return {id: VRC.id, 
        title: VRC.title,
        type: VRC.type,
        description: VRC.description,
        price: VRC.price,
        link: VRC.link,
        image: VRC.image
    }; 
    } 

   async updateVRC(VRCId: string, title: string, type: string, desc: string, price: number, link: string, image: string){
        
        const updatedVRC = await this.findVRC(VRCId);
        

        console.log(title)
        if( title){
            updatedVRC.title = title;

        }
        if( type){
            updatedVRC.type = type;

        }
        if( desc){
            updatedVRC.description = desc;

        }
        if( price){
            updatedVRC.price = price;

        }
        if( link){
            updatedVRC.link = link;

        }
        if( image){
            updatedVRC.image = image;

        }
        updatedVRC.save();
        
         
    }
    async deleteVRC(prodId: string){
      const result = await this.VRCModel.deleteOne({_id: prodId}).exec();
      if(result.deletedCount === 0){
        throw new NotFoundException('Could not find product');  
      }
    }
    private async findVRC(id: string): Promise<VRC> {
        let VRC;

        try{
            VRC = await this.VRCModel.findById(id).exec();

        }catch(error){
            throw new NotFoundException('Could not find product error');  

        }
       
        // const productIndex = this.products.findIndex((prod) => prod.id == id);
        // const product= this.products[productIndex];
        if(!VRC){
            throw new NotFoundException('Could not find product not found');  
        }
        return VRC; 
    }

    
}