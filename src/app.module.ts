import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VRCModule } from './VRC/VRC.module';

@Module({
  imports: [VRCModule, MongooseModule.forRoot('mongodb+srv://diannecao:diannecao@cluster0.jdpfyfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
