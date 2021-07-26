import {Entity, model, property, hasMany} from '@loopback/repository';
import {Match} from './match.model';

@model()
export class Referee extends Entity {
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

  @hasMany(() => Match)
  matches: Match[];

  constructor(data?: Partial<Referee>) {
    super(data);
  }
}

export interface RefereeRelations {
  // describe navigational properties here
}

export type RefereeWithRelations = Referee & RefereeRelations;
