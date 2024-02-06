import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateLogDto } from './dto/log.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('log')
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  async create(@Body() createLogDto: CreateLogDto) {
    return await this.logService.create(createLogDto);
  }
}
