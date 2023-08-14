import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Duel, DuelDTO } from '../../domain/entities/duel.entity';
import { DuelService } from '../../application/services/duel.service';
import { Kitten } from '../../domain/entities/kitten.entity';
import { KittenService } from '../../application/services/kitten.service';

@ApiTags('duels')
@Controller('duels')
export class DuelController {
  constructor(
    private duelService: DuelService,
    private kittenService: KittenService,
  ) {}

  @Post('fight')
  @ApiBody({ type: DuelDTO })
  @ApiResponse({
    status: 200,
    description: 'Returns the winning kitten.',
    type: Kitten,
  })
  async organizeDuel(
    @Body('kittenAId') kittenAId: string,
    @Body('kittenBId') kittenBId: string,
  ): Promise<Duel> {
    const kittenA = await this.kittenService.getKittenById(kittenAId);
    const kittenB = await this.kittenService.getKittenById(kittenBId);

    return await this.duelService.fight(kittenA, kittenB);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the duel details.',
    type: Duel,
  })
  async getDuelById(@Param('id') id: string): Promise<Duel | null> {
    return await this.duelService.getDuelById(id);
  }

  @Put(':id')
  @ApiBody({ type: Duel })
  @ApiResponse({
    status: 200,
    description: 'The duel has been successfully updated.',
  })
  async updateDuel(@Param('id') id: string, @Body() duel: Duel): Promise<void> {
    duel.id = id; // Ensure the ID from the route parameter is used
    await this.duelService.updateDuel(duel);
  }
}
