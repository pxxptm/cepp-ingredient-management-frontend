import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from 'config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { MenuModule } from './modules/menu/menu.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { MemberModule } from './modules/member/member.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { ComponentModule } from './modules/component/component.module';
import { LogModule } from './modules/log/log.module';
import { OrderModule } from './modules/order/order.module';
import { MinioClientModule } from './modules/minio-client/minio-client.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/configuration`,
    }),
    MongooseModule.forRoot(databaseConfig().url),
    UserModule,
    AuthModule,
    MenuModule,
    RestaurantModule,
    MemberModule,
    IngredientModule,
    ComponentModule,
    LogModule,
    OrderModule,
    MinioClientModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
