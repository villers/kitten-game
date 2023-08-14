import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Equipment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  powerBoost: number;

  @ApiProperty()
  @Column({ default: 0 })
  defenseBoost: number;

  @ApiProperty()
  @Column({ default: 0 })
  speedBoost: number;
}
