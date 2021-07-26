import {Entity, model, property} from '@loopback/repository';

@model()
export class PlayerPosition extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<PlayerPosition>) {
    super(data);
  }
}

export interface PlayerPositionRelations {
  // describe navigational properties here
}

export type PlayerPositionWithRelations = PlayerPosition & PlayerPositionRelations;
