import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {City} from './city.model';
import {Match} from './match.model';

@model()
export class Stadium extends Entity {
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

  @belongsTo(() => City)
  cityId: number;

  @hasMany(() => Match)
  matches: Match[];

  constructor(data?: Partial<Stadium>) {
    super(data);
  }
}

export interface StadiumRelations {
  // describe navigational properties here
}

export type StadiumWithRelations = Stadium & StadiumRelations;
