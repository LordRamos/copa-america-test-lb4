import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Group} from './group.model';
import {LineUp} from './line-up.model';
import {Player} from './player.model';

@model({
  settings: {
    foreignKeys: {
      fk_t_cityId: {
        name: 'fk_t_countryId',
        entity: 'Country',
        entityKey: 'id',
        foreignKey: 'countryId',
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

  @property({
    type: 'number',
  })
  countryId?: number;

  @belongsTo(() => Group)
  groupId: number;

  @hasMany(() => Player)
  players: Player[];

  @hasMany(() => LineUp)
  lineUps: LineUp[];

  constructor(data?: Partial<Team>) {
    super(data);
  }
}

export interface TeamRelations {
  // describe navigational properties here
}

export type TeamWithRelations = Team & TeamRelations;
