import { Entity, model, property, belongsTo, hasOne, hasMany } from '@loopback/repository';
import { Stage } from './stage.model';
import { Referee } from './referee.model';
import { MatchResults } from './match-results.model';
import { LineUp } from './line-up.model';
import { Team } from './team.model';
import { Stadium } from './stadium.model';

@model({
  settings: {
    foreignKeys: {
      fk_m_stageId: {
        name: 'fk_m_stageId',
        entity: 'Stage',
        entityKey: 'id',
        foreignKey: 'stageId',
      }, fk_m_refereeId: {
        name: 'fk_m_refereeId',
        entity: 'Referee',
        entityKey: 'id',
        foreignKey: 'refereeId',
      }, fk_m_homeTeamId: {
        name: 'fk_m_homeTeamId',
        entity: 'Team',
        entityKey: 'id',
        foreignKey: 'homeTeamId',
      },
      fk_m_stadiumId: {
        name: 'fk_m_stadiumId',
        entity: 'Stadium',
        entityKey: 'id',
        foreignKey: 'stadiumId',
      }


    }
  }
})
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
  @belongsTo(() => Team)
  homeTeamId: number;

  @belongsTo(() => Team)
  awayTeamId: number;

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
