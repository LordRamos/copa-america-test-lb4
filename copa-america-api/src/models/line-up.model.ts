import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {LineUpPlayer} from './line-up-player.model';
import {Match} from './match.model';
import {Team} from './team.model';

@model({
  settings: {
    foreignKeys: {
      fk_lu_matchId: {
        name: 'fk_lu_matchId',
        entity: 'Match',
        entityKey: 'id',
        foreignKey: 'matchId',
      }, fk_lu_teamId: {
        name: 'fk_lu_teamId',
        entity: 'Team',
        entityKey: 'id',
        foreignKey: 'teamId',
      }
    }
  }
})
export class LineUp extends Entity {
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
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  coachSignature: string;

  @property({
    type: 'string',
    required: true,
  })
  capSignature: string;

  @belongsTo(() => Match)
  matchId: number;

  @belongsTo(() => Team)
  teamId: number;

  @hasMany(() => LineUpPlayer)
  lineUpPlayers: LineUpPlayer[];

  constructor(data?: Partial<LineUp>) {
    super(data);
  }
}

export interface LineUpRelations {
  // describe navigational properties here
}

export type LineUpWithRelations = LineUp & LineUpRelations;
