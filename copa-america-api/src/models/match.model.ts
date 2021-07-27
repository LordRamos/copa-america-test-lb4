import {Entity, model, property, belongsTo, hasOne, hasMany} from '@loopback/repository';
import {Stage} from './stage.model';
import {Referee} from './referee.model';
import {MatchResults} from './match-results.model';
import {LineUp} from './line-up.model';

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

  @belongsTo(() => Stage)
  stageId: number;

  @belongsTo(() => Referee)
  refereeId: number;

  @hasOne(() => MatchResults)
  matchResults: MatchResults;

  @hasMany(() => LineUp)
  lineUps: LineUp[];

  constructor(data?: Partial<Match>) {
    super(data);
  }
}

export interface MatchRelations {
  // describe navigational properties here
}

export type MatchWithRelations = Match & MatchRelations;
