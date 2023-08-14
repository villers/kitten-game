import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Kitten } from '../../domain/entities/kitten.entity';
import { KittenService } from '../../application/services/kitten.service';

@ApiTags('kittens')
@Controller('kittens')
export class KittenController {
  constructor(private kittenService: KittenService) {}

  @Post()
  @ApiBody({ type: Kitten })
  @ApiResponse({
    status: 201,
    description: 'The kitten has been successfully created.',
  })
  async createKitten(@Body() kitten: Kitten): Promise<void> {
    await this.kittenService.addKitten(kitten);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the kitten details.',
    type: Kitten,
  })
  async getKittenById(@Param('id') id: string): Promise<Kitten | null> {
    return await this.kittenService.getKittenById(id);
  }

  @Put(':id')
  @ApiBody({ type: Kitten })
  @ApiResponse({
    status: 200,
    description: 'The kitten has been successfully updated.',
  })
  async updateKitten(
    @Param('id') id: string,
    @Body() kitten: Kitten,
  ): Promise<void> {
    kitten.id = id; // Ensure the ID from the route parameter is used
    await this.kittenService.updateKitten(kitten);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The kitten has been successfully deleted.',
  })
  async deleteKitten(@Param('id') id: string): Promise<void> {
    await this.kittenService.deleteKitten(id);
  }
}
