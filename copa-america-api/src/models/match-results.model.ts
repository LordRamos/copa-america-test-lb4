import {Entity, model, property} from '@loopback/repository';

@model()
export class MatchResults extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  homeTeamGoals: number;

  @property({
    type: 'number',
    required: true,
  })
  awayTeamGoals: number;

  @property({
    type: 'number',
  })
  matchId?: number;

  constructor(data?: Partial<MatchResults>) {
    super(data);
  }
}

export interface MatchResultsRelations {
  // describe navigational properties here
}

export type MatchResultsWithRelations = MatchResults & MatchResultsRelations;
