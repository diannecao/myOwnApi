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

    async insertVRC(title: string, desc :string,  price: number, link: string){
       // const prodId = Math.random().toString();
        const newVRC = new this.VRCModel({
            title, 
            description: desc, 
            price,
            link,
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
            title: prod.title, 
            description: prod.description, 
            price: prod.price,
            link: prod.link

        }));

    }

    async getSingleVRC(VRCId: string){
        const VRC = await this.findVRC(VRCId);
        return {id: VRC.id, 
        title: VRC.title,
        description: VRC.description,
        price: VRC.price,
        link: VRC.link
    }; 
    } 

   async updateVRC(VRCId: string, title: string, desc: string, price: number, link: string){
        
        const updatedVRC = await this.findVRC(VRCId);
        

        console.log(title)
        if( title){
            updatedVRC.title = title;

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
            const VRC = await this.VRCModel.findById(id).exec();

        }catch(error){
            throw new NotFoundException('Could not find product');  

        }
       
        // const productIndex = this.products.findIndex((prod) => prod.id == id);
        // const product= this.products[productIndex];
        if(!VRC){
            throw new NotFoundException('Could not find product');  
        }
        return VRC; 
    }

    
}