import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VRCModule } from './VRC/VRC.module';
import { GamesModule } from './Games/Games.module';

@Module({
  imports: [VRCModule,GamesModule, MongooseModule.forRoot('mongodb+srv://diannecao:diannecao@cluster0.jdpfyfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
