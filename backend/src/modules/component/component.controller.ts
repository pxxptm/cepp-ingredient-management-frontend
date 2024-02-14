import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ComponentService } from './component.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateComponentDto } from './dto/component.dto';

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
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWFmN2VkZGJmZWEyZDYxY2EyNzI1ZmYiLCJ1c2VybmFtZSI6Im93bmVyIiwicm9sZSI6Im93bmVyIiwiaWF0IjoxNzA2MjYzOTIxLCJleHAiOjE3MDYzNTAzMjF9.18ckjlvwo5BQWJrnVMhJ5syBysY5N_9SFMmuwGA2q50
