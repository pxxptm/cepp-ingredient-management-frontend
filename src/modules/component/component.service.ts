import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Component } from './schema/component.schema';
import { Model } from 'mongoose';
import { CreateComponentDto, UpdateComponentDto } from './dto/component.dto';

@Injectable()
export class ComponentService {
  constructor(
    @InjectModel(Component.name)
    private readonly componentModel: Model<Component>,
  ) {}

  async create(createComponentDto: CreateComponentDto) {
    const createdComponent = new this.componentModel(createComponentDto);
    await createdComponent.save();
    return createdComponent;
  }

  async update(componentId: string, updateComponentDto: UpdateComponentDto) {
    return await this.componentModel.findByIdAndUpdate(
      componentId,
      updateComponentDto,
      {
        new: true,
      },
    );
  }

  async findByMenuId(menuId: string) {
    return await this.componentModel.find({ menuId: menuId });
  }
}
