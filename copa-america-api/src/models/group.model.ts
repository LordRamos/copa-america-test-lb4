import { Entity, model, property, hasMany, belongsTo } from '@loopback/repository';
import { Team } from './team.model';
import { GlobalCupInfo } from './global-cup-info.model';

@model({
  settings: {
    foreignKeys: {
      fk_g_globalCupInfoId: {
        name: 'fk_g_globalCupInfoId',
        entity: 'GlobalCupInfo',
        entityKey: 'id',
        foreignKey: 'globalCupInfoId',
      }
    }
  }
})
export class Group extends Entity {
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

  @hasMany(() => Team)
  teams: Team[];

  @belongsTo(() => GlobalCupInfo)
  globalCupInfoId: number;

  constructor(data?: Partial<Group>) {
    super(data);
  }
}

export interface GroupRelations {
  // describe navigational properties here
}

export type GroupWithRelations = Group & GroupRelations;
