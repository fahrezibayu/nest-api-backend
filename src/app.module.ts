// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { JwtMiddleware } from './middlewares/jwt.middleware';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/test-backend'), AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('secured-routes'); // Gantilah dengan rute yang diinginkan
  }
}
