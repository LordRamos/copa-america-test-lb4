import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Referee} from './referee.model';
import {Stadium} from './stadium.model';
import {Stage} from './stage.model';

@model()
export class Match extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  dateTime: string;

  @property({
    type: 'number',
    required: true,
  })
  matchNumber: number;

  @belongsTo(() => Referee)
  refereeId: number;

  @belongsTo(() => Stage)
  stageId: number;

  @belongsTo(() => Stadium)
  stadiumId: number;


  constructor(data?: Partial<Match>) {
    super(data);
  }
}

export interface MatchRelations {
  // describe navigational properties here
}

export type MatchWithRelations = Match & MatchRelations;
