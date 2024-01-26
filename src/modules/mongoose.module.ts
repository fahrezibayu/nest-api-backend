// src/modules/mongoose.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose'; // Ganti nama alias jika diperlukan
import mongodbConfig from '../config/mongodb.config';

@Module({
  imports: [NestMongooseModule.forRoot(mongodbConfig.uri)],
})
export class MongooseModule {}
