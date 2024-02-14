import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentController } from './component.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Component, ComponentSchema } from './schema/component.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Component.name, schema: ComponentSchema },
    ]),
  ],
  providers: [ComponentService],
  controllers: [ComponentController],
  exports: [ComponentService],
})
export class ComponentModule {}
