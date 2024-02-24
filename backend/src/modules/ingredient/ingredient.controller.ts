import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('ingredient')
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get('restaurant/:id')
  async getByRestaurantId(@Param('id') id: string) {
    return await this.ingredientService.getByRestaurantId(id);
  }

  @Post()
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    return await this.ingredientService.create(createIngredientDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return await this.ingredientService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  async delete(@Param('id') ingredientId: string) {
    return await this.ingredientService.delete(ingredientId);
  }
}
