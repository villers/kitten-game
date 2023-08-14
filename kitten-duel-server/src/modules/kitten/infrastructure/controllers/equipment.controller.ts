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
import { Equipment } from '../../domain/entities/equipment.entity';
import { EquipmentService } from '../../application/services/equipment.service';

@ApiTags('equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  @Post()
  @ApiBody({ type: Equipment })
  @ApiResponse({
    status: 201,
    description: 'The equipment has been successfully created.',
  })
  async createEquipment(@Body() equipment: Equipment): Promise<void> {
    await this.equipmentService.addEquipment(equipment);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the equipment details.',
    type: Equipment,
  })
  async getEquipmentById(@Param('id') id: string): Promise<Equipment | null> {
    return await this.equipmentService.getEquipmentById(id);
  }

  @Put(':id')
  @ApiBody({ type: Equipment })
  @ApiResponse({
    status: 200,
    description: 'The equipment has been successfully updated.',
  })
  async updateEquipment(
    @Param('id') id: string,
    @Body() equipment: Equipment,
  ): Promise<void> {
    equipment.id = id; // Ensure the ID from the route parameter is used
    await this.equipmentService.updateEquipment(equipment);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The equipment has been successfully deleted.',
  })
  async deleteEquipment(@Param('id') id: string): Promise<void> {
    await this.equipmentService.deleteEquipment(id);
  }
}
