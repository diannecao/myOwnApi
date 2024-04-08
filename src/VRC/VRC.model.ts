import * as mongoose from 'mongoose';

export const VRCSchema = new mongoose.Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    link: {type: String, required: true},
    image: {type: String, required: true}

});


export interface VRC extends mongoose.Document{
    
    id: string;
    title: string; 
    type: string,
    description: string; 
    price: number;
    link: string
    image: string
        
}