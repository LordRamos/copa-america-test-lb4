import {Entity, model, property, hasMany} from '@loopback/repository';
import {Player} from './player.model';

@model()
export class PlayerPosition extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Player)
  players: Player[];

  constructor(data?: Partial<PlayerPosition>) {
    super(data);
  }
}

export interface PlayerPositionRelations {
  // describe navigational properties here
}

export type PlayerPositionWithRelations = PlayerPosition & PlayerPositionRelations;
