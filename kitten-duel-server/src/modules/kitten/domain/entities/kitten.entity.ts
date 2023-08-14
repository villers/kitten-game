import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Kitten {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  power: number; // Attack power

  @ApiProperty()
  @Column()
  hp: number; // Hit points or health

  @ApiProperty()
  @Column()
  defense: number; // Defense against attacks

  @ApiProperty()
  @Column()
  speed: number; // Determines attack order, higher speed attacks first

  @ApiProperty({ type: [String] })
  @Column()
  equipmentIds: string[];

  @ApiProperty()
  @Column({ default: 0 })
  victories: number;

  @ApiProperty()
  @Column({ default: 0 })
  defeats: number;
}
