import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Kitten } from './kitten.entity';

export class DuelDTO {
  @ApiProperty()
  kittenAId: string;

  @ApiProperty()
  kittenBId: string;
}

export class DuelStep {
  @ApiProperty()
  attackerId: string;

  @ApiProperty()
  defenderId: string;

  @ApiProperty()
  attackPower: number;

  @ApiProperty()
  attackerHp: number;

  @ApiProperty()
  defenderHp: number;
}

@Entity()
export class Duel {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column()
  kitten1Id: string;

  @ApiProperty()
  @Column()
  kitten2Id: string;

  @ApiProperty()
  @Column()
  winnerId: string;

  @ApiProperty()
  @Column()
  kitten1InitialHp: number;

  @ApiProperty()
  @Column()
  kitten2InitialHp: number;

  @ApiProperty()
  @Column()
  kitten1RemainingHp: number;

  @ApiProperty()
  @Column()
  kitten2RemainingHp: number;

  @ApiProperty({ type: [DuelStep] }) // To specify that it's an array of DuelStep
  @Column('json') // Store it as JSON in the database
  steps: DuelStep[];
}
