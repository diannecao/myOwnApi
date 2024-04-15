import { Module } from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import { GamesController } from "./Games.controller";
import { GamesService } from "./Games.service";
import { GamesSchema } from "./Games.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Games', schema: GamesSchema}])],
    controllers: [GamesController],
    providers: [GamesService],
})
export class GamesModule{

}