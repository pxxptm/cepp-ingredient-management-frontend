import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './schema/menu.schema';
import { IngredientModule } from '../ingredient/ingredient.module';
import { ComponentModule } from '../component/component.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    IngredientModule,
    ComponentModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
