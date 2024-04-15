import * as mongoose from 'mongoose';

export const GamesSchema = new mongoose.Schema({
    title: {type: String, required: true},
    year: {type: Number, required: true},
    game: {type: String, required: true},
    image: {type: String, required: true}

});


export interface Games extends mongoose.Document{
    
    id: string;
    title: string; 
    year: number,
    game: string; 
    image: string
        
}