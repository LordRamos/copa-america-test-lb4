import { belongsTo, Entity, hasMany, model, property } from '@loopback/repository';
import { Group } from './group.model';
import { LineUp } from './line-up.model';
import { Player } from './player.model';
import { Match } from './match.model';
import {Country} from './country.model';

@model({
  settings: {
    foreignKeys: {
      fk_t_cityId: {
        name: 'fk_t_countryId',
        entity: 'Country',
        entityKey: 'id',
        foreignKey: 'countryId',
      },
      fk_t_groupId: {
        name: 'fk_t_groupId',
        entity: 'Group',
        entityKey: 'id',
        foreignKey: 'groupId',
      }
    }
  }
})
export class Team extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  nickname?: string;
  @belongsTo(() => Group)
  groupId: number;

  @hasMany(() => Player)
  players: Player[];

  @hasMany(() => LineUp)
  lineUps: LineUp[];

  @hasMany(() => Match, {keyTo: 'homeTeamId'})
  homeMatches: Match[];

  @hasMany(() => Match, {keyTo: 'awayTeamId'})
  awayMatches: Match[];

  @belongsTo(() => Country)
  countryId: number;

  constructor(data?: Partial<Team>) {
    super(data);
  }
}

export interface TeamRelations {
  // describe navigational properties here
}

export type TeamWithRelations = Team & TeamRelations;
