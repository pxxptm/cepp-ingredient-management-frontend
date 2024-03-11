import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ComponentService } from './component.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateComponentDto, UpdateComponentDto } from './dto/component.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('component')
@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Post()
  async create(@Body() createComponentDto: CreateComponentDto) {
    return await this.componentService.create(createComponentDto);
  }

  @Patch(':id')
  async update(
    @Param('id') componentId: string,
    @Body() updateComponentDto: UpdateComponentDto,
  ) {
    return await this.componentService.update(componentId, updateComponentDto);
  }

  @Get('get-menu/:id')
  async getByMenuId(@Param('id') id: string) {
    return await this.componentService.findByMenuId(id);
  }
}
