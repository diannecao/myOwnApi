import { Module } from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import { VRCController } from "./VRC.controller";
import { VRCService } from "./VRC.service";
import { VRCSchema } from "./VRC.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'VRC', schema: VRCSchema}])],
    controllers: [VRCController],
    providers: [VRCService],
})
export class VRCModule{

}