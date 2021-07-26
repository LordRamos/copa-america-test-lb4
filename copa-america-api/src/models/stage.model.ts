import {Entity, model, property, hasMany} from '@loopback/repository';
import {Match} from './match.model';

@model()
export class Stage extends Entity {
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

  constructor(data?: Partial<Stage>) {
    super(data);
  }
}

export interface StageRelations {
  // describe navigational properties here
}

export type StageWithRelations = Stage & StageRelations;
